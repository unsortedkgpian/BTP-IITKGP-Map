import { Location, SearchResult } from "../types";

/**
 * Search locations based on a query string
 * @param locations - Array of locations to search
 * @param query - Search query
 * @returns Array of SearchResult with relevance score
 */
export function searchLocations(
    locations: Location[],
    query: string
): SearchResult[] {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const terms = normalizedQuery.split(/\s+/);

    const results = locations
        .map((location) => {
            let relevance = 0;
            const normalizedName = location.name.toLowerCase();
            const normalizedDesc = location.description.toLowerCase();
            const normalizedCode = location.buildingCode?.toLowerCase() || "";

            // Check for exact matches in name (highest relevance)
            if (normalizedName === normalizedQuery) {
                relevance += 100;
            }

            // Check for building code match
            if (normalizedCode === normalizedQuery) {
                relevance += 90;
            }

            // Check for name containing the query
            if (normalizedName.includes(normalizedQuery)) {
                relevance += 80;
            }

            // Check for building code containing the query
            if (normalizedCode.includes(normalizedQuery)) {
                relevance += 70;
            }

            // Check for each term in the name
            terms.forEach((term) => {
                if (normalizedName.includes(term)) {
                    relevance += 50;
                }
            });

            // Check for each term in the description
            terms.forEach((term) => {
                if (normalizedDesc.includes(term)) {
                    relevance += 30;
                }
            });

            // Check for tags matching the query
            if (location.tags) {
                location.tags.forEach((tag) => {
                    if (tag.toLowerCase().includes(normalizedQuery)) {
                        relevance += 40;
                    }

                    // Check each term in tags
                    terms.forEach((term) => {
                        if (tag.toLowerCase().includes(term)) {
                            relevance += 20;
                        }
                    });
                });
            }

            return { location, relevance };
        })
        .filter((result) => result.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance);

    return results;
}

/**
 * Filter locations by category
 * @param locations - Array of locations to filter
 * @param category - Category to filter by
 * @returns Filtered locations
 */
export function filterByCategory(
    locations: Location[],
    category: string
): Location[] {
    if (!category || category === "all") {
        return locations;
    }

    return locations.filter((location) => location.category === category);
}

/**
 * Filter locations by accessibility
 * @param locations - Array of locations to filter
 * @param accessible - Whether to show only accessible locations
 * @returns Filtered locations
 */
export function filterByAccessibility(
    locations: Location[],
    accessible: boolean
): Location[] {
    if (!accessible) {
        return locations;
    }

    return locations.filter((location) => location.isAccessible === true);
}

/**
 * Get unique categories from locations
 * @param locations - Array of locations
 * @returns Array of unique categories
 */
export function getUniqueCategories(locations: Location[]): string[] {
    const categories = new Set<string>();

    locations.forEach((location) => {
        categories.add(location.category);
    });

    return Array.from(categories).sort();
}

/**
 * Find locations near a given coordinate
 * @param locations - Array of locations to search
 * @param lat - Latitude
 * @param lng - Longitude
 * @param radiusInMeters - Search radius in meters
 * @returns Locations within the radius, sorted by distance
 */
export function findNearbyLocations(
    locations: Location[],
    lat: number,
    lng: number,
    radiusInMeters: number = 500
): Location[] {
    return locations
        .map((location) => {
            const distance = calculateDistance(
                lat,
                lng,
                location.coordinates[0],
                location.coordinates[1]
            );
            return { location, distance };
        })
        .filter((item) => item.distance <= radiusInMeters)
        .sort((a, b) => a.distance - b.distance)
        .map((item) => item.location);
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
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
