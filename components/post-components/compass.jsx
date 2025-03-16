"use client";

import { useEffect, useState, useRef } from "react";

import { Block } from "@/components/ui/block";
import Button from "@/components/ui/button";

/**
 * Converts compass heading to cardinal direction
 * @param {number} heading - Compass heading in degrees
 * @returns {string} Cardinal direction (N, NE, E, SE, S, SW, W, NW)
 */
function getCardinalDirection(heading) {
  let cardinalDirection;
  if (heading >= 337.5 || heading < 22.5) {
    cardinalDirection = "N";
  } else if (heading >= 22.5 && heading < 67.5) {
    cardinalDirection = "NE";
  } else if (heading >= 67.5 && heading < 112.5) {
    cardinalDirection = "E";
  } else if (heading >= 112.5 && heading < 157.5) {
    cardinalDirection = "SE";
  } else if (heading >= 157.5 && heading < 202.5) {
    cardinalDirection = "S";
  } else if (heading >= 202.5 && heading < 247.5) {
    cardinalDirection = "SW";
  } else if (heading >= 247.5 && heading < 292.5) {
    cardinalDirection = "W";
  } else if (heading >= 292.5 && heading < 337.5) {
    cardinalDirection = "NW";
  }

  return cardinalDirection;
}

/**
 * Fetches magnetic declination from NOAA API
 * @param {number} latitude - User's latitude
 * @param {number} longitude - User's longitude
 * @returns {Promise<number>} Magnetic declination value
 */
async function getMagneticDeclination(latitude, longitude) {
  const response = await fetch(
    `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latitude}&lon1=${longitude}&key=${process.env.NEXT_PUBLIC_NOAA_API_KEY}&resultFormat=json`,
  );
  const data = await response.json();

  if (!data?.result || data?.result?.length === 0) return 0;

  const declination = data.result[0].declination;
  return declination;
}

/**
 * Custom hook to handle compass/device orientation functionality
 * Manages device orientation tracking, permissions, and magnetic declination
 * @param {Object} props - Hook properties
 * @param {GeolocationPosition} props.userPosition - User's current position for magnetic declination calculation
 */
function useCompass({ userPosition }) {
  // Track permission state for device orientation API
  const [permission, setPermission] = useState("unknown");
  // Store current direction (degrees and cardinal direction)
  const [direction, setDirection] = useState(null);
  // Track whether device supports orientation API
  const [hasSupport, setHasSupport] = useState(true);
  // Store magnetic declination value (difference between true and magnetic north)
  const magneticDeclinationRef = useRef(0);
  // Store manual calibration offset
  const offsetRef = useRef(0);

  /**
   * Checks if the device supports orientation events
   * Sets hasSupport state and default direction if not supported
   */
  const checkSupport = () => {
    if (typeof window === "undefined") return false;

    if (!window.DeviceOrientationEvent) {
      alert("Your device does not support compass functionality.");
      setHasSupport(false);
      setDirection({ degrees: 0, cardinal: "N" });
      return false;
    }
    return true;
  };

  /**
   * Handles device orientation events
   * Calculates heading based on device type (iOS vs Android)
   * Applies magnetic declination and manual offset corrections
   */
  const handleOrientation = (event) => {
    let heading = 0;

    // For iOS devices - uses native compass heading
    if (event?.webkitCompassHeading) {
      heading = event.webkitCompassHeading;
    }
    // For Android devices - uses alpha value and screen orientation
    else if (event.alpha !== null) {
      const screenOrientation = window.screen.orientation?.angle || 0;
      heading = (360 - event.alpha + screenOrientation) % 360;
    } else {
      setHasSupport(false);
      setDirection({ degrees: 0, cardinal: "N" });
    }

    if (heading !== undefined) {
      // Apply magnetic declination and manual offset corrections
      const adjustedHeading =
        (heading + magneticDeclinationRef.current + 360 + offsetRef.current) %
        360;

      let cardinalDirection = getCardinalDirection(adjustedHeading);

      setDirection({
        degrees: Math.round(adjustedHeading),
        cardinal: cardinalDirection,
      });
    }
  };

  /**
   * Requests permission to use device orientation
   * Handles different permission models for iOS and other devices
   */
  const requestPermission = async () => {
    if (!checkSupport()) return;

    // iOS requires explicit permission request
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      // @ts-expect-error requestPermission is supported in iOS
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        // @ts-expect-error requestPermission is supported in iOS
        const response = await DeviceOrientationEvent.requestPermission();
        setPermission(response);

        if (response === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } catch (error) {
        console.error("Error requesting orientation permission:", error);
        setPermission("error");
      }
    } else {
      // Non-iOS devices - add listener directly
      window.addEventListener("deviceorientation", handleOrientation);
      setPermission("granted");
    }
  };

  // Fetch magnetic declination when user position changes
  useEffect(() => {
    if (!userPosition || magneticDeclinationRef.current !== 0) return;

    getMagneticDeclination(
      userPosition.coords.latitude,
      userPosition.coords.longitude,
    ).then((declination) => {
      magneticDeclinationRef.current = declination;
    });
  }, [userPosition]);

  // Cleanup orientation event listener
  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return {
    permission, // Current permission status
    direction, // Current direction data
    setDirection, // Function to manually set direction
    requestPermission, // Function to request permissions
    hasSupport, // Whether device supports orientation
    magneticDeclination: magneticDeclinationRef.current, // Current magnetic declination
    offsetRef, // Reference to manual calibration offset
  };
}

