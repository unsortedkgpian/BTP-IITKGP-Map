// src/utils/geoJsonLoader.ts

import { Location, PathData, LocationCategory } from "../types";

/**
 * Loads and parses GeoJSON data from the provided file
 * @returns Object containing buildings and paths extracted from GeoJSON
 */
export async function loadGeoJsonData() {
    try {
        // Since the file is already in the public folder, we reference it directly
        const geojsonData = await fetch("/export.geojson").then((res) =>
            res.json()
        );

        // Parse buildings (departments, hostels, etc.)
        const buildings = parseBuildings(geojsonData.features);

        // Parse paths (roads, walkways, etc.)
        const paths = parsePaths(geojsonData.features);

        return { buildings, paths };
    } catch (error) {
        console.error("Error loading GeoJSON data:", error);
        return { buildings: [], paths: [] };
    }
}

/**
 * Parse building features into Location objects
 * @param features GeoJSON features array
 * @returns Array of Location objects
 */
function parseBuildings(features: any[]): Location[] {
    return features
        .filter(
            (feature) =>
                feature.geometry.type === "Polygon" &&
                feature.properties.building &&
                feature.properties.name
        )
        .map((feature) => {
            // Get the center point (simple average of coordinates)
            const coords = feature.geometry.coordinates[0];
            const center = getCentroid(coords);

            // Determine category based on properties
            const category = determineCategory(feature.properties);

            // Create a Location object
            return {
                id: `loc-${String(feature.properties["@id"]).replace(
                    "way/",
                    ""
                )}`,
                name: feature.properties.name || "",
                description:
                    feature.properties.description ||
                    `${feature.properties.name || ""} at IIT Kharagpur`,
                coordinates: [center[1], center[0]], // [latitude, longitude]
                category: category,
                buildingCode:
                    feature.properties.buildingCode ||
                    extractBuildingCode(feature.properties.name || ""),
                floorCount: feature.properties["building:levels"]
                    ? parseInt(feature.properties["building:levels"], 10)
                    : undefined,
                isAccessible: feature.properties.wheelchair === "yes",
                address: createAddress(feature.properties),
                phone: feature.properties.phone,
                website: feature.properties.website,
                tags: createTags(feature.properties, category),
            };
        });
}

/**
 * Parse path features into PathData objects
 * @param features GeoJSON features array
 * @returns Array of PathData objects
 */
function parsePaths(features: any[]): PathData[] {
    return features
        .filter(
            (feature) =>
                feature.geometry.type === "LineString" &&
                feature.properties.highway
        )
        .map((feature) => {
            return {
                id: `path-${String(feature.properties["@id"]).replace(
                    "way/",
                    ""
                )}`,
                type: getPathType(feature.properties.highway),
                coordinates: feature.geometry.coordinates.map(
                    (coord: number[]) =>
                        [coord[1], coord[0]] as [number, number]
                ), // [latitude, longitude]
                isCovered: feature.properties.covered === "yes",
                isAccessible: feature.properties.wheelchair === "yes",
                name: feature.properties.name || "",
            };
        });
}

/**
 * Determine the category of a location based on its properties
 * @param properties Feature properties from GeoJSON
 * @returns LocationCategory
 */
function determineCategory(properties: any): LocationCategory {
    const name = properties.name || "";

    if (
        properties.tourism === "hostel" ||
        name.includes("Hall of Residence") ||
        name.includes("Hostel")
    ) {
        return "hostel";
    }

    if (properties.amenity === "library" || name.includes("Library")) {
        return "library";
    }

    if (
        properties.amenity === "restaurant" ||
        properties.amenity === "canteen" ||
        name.includes("Canteen")
    ) {
        return "dining";
    }

    if (
        properties.leisure === "sports_centre" ||
        name.includes("Sports") ||
        name.includes("Gymkhana")
    ) {
        return "sports";
    }

    if (
        properties.amenity === "college" ||
        properties.building === "university" ||
        name.includes("Department") ||
        name.includes("DEPT")
    ) {
        return "academic";
    }

    if (name.includes("Hospital") || name.includes("Medical")) {
        return "medical";
    }

    if (properties.name === "Central Library") {
        return "library";
    }

    if (name.includes("Administration") || name.includes("Main Building")) {
        return "administrative";
    }

    if (properties.shop || name.includes("Market") || name.includes("Store")) {
        return "utility";
    }

    if (properties.leisure || name.includes("Park")) {
        return "recreational";
    }

    // Default to landmark for other buildings
    return "landmark";
}

