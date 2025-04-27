// "use client";

// import { useState, useEffect } from "react";
// import { loadGeoJsonData } from "@/utils/geoJsonLoader";
// import CampusMap from "@/components/Map/CampusMap";
// import SearchBar from "@/components/Search/SearchBar";
// import NavigationControls from "@/components/Navigation/NavigationControls";
// import DirectionDisplay from "@/components/Navigation/DirectionDisplay";
// import { Location, Route, PathData } from "@/types";

// // Fallback to hardcoded data
// import allLocations from "@/data";

// export default function Home() {
//     // State for map data
//     const [locations, setLocations] = useState<Location[]>([]);
//     const [paths, setPaths] = useState<PathData[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // State for UI interactions
//     const [selectedLocation, setSelectedLocation] = useState<
//         Location | undefined
//     >(undefined);
//     const [currentRoute, setCurrentRoute] = useState<Route | undefined>(
//         undefined
//     );
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     // Load GeoJSON data on component mount
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 setIsLoading(true);

//                 // Try to load data from GeoJSON file
//                 const { buildings, paths } = await loadGeoJsonData();

//                 if (buildings.length > 0) {
//                     setLocations(buildings);
//                     setPaths(paths);
//                 } else {
//                     // Fall back to static data if GeoJSON parsing fails
//                     console.log("Falling back to static location data");
//                     setLocations(allLocations);
//                 }

//                 setError(null);
//             } catch (error) {
//                 console.error("Error loading data:", error);
//                 setError("Failed to load campus data");
//                 setLocations(allLocations); // Fallback to static data
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

//     // Handle location selection from map or search
//     const handleLocationSelect = (location: Location) => {
//         setSelectedLocation(location);
//         setIsSidebarOpen(true);
//     };

//     // Handle route calculation
//     const handleRouteCalculated = (route: Route) => {
//         setCurrentRoute(route);
//     };

//     // Show loading spinner while data is being fetched
//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <main className="flex flex-col h-screen">
//             {/* Header with search bar */}
//             <header className="bg-white shadow-md p-4 flex items-center justify-between z-20">
//                 <div className="flex items-center">
//                     <h1 className="text-xl font-bold text-gray-800 mr-4">
//                         IIT KGP Campus Map
//                     </h1>
//                 </div>
//                 <SearchBar
//                     locations={locations}
//                     onLocationSelect={handleLocationSelect}
//                 />
//             </header>

//             <div className="flex flex-1 overflow-hidden">
//                 {/* Sidebar */}
//                 {isSidebarOpen && (
//                     <div className="w-80 bg-white shadow-lg h-full flex flex-col z-10">
//                         <div className="p-4 border-b">
//                             <h2 className="text-lg font-bold mb-2">
//                                 {selectedLocation
//                                     ? selectedLocation.name
//                                     : "Select a location"}
//                             </h2>
//                             {selectedLocation && (
//                                 <p className="text-gray-600 mb-4">
//                                     {selectedLocation.description}
//                                 </p>
//                             )}
//                         </div>