/**
 * Custom hook to handle geolocation functionality
 * Manages device location tracking, permissions, and error states
 */
function useGeolocation() {
  // Track the user's current position
  const [position, setPosition] = useState(null);
  // Track permission state: 'prompt', 'granted', or 'denied'
  const [permission, setPermission] = useState("prompt");
  // Track any errors that occur during geolocation
  const [error, setError] = useState(null);
  // Store the ID returned by watchPosition to cleanup later
  const [watchId, setWatchId] = useState(null);

  // Cleanup: Remove the position watcher when component unmounts
  // or when watchId changes
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  /**
   * Request permission to access user's location and start tracking
   * This function handles both the initial permission request and
   * continuous location tracking
   */
  const requestPermission = async () => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    try {
      // First, get initial position - this triggers the permission prompt
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            setPermission("granted");
            setPosition(position);
            setError(null);
            resolve();
          },
          // Error callback - handle various error scenarios
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setPermission("denied");
                setError("Location permission denied");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable");
                break;
              case error.TIMEOUT:
                setError("Location request timed out");
                break;
              default:
                setError("An unknown error occurred");
            }
            reject(error);
          },
          // Options for getting position
          {
            enableHighAccuracy: true, // Use GPS if available
            timeout: 5000, // Time to wait for position
            maximumAge: 0, // Don't use cached position
          },
        );
      });

      // After permission granted, start watching position continuously
      const id = navigator.geolocation.watchPosition(
        // Success callback - update position when it changes
        (position) => {
          setPosition(position);
          setError(null);
        },
        // Error callback - handle errors during watching
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setPermission("denied");
              setError("Location permission denied");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable");
              break;
            case error.TIMEOUT:
              setError("Location request timed out");
              break;
            default:
              setError("An unknown error occurred");
          }
          setPosition(null);
        },
        // Same options as above
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        },
      );

      // Store the watch ID for cleanup
      setWatchId(id);
    } catch (err) {
      setError("Error requesting location permission");
      console.error("Error:", err);
    }
  };

  // Return current state and request function
  return {
    position, // Current position data
    permission, // Current permission status
    error, // Any error messages
    requestPermission, // Function to request permissions
  };
}

