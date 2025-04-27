// src/types/index.ts

// Location Types
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
    isAccessible?: boolean;
    address?: string;
    phone?: string;
    website?: string;
    geometry?: GeoJSON.Geometry;
}

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

export interface CampusBoundary {
    northEast: [number, number]; // [latitude, longitude]
    southWest: [number, number]; // [latitude, longitude]
}

// Navigation Types
export interface Route {
    start: Location;
    end: Location;
    path: [number, number][]; // Array of coordinate points
    distance: number; // in meters
    duration: number; // in seconds
    instructions: RouteInstruction[];
}

export interface RouteInstruction {
    text: string;
    distance: number;
    duration: number;
    maneuver: string; // e.g., 'straight', 'left', 'right'
    coordinates: [number, number];
}

export interface PathSegment {
    start: [number, number];
    end: [number, number];
    distance: number;
    isCovered?: boolean;
    isAccessible?: boolean;
    type: "road" | "footpath" | "trail";
}

// Path Data from GeoJSON
export interface PathData {
    id: string;
    type: "main" | "secondary" | "footpath" | "road";
    coordinates: [number, number][]; // Array of [latitude, longitude]
    isCovered?: boolean;
    isAccessible?: boolean;
    name?: string;
}

// Map Configuration Types
export interface MapConfig {
    initialZoom: number;
    minZoom: number;
    maxZoom: number;
    defaultTileLayer: string;
    mapboxStyle?: string;
}

export interface MarkerStyle {
    size: number;
    color: string;
    borderColor: string;
    textColor: string;
}

export interface CategoryStyles {
    [category: string]: {
        color: string;
        icon?: string;
    };
}

// Search Types
export interface SearchResult {
    location: Location;
    relevance: number;
}

// User Preferences
export interface UserPreferences {
    preferCoveredPaths?: boolean;
    preferAccessiblePaths?: boolean;
    darkMode?: boolean;
    favorites?: string[]; // Array of location IDs
}

// GeoJSON Types
export namespace GeoJSON {
    export type GeoJsonTypes =
        | "Point"
        | "LineString"
        | "Polygon"
        | "MultiPoint"
        | "MultiLineString"
        | "MultiPolygon"
        | "GeometryCollection"
        | "Feature"
        | "FeatureCollection";

    export interface GeoJsonObject {
        type: GeoJsonTypes;
    }

    export interface Geometry extends GeoJsonObject {
        coordinates: any;
    }

    export interface Point extends Geometry {
        type: "Point";
        coordinates: [number, number];
    }

    export interface LineString extends Geometry {
        type: "LineString";
        coordinates: [number, number][];
    }

    export interface Polygon extends Geometry {
        type: "Polygon";
        coordinates: [number, number][][];
    }

    export interface Feature extends GeoJsonObject {
        type: "Feature";
        geometry: Geometry;
        properties: { [key: string]: any };
        id?: string | number;
    }

    export interface FeatureCollection extends GeoJsonObject {
        type: "FeatureCollection";
        features: Feature[];
    }
}
