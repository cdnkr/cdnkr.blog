"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRotate } from "../ui/icons"

import { Block } from "@/components/ui/block"
import Button from "@/components/ui/button"

function getCardinalDirection(heading) {
    let cardinalDirection
    if (heading >= 337.5 || heading < 22.5) {
        cardinalDirection = "N"
    } else if (heading >= 22.5 && heading < 67.5) {
        cardinalDirection = "NE"
    } else if (heading >= 67.5 && heading < 112.5) {
        cardinalDirection = "E"
    } else if (heading >= 112.5 && heading < 157.5) {
        cardinalDirection = "SE"
    } else if (heading >= 157.5 && heading < 202.5) {
        cardinalDirection = "S"
    } else if (heading >= 202.5 && heading < 247.5) {
        cardinalDirection = "SW"
    } else if (heading >= 247.5 && heading < 292.5) {
        cardinalDirection = "W"
    } else if (heading >= 292.5 && heading < 337.5) {
        cardinalDirection = "NW"
    }

    return cardinalDirection
}

async function getMagneticDeclination(
    latitude,
    longitude,
) {
    const response = await fetch(
        `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latitude}&lon1=${longitude}&key=${process.env.NEXT_PUBLIC_NOAA_API_KEY}&resultFormat=json`,
    )
    const data = await response.json()

    if (!data?.result || data?.result?.length === 0) return 0

    const declination = data.result[0].declination
    return declination
}

function useCompass({
    userPosition,
}) {
    const [permission, setPermission] = useState('unknown')
    const [direction, setDirection] = useState(null)
    const [hasSupport, setHasSupport] = useState(true)
    const magneticDeclinationRef = useRef(0)
    const offsetRef = useRef(0)

    // Function to check device orientation support
    const checkSupport = () => {
        if (typeof window === 'undefined') return false

        if (!window.DeviceOrientationEvent) {
            alert('Your device does not support compass functionality.')
            setHasSupport(false)
            setDirection({ degrees: 0, cardinal: 'N' })
            return false
        }
        return true
    }

    // Function to handle device motion/orientation data
    const handleOrientation = (event) => {
        let heading = 0

        console.log({ orientationEvent: event })
        // For iOS devices
        if (event?.webkitCompassHeading) {
            heading = event.webkitCompassHeading
        }
        // For Android devices
        else if (event.alpha !== null) {
            // On Android, we need to handle the screen orientation
            const screenOrientation = window.screen.orientation?.angle || 0
            heading = (360 - event.alpha + screenOrientation) % 360
        } else {
            setHasSupport(false)
            setDirection({ degrees: 0, cardinal: 'N' })
        }

        if (heading !== undefined) {

            const adjustedHeading =
                (heading + magneticDeclinationRef.current + 360 + offsetRef.current) % 360

            let cardinalDirection = getCardinalDirection(adjustedHeading)

            setDirection({
                degrees: Math.round(adjustedHeading),
                cardinal: cardinalDirection,
            })
        }
    }

    // Function to request permission
    const requestPermission = async () => {
        if (!checkSupport()) return

        if (
            typeof DeviceOrientationEvent !== 'undefined' &&
            // @ts-expect-error requestPermission is supported in iOS
            typeof DeviceOrientationEvent.requestPermission === 'function'
        ) {
            try {
                // @ts-expect-error requestPermission is supported in iOS
                const response = await DeviceOrientationEvent.requestPermission()
                setPermission(response)

                if (response === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation)
                }
            } catch (error) {
                console.error('Error requesting orientation permission:', error)
                setPermission('error')
            }
        } else {
            // For non-iOS devices or older browsers
            window.addEventListener('deviceorientation', handleOrientation)
            setPermission('granted')
        }
    }

    useEffect(() => {
        if (!userPosition || magneticDeclinationRef.current !== 0) return

        getMagneticDeclination(
            userPosition.coords.latitude,
            userPosition.coords.longitude,
        ).then((declination) => {
            magneticDeclinationRef.current = declination
        })
    }, [userPosition])

    // Cleanup
    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation)
        }
    }, [])

    return {
        permission,
        direction,
        setDirection,
        requestPermission,
        hasSupport,
        magneticDeclination: magneticDeclinationRef.current,
        offsetRef,
    }
}

function useGeolocation() {
    const [position, setPosition] = useState(null)
    const [permission, setPermission] = useState(
        'prompt',
    )
    const [error, setError] = useState(null)
    const [watchId, setWatchId] = useState(null)

    // Cleanup function for watchPosition
    useEffect(() => {
        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [watchId])

    const requestPermission = async () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser')
            return
        }

        try {
            // Request initial position to trigger permission prompt
            await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setPermission('granted')
                        setPosition(position)
                        setError(null)
                        resolve()
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                setPermission('denied')
                                setError('Location permission denied')
                                break
                            case error.POSITION_UNAVAILABLE:
                                setError('Location information is unavailable')
                                break
                            case error.TIMEOUT:
                                setError('Location request timed out')
                                break
                            default:
                                setError('An unknown error occurred')
                        }
                        reject(error)
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    },
                )
            })

            // If we got here, permission was granted, so start watching position
            const id = navigator.geolocation.watchPosition(
                (position) => {
                    setPosition(position)
                    setError(null)
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setPermission('denied')
                            setError('Location permission denied')
                            break
                        case error.POSITION_UNAVAILABLE:
                            setError('Location information is unavailable')
                            break
                        case error.TIMEOUT:
                            setError('Location request timed out')
                            break
                        default:
                            setError('An unknown error occurred')
                    }
                    setPosition(null)
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000,
                },
            )

            setWatchId(id)
        } catch (err) {
            setError('Error requesting location permission')
            console.error('Error:', err)
        }
    }

    return {
        position,
        permission,
        error,
        requestPermission,
    }
}