//                         <div className="p-4 overflow-y-auto flex-1">
//                             {/* Location details */}
//                             {selectedLocation && (
//                                 <div className="mb-6">
//                                     {selectedLocation.buildingCode && (
//                                         <p className="mb-2">
//                                             <span className="font-medium">
//                                                 Building Code:
//                                             </span>{" "}
//                                             {selectedLocation.buildingCode}
//                                         </p>
//                                     )}
//                                     {selectedLocation.address && (
//                                         <p className="mb-2">
//                                             <span className="font-medium">
//                                                 Address:
//                                             </span>{" "}
//                                             {selectedLocation.address}
//                                         </p>
//                                     )}
//                                     {selectedLocation.phone && (
//                                         <p className="mb-2">
//                                             <span className="font-medium">
//                                                 Phone:
//                                             </span>{" "}
//                                             {selectedLocation.phone}
//                                         </p>
//                                     )}
//                                     {selectedLocation.website && (
//                                         <p className="mb-2">
//                                             <span className="font-medium">
//                                                 Website:
//                                             </span>{" "}
//                                             <a
//                                                 href={selectedLocation.website}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-500 hover:underline"
//                                             >
//                                                 {selectedLocation.website}
//                                             </a>
//                                         </p>
//                                     )}
//                                     {selectedLocation.floorCount && (
//                                         <p className="mb-2">
//                                             <span className="font-medium">
//                                                 Floors:
//                                             </span>{" "}
//                                             {selectedLocation.floorCount}
//                                         </p>
//                                     )}
//                                     {selectedLocation.isAccessible !==
//                                         undefined && (
//                                         <p className="mb-2">
//                                             <span className="font-medium">
//                                                 Wheelchair Access:
//                                             </span>{" "}
//                                             {selectedLocation.isAccessible
//                                                 ? "Yes"
//                                                 : "No"}
//                                         </p>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Navigation controls */}
//                             <NavigationControls
//                                 locations={locations}
//                                 selectedLocation={selectedLocation}
//                                 onRouteCalculated={handleRouteCalculated}
//                             />

//                             {/* Route directions */}
//                             {currentRoute && (
//                                 <DirectionDisplay route={currentRoute} />
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Main map container */}
//                 <div className="flex-1 relative">
//                     <button
//                         className="absolute top-4 left-4 z-30 bg-white p-2 rounded-full shadow-md"
//                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     >
//                         {isSidebarOpen ? "←" : "→"}
//                     </button>

//                     <CampusMap
//                         locations={locations}
//                         paths={paths}
//                         selectedLocation={selectedLocation}
//                         route={currentRoute}
//                         onLocationClick={handleLocationSelect}
//                     />
//                 </div>
//             </div>
//         </main>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { loadGeoJsonData } from "@/utils/geoJsonLoader";
// import CampusMap from "@/components/Map/CampusMap";
// import SearchBar from "@/components/Search/SearchBar";
// import NavigationControls from "@/components/Navigation/NavigationControls";
// import DirectionDisplay from "@/components/Navigation/DirectionDisplay";
import { Location, Route, PathData } from "@/types";


import dynamic from "next/dynamic"; // import dynamic from next

const CampusMap = dynamic(() => import("@/components/Map/CampusMap"), {
    ssr: false,
});

const SearchBar = dynamic(() => import("@/components/Search/SearchBar"), {
    ssr: false,
});

const NavigationControls = dynamic(
    () => import("@/components/Navigation/NavigationControls"),
    { ssr: false }
);

const DirectionDisplay = dynamic(
    () => import("@/components/Navigation/DirectionDisplay"),
    { ssr: false }
);

// Fallback to hardcoded data
import allLocations from "@/data";

