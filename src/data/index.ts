import departments from "./departmentsData";
import hostels from "./hostelsData";
import facilities from "./facilitiesData";
import { Location } from "../types";

/**
 * Combined data for all campus locations
 */
export const allLocations: Location[] = [
    ...departments,
    ...hostels,
    ...facilities,
];

export { departments, hostels, facilities };

/**
 * Get categories with count of locations
 */
export const getCategories = () => {
    const categories: Record<string, number> = {};

    allLocations.forEach((location) => {
        if (categories[location.category]) {
            categories[location.category]++;
        } else {
            categories[location.category] = 1;
        }
    });

    return categories;
};

/**
 * Get location by ID
 */
export const getLocationById = (id: string): Location | undefined => {
    return allLocations.find((location) => location.id === id);
};

/**
 * Get locations by category
 */
export const getLocationsByCategory = (category: string): Location[] => {
    return allLocations.filter((location) => location.category === category);
};

/**
 * Search locations by query
 */
export const searchLocations = (query: string): Location[] => {
    const lowerQuery = query.toLowerCase();

    return allLocations.filter(
        (location) =>
            location.name.toLowerCase().includes(lowerQuery) ||
            location.description.toLowerCase().includes(lowerQuery) ||
            (location.buildingCode &&
                location.buildingCode.toLowerCase().includes(lowerQuery)) ||
            (location.tags &&
                location.tags.some((tag) =>
                    tag.toLowerCase().includes(lowerQuery)
                ))
    );
};

export default allLocations;