export default function Main() {
  const { position, requestPermission: requestGeolocationPermission } =
    useGeolocation();
  const {
    permission: compassPermission,
    direction,
    setDirection,
    hasSupport: hasDeviceOrientationSupport,
    requestPermission: requestCompassPermission,
    magneticDeclination,
    offsetRef,
  } = useCompass({ userPosition: position });

  async function onRequestPermission() {
    await requestCompassPermission();
    await requestGeolocationPermission();
  }

  // handling manual heading input
  // i.e. on desktop devices you can click on the heading degrees and manually input your heading
  function handleManualHeadingInput(e) {
    const newDirection = e.currentTarget.value;

    if (isNaN(parseFloat(newDirection))) return;

    if (parseFloat(newDirection) < 0 || parseFloat(newDirection) > 360) return;

    setDirection({
      degrees: parseFloat(newDirection),
      cardinal: getCardinalDirection(parseFloat(newDirection)),
    });
  }

  function getNorthTransformValue() {
    // Define the radius of the compass circle in pixels
    // This determines how far the north indicator will move from the center
    const maxRadius = 140;
    const scaledRadius = maxRadius;

    // Convert compass degrees to radians and negate for correct rotation direction
    // We negate because CSS rotation goes clockwise, while compass degrees go counter-clockwise
    const angleInRadians = -(direction?.degrees || 0) * (Math.PI / 180);

    // Calculate the x and y coordinates for the north indicator
    // Using trigonometry to position the indicator along the circle's circumference
    const x = scaledRadius * Math.sin(angleInRadians);
    const y = -scaledRadius * Math.cos(angleInRadians); // Negative because Y-axis is inverted in CSS

    // Return CSS transform string that:
    // 1. Translates (moves) the indicator to the calculated position
    // 2. Rotates the indicator to maintain its orientation towards the center
    return `translate(${x}px, ${y}px) rotate(${angleInRadians * (180 / Math.PI)}deg)`;
  }

  // Function to recalibrate the north indicator
  // set the current direction as north
  function onRecalibrateNorth() {
    // If we're at 90°, we need -90° offset to get back to 0° (north)
    const offset = -(direction?.degrees || 0) + offsetRef.current;
    offsetRef.current = offset;
  }

  return (
    <div className="not-prose max-w-screen-sm mx-auto space-y-4">
      {compassPermission !== "granted" ? (
        // Request permission to use compass and location
        <Button
          onClick={onRequestPermission}
          className="w-full px-2"
          variant="tertiary"
        >
          Enable Compass & Location
        </Button>
      ) : (
        <div className="font-mono">
          <div className="pt-4 pb-4 pl-4 pr-4 md:pt-4 md:pb-12 md:pl-8 md:pr-8 w-full space-y-4 bg-[#111]">
            <div className="text-white w-full flex flex-col items-center mt-4">
              <div className="h-auto my-16 w-[280px] aspect-square relative bg-white/10 flex items-center justify-center rounded-full">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-white uppercase text-xs leading-tight">
                    Your heading and location
                  </p>
                  {/* Show the user's current heading */}
                  <div className="flex items-center">
                    <input
                      readOnly={hasDeviceOrientationSupport}
                      className="text-center text-5xl bg-transparent inline"
                      value={direction?.degrees || 0}
                      // this is the input that the user can manually input their heading
                      // it's read only if the device supports the orientation API
                      // i.e. on desktop devices you can manually input your heading
                      onChange={(e) => handleManualHeadingInput(e)}
                      style={{
                        width: `${String(direction?.degrees || 0).length}ch`,
                      }}
                    />
                    <p className="text-5xl text-center">
                      °&nbsp;{direction?.cardinal}
                    </p>
                  </div>
                  {/* Show the user's current latitude and longitude */}
                  {position && (
                    <div className="flex gap-2">
                      <div className="w-full flex flex-row gap-2">
                        <span className="text-gray-400 uppercase">Lat</span>
                        <span>{position.coords.latitude.toFixed(2)}°</span>
                      </div>
                      <div className="w-full flex flex-row gap-2">
                        <span className="text-gray-400 uppercase">Lon</span>
                        <span>{position.coords.longitude.toFixed(2)}°</span>
                      </div>
                    </div>
                  )}
                  {/* Display the magnetic declination returned from NOAA API */}
                  {typeof magneticDeclination === "number" && (
                    <div className="flex justify-center">
                      <div className="w-full flex flex-row gap-2">
                        <span className="text-gray-400 uppercase">
                          Declination
                        </span>
                        <span>{magneticDeclination.toFixed(2)}°</span>
                      </div>
                    </div>
                  )}
                  {/* Recalibrate Button - clicking this sets the current direction the user is facing as north */}
                  <button
                    onClick={onRecalibrateNorth}
                    className="px-6 py-2 bg-transparent w-full rounded-md cursor-pointer flex items-center justify-center gap-2 text-secondary leading-none text-center"
                  >
                    Recalibrate
                  </button>
                </div>
                {/* North Indicator */}
                <div
                  className="absolute inline-flex flex-col items-center justify-center border-t-4 border-red-500 w-4"
                  style={{
                    transform: getNorthTransformValue(),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Display a message if the device does not support the orientation API */}
      {!hasDeviceOrientationSupport && (
        <Block
          className="font-mono text-tertiary mt-6"
          variant="dark"
          caretPosition="top-right"
        >
          <p className="!my-0">
            <b>Your device does not support the orientation API.</b>
            <br />
            You can manually input your heading by clicking on the heading
            indicator in the centre of the compass.
          </p>
        </Block>
      )}
    </div>
  );
}