export default function Home() {
    // State for map data
    const [locations, setLocations] = useState<Location[]>([]);
    const [paths, setPaths] = useState<PathData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for UI interactions
    const [selectedLocation, setSelectedLocation] = useState<
        Location | undefined
    >(undefined);
    const [currentRoute, setCurrentRoute] = useState<Route | undefined>(
        undefined
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Load GeoJSON data on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                // Try to load data from GeoJSON file
                const { buildings, paths } = await loadGeoJsonData();

                if (buildings.length > 0) {
                    setLocations(buildings);
                    setPaths(paths);
                } else {
                    // Fall back to static data if GeoJSON parsing fails
                    console.log("Falling back to static location data");
                    setLocations(allLocations);
                }

                setError(null);
            } catch (error) {
                console.error("Error loading data:", error);
                setError("Failed to load campus data");
                setLocations(allLocations); // Fallback to static data
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Handle location selection from map or search
    const handleLocationSelect = (location: Location) => {
        setSelectedLocation(location);
        setIsSidebarOpen(true);
    };

    // Handle route calculation
    const handleRouteCalculated = (route: Route) => {
        setCurrentRoute(route);
    };

    // Show loading spinner while data is being fetched
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
        );
    }

    return (
        <main className="flex flex-col h-screen bg-gray-100">
            {/* Header with search bar */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-4 flex items-center justify-between z-20">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-white mr-4">
                        IIT KGP Campus Map
                    </h1>
                </div>
                <SearchBar
                    locations={locations}
                    onLocationSelect={handleLocationSelect}
                />
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {isSidebarOpen && (
                    <div className="w-80 bg-gradient-to-b from-indigo-50 to-blue-50 shadow-lg h-full flex flex-col z-10 border-r-2 border-blue-200">
                        <div className="p-4 border-b border-blue-200 bg-gradient-to-r from-blue-100 to-indigo-100">
                            <h2 className="text-lg font-bold mb-2 text-blue-800">
                                {selectedLocation
                                    ? selectedLocation.name
                                    : "Select a location"}
                            </h2>
                            {selectedLocation && (
                                <p className="text-blue-600 mb-4">
                                    {selectedLocation.description}
                                </p>
                            )}
                        </div>

                        <div className="p-4 overflow-y-auto flex-1">
                            {/* Location details */}
                            {selectedLocation && (
                                <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                                    {selectedLocation.buildingCode && (
                                        <p className="mb-2 flex">
                                            <span className="font-medium text-purple-700 min-w-24">
                                                Building Code:
                                            </span>{" "}
                                            <span className="text-gray-800">
                                                {selectedLocation.buildingCode}
                                            </span>
                                        </p>
                                    )}
                                    {selectedLocation.address && (
                                        <p className="mb-2 flex">
                                            <span className="font-medium text-purple-700 min-w-24">
                                                Address:
                                            </span>{" "}
                                            <span className="text-gray-800">
                                                {selectedLocation.address}
                                            </span>
                                        </p>
                                    )}
                                    {selectedLocation.phone && (
                                        <p className="mb-2 flex">
                                            <span className="font-medium text-purple-700 min-w-24">
                                                Phone:
                                            </span>{" "}
                                            <span className="text-gray-800">
                                                {selectedLocation.phone}
                                            </span>
                                        </p>
                                    )}
                                    {selectedLocation.website && (
                                        <p className="mb-2 flex">
                                            <span className="font-medium text-purple-700 min-w-24">
                                                Website:
                                            </span>{" "}
                                            <a
                                                href={selectedLocation.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700 hover:underline"
                                            >
                                                {selectedLocation.website}
                                            </a>
                                        </p>
                                    )}
                                    {selectedLocation.floorCount && (
                                        <p className="mb-2 flex">
                                            <span className="font-medium text-purple-700 min-w-24">
                                                Floors:
                                            </span>{" "}
                                            <span className="text-gray-800">
                                                {selectedLocation.floorCount}
                                            </span>
                                        </p>
                                    )}
                                    {selectedLocation.isAccessible !==
                                        undefined && (
                                        <p className="mb-2 flex">
                                            <span className="font-medium text-purple-700 min-w-24">
                                                Wheelchair Access:
                                            </span>{" "}
                                            <span
                                                className={
                                                    selectedLocation.isAccessible
                                                        ? "text-green-600 font-medium"
                                                        : "text-red-600 font-medium"
                                                }
                                            >
                                                {selectedLocation.isAccessible
                                                    ? "Yes"
                                                    : "No"}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Navigation controls */}
                            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <NavigationControls
                                    locations={locations}
                                    selectedLocation={selectedLocation}
                                    onRouteCalculated={handleRouteCalculated}
                                />
                            </div>

                            {/* Route directions */}
                            {currentRoute && (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg shadow-md border-l-4 border-green-500">
                                    <DirectionDisplay route={currentRoute} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main map container */}
                <div className="flex-1 relative">
                    <button
                        className="absolute top-4 left-4 z-30 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? "←" : "→"}
                    </button>

                    <CampusMap
                        locations={locations}
                        paths={paths}
                        selectedLocation={selectedLocation}
                        route={currentRoute}
                        onLocationClick={handleLocationSelect}
                    />
                </div>
            </div>
        </main>
    );
}