function KeyValueItem({ label, value }) {
    return (
        <div className="w-full flex flex-row gap-2">
            <span className="text-gray-400 uppercase">{label}</span>
            <span>{value}</span>
        </div>
    )
}

function Compass({
    position,
    direction,
    setDirection,
    hasDeviceOrientationSupport,
    magneticDeclination,
    offsetRef,
}) {
    function handleDirectionChange(e) {
        const newDirection = e.currentTarget.value

        if (isNaN(parseFloat(newDirection))) return

        if (parseFloat(newDirection) < 0 || parseFloat(newDirection) > 360) return

        setDirection({
            degrees: parseFloat(newDirection),
            cardinal: getCardinalDirection(parseFloat(newDirection)),
        })
    }

    function renderNorthOnCompass() {
        const maxRadius = 140
        const scaledRadius = maxRadius
        // North is at 0 degrees, so we only need to calculate relative to current direction
        const angleInRadians = ((0 - (direction?.degrees || 0)) * Math.PI) / 180
        const x = scaledRadius * Math.sin(angleInRadians)
        const y = -scaledRadius * Math.cos(angleInRadians)

        return (
            <div
                className="absolute inline-flex flex-col items-center justify-center border-t-4 border-red-500 w-4"
                style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angleInRadians * (180 / Math.PI)}deg)`,
                }}
            />
        )
    }

    function onRecalibrateNorth() {
        const offset = 360 - (direction?.degrees || 0) + offsetRef.current

        offsetRef.current = offset
    }

    return (
        <div className="text-white w-full flex flex-col items-center mt-4">
            <div className="h-auto my-16 w-[280px] aspect-square relative bg-white/10 flex items-center justify-center rounded-full">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-white uppercase text-xs leading-tight">
                        Your heading and location
                    </p>
                    <div className="flex items-center">
                        <input
                            readOnly={hasDeviceOrientationSupport}
                            className="text-center text-5xl bg-transparent inline"
                            value={direction?.degrees || 0}
                            onChange={(e) => handleDirectionChange(e)}
                            style={{
                                width: `${String(direction?.degrees || 0).length}ch`,
                            }}
                        />
                        <p className="text-5xl text-center">°&nbsp;{direction?.cardinal}</p>
                    </div>
                    {position && (
                        <div className="flex gap-2">
                            <KeyValueItem
                                label="Lat"
                                value={`${position.coords.latitude.toFixed(2)}°`}
                            />
                            <KeyValueItem
                                label="Lon"
                                value={`${position.coords.longitude.toFixed(2)}°`}
                            />
                        </div>
                    )}
                    {typeof magneticDeclination === "number" && (
                        <div className="flex justify-center">
                            <KeyValueItem
                                label="Declination"
                                value={`${magneticDeclination.toFixed(2)}°`}
                            />
                        </div>
                    )}
                    <button
                        onClick={onRecalibrateNorth}
                        className="px-6 py-2 bg-transparent w-full rounded-md cursor-pointer flex items-center justify-center gap-2 text-secondary leading-none text-center"
                    >
                        <ArrowRotate className="size-4" strokeWidth={2} />Recalibrate
                    </button>
                </div>
                {renderNorthOnCompass()}
            </div>
        </div>
    )
}

export default function Main() {
    const {
        permission: geolocationPermission,
        position,
        requestPermission: requestGeolocationPermission,
    } = useGeolocation()
    const {
        permission: compassPermission,
        direction,
        setDirection,
        hasSupport: hasDeviceOrientationSupport,
        requestPermission: requestCompassPermission,
        magneticDeclination,
        offsetRef,
    } = useCompass({ userPosition: position })

    async function onRequestPermission() {
        await requestCompassPermission()
        await requestGeolocationPermission()
    }

    return (
        <div className="not-prose md:pt-8 max-w-screen-sm mx-auto space-y-4">
            {!hasDeviceOrientationSupport && (
                <Block className="font-mono" variant="tertiary" caretPosition="left-top">
                    <p className="!my-0">
                        <b>Your device does not support the orientation API.</b>
                        <br />
                        You can manually input your heading by clicking on the heading
                        indicator in the centre of the compass.
                    </p>
                </Block>
            )}
            {compassPermission !== 'granted' ? (
                <Button
                    onClick={onRequestPermission}
                    className="w-full"
                    variant="tertiary"
                >
                    Enable Compass and Location
                </Button>
            ) : (
                <div className="p-4 border-2 border-dark border-dashed font-mono">
                    <div className="pt-4 pb-4 pl-4 pr-4 md:pt-4 md:pb-12 md:pl-8 md:pr-8 w-full space-y-4 bg-dark">
                        <Compass
                            geolocationPermission={geolocationPermission}
                            position={position}
                            compassPermission={compassPermission}
                            direction={direction}
                            setDirection={setDirection}
                            hasDeviceOrientationSupport={hasDeviceOrientationSupport}
                            magneticDeclination={magneticDeclination}
                            offsetRef={offsetRef}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
