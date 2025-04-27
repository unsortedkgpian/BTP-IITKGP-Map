// // "use client";

// // import { useEffect } from "react";
// // import {
// //     MapContainer,
// //     TileLayer,
// //     ZoomControl,
// //     useMap,
// //     Polyline,
// //     Popup,
// // } from "react-leaflet";
// // import L from "leaflet";
// // import "leaflet/dist/leaflet.css";
// // import { Location, Route, PathData } from "@/types";
// // import MapMarker from "./MapMarker";

// // import type { LatLngTuple } from "leaflet";

// // // Campus configuration
// // const campusCenter: [number, number] = [22.3196, 87.3102];
// // const campusBoundary: {
// //     northEast: LatLngTuple;
// //     southWest: LatLngTuple;
// // } = {
// //     northEast: [22.3228, 87.3293],
// //     southWest: [22.3064, 87.2937],
// // };
// // const mapConfig = {
// //     initialZoom: 18,
// //     minZoom: 16,
// //     maxZoom: 20,
// //     defaultTileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
// // };

// // // Fix for Leaflet icons in Next.js
// // const fixLeafletIcons = () => {
// //     delete (L.Icon.Default.prototype as any)._getIconUrl;
// //     L.Icon.Default.mergeOptions({
// //         iconRetinaUrl: "/leaflet/marker-icon-2x.png",
// //         iconUrl: "/leaflet/marker-icon.png",
// //         shadowUrl: "/leaflet/marker-shadow.png",
// //     });
// // };

// // interface CampusMapProps {
// //     locations: Location[];
// //     paths?: PathData[];
// //     selectedLocation?: Location;
// //     route?: Route;
// //     onLocationClick: (location: Location) => void;
// // }

// // const CampusMap = ({
// //     locations,
// //     paths,
// //     selectedLocation,
// //     route,
// //     onLocationClick,
// // }: CampusMapProps) => {
// //     useEffect(() => {
// //         fixLeafletIcons();
// //     }, []);

// //     // Path styling functions
// //     const getPathColor = (type: string): string => {
// //         switch (type) {
// //             case "main":
// //                 return "#ff6b6b"; // Red for main roads
// //             case "secondary":
// //                 return "#74b9ff"; // Blue for secondary roads
// //             case "footpath":
// //                 return "#55efc4"; // Green for footpaths
// //             default:
// //                 return "#a29bfe"; // Purple for other
// //         }
// //     };

// //     const getPathWeight = (type: string): number => {
// //         switch (type) {
// //             case "main":
// //                 return 4;
// //             case "secondary":
// //                 return 3;
// //             case "footpath":
// //                 return 2;
// //             default:
// //                 return 2;
// //         }
// //     };

// //     return (
// //         <div className="w-full h-full relative">
// //             <MapContainer
// //                 center={campusCenter}
// //                 zoom={mapConfig.initialZoom}
// //                 minZoom={mapConfig.minZoom}
// //                 maxZoom={mapConfig.maxZoom}
// //                 maxBounds={[campusBoundary.southWest, campusBoundary.northEast]}
// //                 style={{ height: "100%", width: "100%" }}
// //                 zoomControl={false}
// //                 attributionControl={true}
// //                 className="z-10"
// //             >
// //                 <TileLayer
// //                     url={mapConfig.defaultTileLayer}
// //                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //                 />
// //                 <ZoomControl position="bottomright" />

// //                 {/* Display campus paths from GeoJSON */}
// //                 {paths?.map((path) => (
// //                     <Polyline
// //                         key={path.id}
// //                         positions={path.coordinates}
// //                         pathOptions={{
// //                             color: getPathColor(path.type),
// //                             weight: getPathWeight(path.type),
// //                             opacity: 0.7,
// //                         }}
// //                     >
// //                         {path.name && (
// //                             <Popup>
// //                                 <div className="p-1">
// //                                     <p className="font-medium">{path.name}</p>
// //                                     <p className="text-xs text-gray-600">
// //                                         {path.type.charAt(0).toUpperCase() +
// //                                             path.type.slice(1)}
// //                                     </p>
// //                                 </div>
// //                             </Popup>
// //                         )}
// //                     </Polyline>
// //                 ))}

