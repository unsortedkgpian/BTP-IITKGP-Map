// src/types/Location.ts

/**
 * Types of locations on campus
 */
export type LocationCategory =
    | "academic" // Departments, lecture halls
    | "hostel" // Student residences
    | "dining" // Canteens, messes, food courts
    | "sports" // Stadiums, gyms, courts
    | "administrative" // Admin offices, main building
    | "landmark" // Important landmarks
    | "library" // Libraries
    | "utility" // Shops, banks, post office, etc.
    | "medical" // Health center, hospitals
    | "recreational"; // Parks, entertainment venues

/**
 * Represents a location on the IIT KGP campus
 */
export interface Location {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number]; // [latitude, longitude]
    category: LocationCategory;
    buildingCode?: string;
    imageUrl?: string;
    floorCount?: number;
    hours?: string;
    tags?: string[];
    isAccessible?: boolean; // Wheelchair accessibility
    address?: string;
    phone?: string;
    website?: string;
    geometry?: GeoJSON.Geometry;
}

/**
 * Campus boundary definition
 */
export interface CampusBoundary {
    northEast: [number, number]; // [latitude, longitude]
    southWest: [number, number]; // [latitude, longitude]
}
