"use client";

import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "../ui/button";

// API function for IP location using native fetch
const getIpApiData = async () => {
    try {
        const response = await fetch(`https://ipapi.co/json`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching IP data:", err);
        return defaultResponse;
    }
};

// Default response if IP API fails
const defaultResponse = {
    latitude: 51.5074, // London coordinates as fallback
    longitude: -0.1278,
    country_code: "GB",
    ip: "0.0.0.0"
};

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

// Calculate midpoint between two coordinates
const calculateMidpoint = (lat1, lng1, lat2, lng2) => {
    return {
        lat: (lat1 + lat2) / 2,
        lng: (lng1 + lng2) / 2
    };
};

const MapComponent = () => {
    const [ipLocation, setIpLocation] = useState(null);
    const [preciseLocation, setPreciseLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState(null);
    const [viewState, setViewState] = useState({
        longitude: -0.1278,
        latitude: 51.5074,
        zoom: 10
    });
    const mapRef = useRef(null);

    // Get initial location based on IP
    useEffect(() => {
        const fetchIpLocation = async () => {
            try {
                setLoading(true);
                // Get location data from IP
                const ipData = await getIpApiData();

                const location = {
                    lat: ipData.latitude,
                    lng: ipData.longitude
                };

                setIpLocation(location);
                setViewState({
                    longitude: location.lng,
                    latitude: location.lat,
                    zoom: 10
                });
            } catch (err) {
                console.error("Error fetching IP location:", err);
                setError("Failed to get location from IP");
                // Use default location
                setIpLocation({
                    lat: defaultResponse.latitude,
                    lng: defaultResponse.longitude
                });
            } finally {
                setLoading(false);
            }
        };

        fetchIpLocation();
    }, []);

    // Get precise location using browser Geolocation API
    const getPreciseLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setPreciseLocation(newLocation);

                    // Calculate distance if both locations are available
                    if (ipLocation) {
                        const dist = calculateDistance(
                            ipLocation.lat, ipLocation.lng,
                            newLocation.lat, newLocation.lng
                        );
                        setDistance(dist);
                    }

                    // Adjust map to show both points
                    if (mapRef.current && ipLocation) {
                        const map = mapRef.current.getMap();

                        // Create bounds that include both points
                        const bounds = new mapboxgl.LngLatBounds();
                        bounds.extend([ipLocation.lng, ipLocation.lat]);
                        bounds.extend([newLocation.lng, newLocation.lat]);

                        // Fit the map to these bounds with padding
                        map.fitBounds(bounds, {
                            padding: { top: 100, bottom: 50, left: 100, right: 100 },
                            duration: 1000
                        });
                    }

                    setLoading(false);
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    setError("Failed to get precise location. Please check your browser permissions.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
        }
    };

    // Mapbox route line between points
    const routeData = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: ipLocation && preciseLocation ? [
                [ipLocation.lng, ipLocation.lat],
                [preciseLocation.lng, preciseLocation.lat]
            ] : []
        }
    };

    // Line layer style
    const lineLayer = {
        id: "route",
        type: "line",
        paint: {
            "line-color": "#fafafa",
            "line-width": 3,
            "line-dasharray": [2, 1]
        }
    };

    // Custom Marker component
    const CustomMarkerPin = ({ color, children }) => (
        <div className="flex flex-col items-center">
            <div className="text-white text-xs font-mono uppercase bg-black px-2 py-1 mb-1 flex flex-col gap-1">
                {children}
            </div>
            <div
                className="w-5 h-5 rounded-full border-2 border-white cursor-pointer marker-pulse"
                style={{ backgroundColor: color }}
            />
        </div>
    );

    // Custom Distance Label component
    const DistanceLabel = ({ distance }) => (
        <div className="bg-black px-2 py-1 text-white text-xs font-mono uppercase">
            <p className="font-bold">{distance.toFixed(2)} km</p>
        </div>
    );

    // Mapbox dark style
    const mapStyle = "mapbox://styles/mapbox/dark-v11";

    if (loading && !ipLocation) {
        return <div>Loading map...</div>;
    }

    return (
        <div className="not-prose w-full relative">
            {error && <div className="error-message">{error}</div>}

            {ipLocation && (
                <div className="border-[rgba(var(--color-image-shadow))] shadow-[6px_6px_0_0_rgba(var(--color-image-shadow))]">
                    <ReactMapGL
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        style={{ width: "100%", height: "500px" }}
                        mapStyle={mapStyle}
                    >
                        {/* IP Location Marker */}
                        <Marker
                            longitude={ipLocation.lng}
                            latitude={ipLocation.lat}
                            anchor="bottom"
                        >
                            <CustomMarkerPin color="#000000">
                                <p className="text-xs font-mono uppercase font-bold">IP Location</p>
                                <p className="text-xs font-mono uppercase">
                                    lat <span className="text-gray-300">{ipLocation.lat.toFixed(2)}</span> lng <span className="text-gray-300">{ipLocation.lng.toFixed(2)}</span>
                                </p>
                            </CustomMarkerPin>
                        </Marker>

                        {/* Precise Location Marker */}
                        {preciseLocation && (
                            <Marker
                                longitude={preciseLocation.lng}
                                latitude={preciseLocation.lat}
                                anchor="bottom"
                            >
                                <CustomMarkerPin color="#000000">
                                    <p className="text-xs font-mono uppercase font-bold">Precise Location</p>
                                    <p className="text-xs font-mono uppercase">
                                        lat <span className="text-gray-300">{preciseLocation.lat.toFixed(2)}</span> lng <span className="text-gray-300">{preciseLocation.lng.toFixed(2)}</span>
                                    </p>
                                </CustomMarkerPin>
                            </Marker>
                        )}

                        {/* Distance Label at Midpoint */}
                        {ipLocation && preciseLocation && distance && (
                            <Marker
                                longitude={calculateMidpoint(ipLocation.lng, ipLocation.lng, preciseLocation.lng, preciseLocation.lng).lng}
                                latitude={calculateMidpoint(ipLocation.lat, ipLocation.lat, preciseLocation.lat, preciseLocation.lat).lat}
                                anchor="top-right"
                            >
                                <DistanceLabel distance={distance} />
                            </Marker>
                        )}

                        {/* Dashed line between the two points */}
                        {ipLocation && preciseLocation && (
                            <Source id="route-source" type="geojson" data={routeData}>
                                <Layer {...lineLayer} />
                            </Source>
                        )}
                    </ReactMapGL>
                </div>
            )}

            <div className="w-full flex justify-center mt-6">
                <Button
                    onClick={getPreciseLocation}
                    disabled={loading || !ipLocation}
                >
                    {loading ? "Getting location..." : "Show precise location"}
                </Button>
            </div>
        </div>
    );
};

export default MapComponent;