/**
 * Extract a building code from the location name
 * @param name Location name
 * @returns Building code or empty string
 */
function extractBuildingCode(name: string): string {
    if (!name) return "";

    // Extract code from parentheses if present
    const parenthesesMatch = name.match(/\(([A-Z0-9]+)\)/);
    if (parenthesesMatch) return parenthesesMatch[1];

    // Try to generate from department name (e.g., DEPT OF CHEMISTRY -> CHEM)
    if (name.includes("DEPT OF") || name.includes("Department of")) {
        const deptName = name
            .replace("DEPT OF ", "")
            .replace("Department of ", "");

        // Special cases
        if (deptName.includes("CHEMICAL")) return "CHE";
        if (deptName.includes("CHEMISTRY")) return "CHEM";
        if (deptName.includes("ELECTRICAL")) return "EE";
        if (deptName.includes("ELECTRONICS")) return "ECE";
        if (deptName.includes("COMPUTER")) return "CSE";
        if (deptName.includes("MECHANICAL")) return "ME";
        if (deptName.includes("CIVIL")) return "CE";

        // Try to create acronym from first letters
        const words = deptName.split(" ");
        if (words.length > 1) {
            return words
                .filter(
                    (word) =>
                        word.length > 1 && !["AND", "OF", "THE"].includes(word)
                )
                .map((word) => word.charAt(0))
                .join("");
        }
    }

    return "";
}

/**
 * Create a formatted address from feature properties
 * @param properties Feature properties
 * @returns Formatted address string
 */
function createAddress(properties: any): string {
    const parts: string[] = []; // Define parts as string array

    if (properties["addr:housenumber"])
        parts.push(properties["addr:housenumber"]);
    if (properties["addr:street"]) parts.push(properties["addr:street"]);
    if (properties["addr:city"]) parts.push(properties["addr:city"]);
    if (properties["addr:postcode"]) parts.push(properties["addr:postcode"]);

    return parts.length > 0 ? parts.join(", ") : "IIT Kharagpur";
}

/**
 * Create tags array from feature properties and category
 * @param properties Feature properties
 * @param category Location category
 * @returns Array of tags
 */
function createTags(properties: any, category: LocationCategory): string[] {
    const tags: string[] = [category];

    if (properties.building) tags.push(properties.building);
    if (properties.amenity) tags.push(properties.amenity);

    // Add specific tags based on name
    const name = properties.name || "";
    const lowerName = name.toLowerCase();

    if (lowerName.includes("hostel") || lowerName.includes("hall")) {
        tags.push("residence");
        if (lowerName.includes("ladies") || lowerName.includes("girls")) {
            tags.push("ladies");
        } else {
            tags.push("boys");
        }
    }

    if (lowerName.includes("department") || lowerName.includes("dept")) {
        tags.push("department");

        // Add field of study
        if (lowerName.includes("computer")) tags.push("computer science");
        if (lowerName.includes("electrical")) tags.push("electrical");
        if (lowerName.includes("civil")) tags.push("civil");
        if (lowerName.includes("mechanical")) tags.push("mechanical");
        if (lowerName.includes("chemical")) tags.push("chemical");
        if (lowerName.includes("biotechnology")) tags.push("biotechnology");
    }

    return [...new Set(tags)]; // Remove duplicates
}

/**
 * Get the center point of a polygon
 * @param coords Array of polygon coordinates
 * @returns [x, y] centroid coordinates
 */
function getCentroid(coords: number[][]): number[] {
    const sumX = coords.reduce((sum, coord) => sum + coord[0], 0);
    const sumY = coords.reduce((sum, coord) => sum + coord[1], 0);
    return [sumX / coords.length, sumY / coords.length];
}

/**
 * Map highway types to path types
 * @param highway Highway type from OSM
 * @returns Simplified path type
 */
function getPathType(
    highway: string
): "main" | "secondary" | "footpath" | "road" {
    switch (highway) {
        case "footway":
        case "path":
            return "footpath";
        case "service":
        case "residential":
            return "secondary";
        case "tertiary":
        case "unclassified":
            return "main";
        default:
            return "road";
    }
}
