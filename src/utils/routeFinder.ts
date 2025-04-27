import { Location, Route, RouteInstruction } from "../types";

/**
 * Find a route between two locations
 *
 * This is a simplified implementation that creates a straight-line path
 * In a production app, you'd implement a proper A* algorithm with the campus path network
 * or integrate with a routing API
 *
 * @param start Starting location
 * @param end Destination location
 * @returns Route object
 */
export function findRoute(start: Location, end: Location): Route {
    // Generate a simple straight line path for demonstration
    const numPoints = 10;
    const path: [number, number][] = [];

    for (let i = 0; i <= numPoints; i++) {
        const factor = i / numPoints;
        const lat =
            start.coordinates[0] +
            (end.coordinates[0] - start.coordinates[0]) * factor;
        const lng =
            start.coordinates[1] +
            (end.coordinates[1] - start.coordinates[1]) * factor;
        path.push([lat, lng]);
    }

    // Calculate straight-line distance (in meters)
    const distance = calculateDistance(
        start.coordinates[0],
        start.coordinates[1],
        end.coordinates[0],
        end.coordinates[1]
    );

    // Estimate walking time (4 km/h = ~1.11 m/s)
    const walkingSpeed = 1.11; // meters per second
    const duration = distance / walkingSpeed;

    // Create simple instruction
    const instructions: RouteInstruction[] = [
        {
            text: `Walk from ${start.name} to ${end.name}`,
            distance,
            duration,
            maneuver: "straight",
            coordinates: start.coordinates,
        },
    ];

    return {
        start,
        end,
        path,
        distance,
        duration,
        instructions,
    };
}

/**
 * Calculate the distance between two coordinates using the Haversine formula
 *
 * @param lat1 Latitude of point 1
 * @param lon1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lon2 Longitude of point 2
 * @returns Distance in meters
 */
function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