// //                 {/* Display navigation route if available */}
// //                 {route && (
// //                     <Polyline
// //                         positions={route.path}
// //                         pathOptions={{
// //                             color: "#e84393",
// //                             weight: 5,
// //                             opacity: 0.8,
// //                             dashArray: "10, 10",
// //                         }}
// //                     >
// //                         <Popup>
// //                             <div className="p-2">
// //                                 <p className="font-medium">Route</p>
// //                                 <p>From: {route.start.name}</p>
// //                                 <p>To: {route.end.name}</p>
// //                                 <p>
// //                                     Distance:{" "}
// //                                     {route.distance < 1000
// //                                         ? `${Math.round(route.distance)} m`
// //                                         : `${(route.distance / 1000).toFixed(
// //                                               1
// //                                           )} km`}
// //                                 </p>
// //                             </div>
// //                         </Popup>
// //                     </Polyline>
// //                 )}

// //                 {/* Display all campus locations */}
// //                 {locations.map((location) => (
// //                     <MapMarker
// //                         key={location.id}
// //                         location={location}
// //                         isSelected={selectedLocation?.id === location.id}
// //                         onClick={() => onLocationClick(location)}
// //                     />
// //                 ))}

// //                 {/* Center map on selection */}
// //                 {selectedLocation && (
// //                     <CenterOnLocation location={selectedLocation} />
// //                 )}
// //             </MapContainer>
// //         </div>
// //     );
// // };

// // // Helper component to center map on selected location
// // const CenterOnLocation = ({ location }: { location: Location }) => {
// //     const map = useMap();

// //     useEffect(() => {
// //         map.setView(location.coordinates, 18);
// //     }, [location, map]);

// //     return null;
// // };

// // export default CampusMap;

// "use client";

// import { useEffect } from "react";
// import {
//     MapContainer,
//     TileLayer,
//     ZoomControl,
//     useMap,
//     Polyline,
//     Popup,
//     Rectangle,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { Location, Route, PathData } from "@/types";
// import MapMarker from "./MapMarker";

// import type { LatLngTuple } from "leaflet";

// // More precisely defined IIT KGP campus boundaries
// const campusCenter: [number, number] = [22.3196, 87.3102]; // Center of IIT KGP
// const campusBoundary: {
//     northEast: LatLngTuple;
//     southWest: LatLngTuple;
// } = {
//     // More tightly defined boundary to just include IIT KGP campus
//     northEast: [22.323, 87.321],
//     southWest: [22.315, 87.298],
// };

// const mapConfig = {
//     initialZoom: 17, // Increased zoom level to focus more on campus
//     minZoom: 16, // Prevents zooming out too far
//     maxZoom: 20,
//     defaultTileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
// };

// // Fix for Leaflet icons in Next.js
// const fixLeafletIcons = () => {
//     delete (L.Icon.Default.prototype as any)._getIconUrl;
//     L.Icon.Default.mergeOptions({
//         iconRetinaUrl: "/leaflet/marker-icon-2x.png",
//         iconUrl: "/leaflet/marker-icon.png",
//         shadowUrl: "/leaflet/marker-shadow.png",
//     });
// };

// interface CampusMapProps {
//     locations: Location[];
//     paths?: PathData[];
//     selectedLocation?: Location;
//     route?: Route;
//     onLocationClick: (location: Location) => void;
// }

// const CampusMap = ({
//     locations,
//     paths,
//     selectedLocation,
//     route,
//     onLocationClick,
// }: CampusMapProps) => {
//     useEffect(() => {
//         fixLeafletIcons();
//     }, []);

//     // Path styling functions
//     const getPathColor = (type: string): string => {
//         switch (type) {
//             case "main":
//                 return "#ff6b6b"; // Red for main roads
//             case "secondary":
//                 return "#74b9ff"; // Blue for secondary roads
//             case "footpath":
//                 return "#55efc4"; // Green for footpaths
//             default:
//                 return "#a29bfe"; // Purple for other
//         }
//     };

//     const getPathWeight = (type: string): number => {
//         switch (type) {
//             case "main":
//                 return 4;
//             case "secondary":
//                 return 3;
//             case "footpath":
//                 return 2;
//             default:
//                 return 2;
//         }
//     };

//     return (
//         <div className="w-full h-full relative">
//             <MapContainer
//                 center={campusCenter}
//                 zoom={mapConfig.initialZoom}
//                 minZoom={mapConfig.minZoom}
//                 maxZoom={mapConfig.maxZoom}
//                 maxBounds={[campusBoundary.southWest, campusBoundary.northEast]}
//                 maxBoundsViscosity={1.0} // Prevents dragging outside bounds completely
//                 style={{ height: "100%", width: "100%" }}
//                 zoomControl={false}
//                 attributionControl={true}
//                 className="z-10"
//             >
//                 <TileLayer
//                     url={mapConfig.defaultTileLayer}
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     noWrap={true} // Prevents multiple worlds in view
//                 />
//                 <ZoomControl position="bottomright" />

