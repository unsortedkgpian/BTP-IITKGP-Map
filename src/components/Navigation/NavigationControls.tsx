"use client";

import { useState, useEffect } from "react";
import { Location } from "@/types";
import { findRoute } from "@/utils/routeFinder";

interface NavigationControlsProps {
    locations: Location[];
    selectedLocation?: Location;
    onRouteCalculated: (route: any) => void;
}

const NavigationControls = ({
    locations,
    selectedLocation,
    onRouteCalculated,
}: NavigationControlsProps) => {
    const [startLocation, setStartLocation] = useState<Location | null>(null);
    const [endLocation, setEndLocation] = useState<Location | null>(null);

    // Update end location when selected location changes
    useEffect(() => {
        if (selectedLocation) {
            setEndLocation(selectedLocation);
        }
    }, [selectedLocation]);

    // Calculate route between two locations
    const handleCalculateRoute = () => {
        if (!startLocation || !endLocation) return;

        const route = findRoute(startLocation, endLocation);
        onRouteCalculated(route);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Get Directions</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={startLocation?.id || ""}
                    onChange={(e) => {
                        const location = locations.find(
                            (l) => l.id === e.target.value
                        );
                        if (location) setStartLocation(location);
                    }}
                >
                    <option value="">Select starting point</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}{" "}
                            {location.buildingCode &&
                                `(${location.buildingCode})`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={endLocation?.id || ""}
                    onChange={(e) => {
                        const location = locations.find(
                            (l) => l.id === e.target.value
                        );
                        if (location) setEndLocation(location);
                    }}
                >
                    <option value="">Select destination</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}{" "}
                            {location.buildingCode &&
                                `(${location.buildingCode})`}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleCalculateRoute}
                disabled={!startLocation || !endLocation}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Get Directions
            </button>
        </div>
    );
};

export default NavigationControls;