//                 {/* Mask areas outside campus with semi-transparent overlay */}
//                 <CampusMask />

//                 {/* Display campus paths from GeoJSON */}
//                 {paths?.map((path) => (
//                     <Polyline
//                         key={path.id}
//                         positions={path.coordinates}
//                         pathOptions={{
//                             color: getPathColor(path.type),
//                             weight: getPathWeight(path.type),
//                             opacity: 0.7,
//                         }}
//                     >
//                         {path.name && (
//                             <Popup>
//                                 <div className="p-1">
//                                     <p className="font-medium">{path.name}</p>
//                                     <p className="text-xs text-gray-600">
//                                         {path.type.charAt(0).toUpperCase() +
//                                             path.type.slice(1)}
//                                     </p>
//                                 </div>
//                             </Popup>
//                         )}
//                     </Polyline>
//                 ))}

//                 {/* Display navigation route if available */}
//                 {route && (
//                     <Polyline
//                         positions={route.path}
//                         pathOptions={{
//                             color: "#e84393",
//                             weight: 5,
//                             opacity: 0.8,
//                             dashArray: "10, 10",
//                         }}
//                     >
//                         <Popup>
//                             <div className="p-2">
//                                 <p className="font-medium">Route</p>
//                                 <p>From: {route.start.name}</p>
//                                 <p>To: {route.end.name}</p>
//                                 <p>
//                                     Distance:{" "}
//                                     {route.distance < 1000
//                                         ? `${Math.round(route.distance)} m`
//                                         : `${(route.distance / 1000).toFixed(
//                                               1
//                                           )} km`}
//                                 </p>
//                             </div>
//                         </Popup>
//                     </Polyline>
//                 )}

//                 {/* Display all campus locations */}
//                 {locations.map((location) => (
//                     <MapMarker
//                         key={location.id}
//                         location={location}
//                         isSelected={selectedLocation?.id === location.id}
//                         onClick={() => onLocationClick(location)}
//                     />
//                 ))}

//                 {/* Center map on selection */}
//                 {selectedLocation && (
//                     <CenterOnLocation location={selectedLocation} />
//                 )}

//                 {/* Add map bounds enforcer */}
//                 <MapBoundsEnforcer />
//             </MapContainer>
//         </div>
//     );
// };

// // Component to create a mask outside campus boundaries
// const CampusMask = () => {
//     const ne = campusBoundary.northEast;
//     const sw = campusBoundary.southWest;

//     // Create a rectangle around the campus boundary
//     return (
//         <Rectangle
//             bounds={[campusBoundary.southWest, campusBoundary.northEast]}
//             pathOptions={{
//                 color: "#3498db",
//                 weight: 2,
//                 fillOpacity: 0,
//                 interactive: false,
//             }}
//         />
//     );
// };

// // Helper component to center map on selected location
// const CenterOnLocation = ({ location }: { location: Location }) => {
//     const map = useMap();

//     useEffect(() => {
//         map.setView(location.coordinates, 18);
//     }, [location, map]);

//     return null;
// };

// // Helper component to ensure map stays within bounds
// const MapBoundsEnforcer = () => {
//     const map = useMap();

//     useEffect(() => {
//         // Function to enforce map bounds
//         const enforceMapBounds = () => {
//             map.panInsideBounds(
//                 [campusBoundary.southWest, campusBoundary.northEast],
//                 { animate: false }
//             );
//         };

//         // Add event listeners
//         map.on("drag", enforceMapBounds);
//         map.on("zoomend", enforceMapBounds);

//         // Initial bounds enforcement
//         enforceMapBounds();

//         // Cleanup
//         return () => {
//             map.off("drag", enforceMapBounds);
//             map.off("zoomend", enforceMapBounds);
//         };
//     }, [map]);

//     return null;
// };

// export default CampusMap;

"use client";

import { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    ZoomControl,
    useMap,
    Polyline,
    Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location, Route, PathData } from "@/types";
import MapMarker from "./MapMarker";

import type { LatLngTuple } from "leaflet";

// IIT KGP campus boundaries
const campusCenter: [number, number] = [22.3196, 87.3102]; // Center of IIT KGP
const campusBoundary: {
    northEast: LatLngTuple;
    southWest: LatLngTuple;
} = {
    // Defined boundary to just include IIT KGP campus
    northEast: [22.323, 87.321],
    southWest: [22.315, 87.298],
};

const mapConfig = {
    initialZoom: 16, // Reduced zoom level as requested
    minZoom: 15, // Prevents zooming out too far
    maxZoom: 20,
    defaultTileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

// Fix for Leaflet icons in Next.js
const fixLeafletIcons = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
    });
};

interface CampusMapProps {
    locations: Location[];
    paths?: PathData[];
    selectedLocation?: Location;
    route?: Route;
    onLocationClick: (location: Location) => void;
}

const CampusMap = ({
    locations,
    paths,
    selectedLocation,
    route,
    onLocationClick,
}: CampusMapProps) => {
    useEffect(() => {
        fixLeafletIcons();
    }, []);

    // Path styling functions
    const getPathColor = (type: string): string => {
        switch (type) {
            case "main":
                return "#ff6b6b"; // Red for main roads
            case "secondary":
                return "#74b9ff"; // Blue for secondary roads
            case "footpath":
                return "#55efc4"; // Green for footpaths
            default:
                return "#a29bfe"; // Purple for other
        }
    };

    const getPathWeight = (type: string): number => {
        switch (type) {
            case "main":
                return 4;
            case "secondary":
                return 3;
            case "footpath":
                return 2;
            default:
                return 2;
        }
    };

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={campusCenter}
                zoom={mapConfig.initialZoom}
                minZoom={mapConfig.minZoom}
                maxZoom={mapConfig.maxZoom}
                maxBounds={[campusBoundary.southWest, campusBoundary.northEast]}
                maxBoundsViscosity={1.0} // Prevents dragging outside bounds completely
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                attributionControl={true}
                className="z-10"
            >
                <TileLayer
                    url={mapConfig.defaultTileLayer}
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    noWrap={true} // Prevents multiple worlds in view
                />
                <ZoomControl position="bottomright" />

                {/* Display campus paths from GeoJSON */}
                {paths?.map((path) => (
                    <Polyline
                        key={path.id}
                        positions={path.coordinates}
                        pathOptions={{
                            color: getPathColor(path.type),
                            weight: getPathWeight(path.type),
                            opacity: 0.7,
                        }}
                    >
                        {path.name && (
                            <Popup>
                                <div className="p-1">
                                    <p className="font-medium">{path.name}</p>
                                    <p className="text-xs text-gray-600">
                                        {path.type.charAt(0).toUpperCase() +
                                            path.type.slice(1)}
                                    </p>
                                </div>
                            </Popup>
                        )}
                    </Polyline>
                ))}

                {/* Display navigation route if available */}
                {route && (
                    <Polyline
                        positions={route.path}
                        pathOptions={{
                            color: "#e84393",
                            weight: 5,
                            opacity: 0.8,
                            dashArray: "10, 10",
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <p className="font-medium">Route</p>
                                <p>From: {route.start.name}</p>
                                <p>To: {route.end.name}</p>
                                <p>
                                    Distance:{" "}
                                    {route.distance < 1000
                                        ? `${Math.round(route.distance)} m`
                                        : `${(route.distance / 1000).toFixed(
                                              1
                                          )} km`}
                                </p>
                            </div>
                        </Popup>
                    </Polyline>
                )}

                {/* Display all campus locations */}
                {locations.map((location) => (
                    <MapMarker
                        key={location.id}
                        location={location}
                        isSelected={selectedLocation?.id === location.id}
                        onClick={() => onLocationClick(location)}
                    />
                ))}

                {/* Center map on selection */}
                {selectedLocation && (
                    <CenterOnLocation location={selectedLocation} />
                )}

                {/* Add map bounds enforcer */}
                <MapBoundsEnforcer />
            </MapContainer>
        </div>
    );
};

// Helper component to center map on selected location
const CenterOnLocation = ({ location }: { location: Location }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(location.coordinates, 18);
    }, [location, map]);

    return null;
};

// Helper component to ensure map stays within bounds
const MapBoundsEnforcer = () => {
    const map = useMap();

    useEffect(() => {
        // Function to enforce map bounds
        const enforceMapBounds = () => {
            map.panInsideBounds(
                [campusBoundary.southWest, campusBoundary.northEast],
                { animate: false }
            );
        };

        // Add event listeners
        map.on("drag", enforceMapBounds);
        map.on("zoomend", enforceMapBounds);

        // Initial bounds enforcement
        enforceMapBounds();

        // Cleanup
        return () => {
            map.off("drag", enforceMapBounds);
            map.off("zoomend", enforceMapBounds);
        };
    }, [map]);

    return null;
};

export default CampusMap;
