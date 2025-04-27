"use client";

import { useState, useEffect, useRef } from "react";
import { Location, SearchResult } from "@/types";
import { searchLocations } from "@/utils/searchUtils";

interface SearchBarProps {
    locations: Location[];
    onLocationSelect: (location: Location) => void;
}

const SearchBar = ({ locations, onLocationSelect }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Search locations when query changes
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const searchResults = searchLocations(locations, query);
        setResults(searchResults.slice(0, 10)); // Limit to top 10 results
    }, [query, locations]);

    // Handle clicks outside the search component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for buildings, hostels, departments..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {results.map(({ location, relevance }) => (
                        <div
                            key={location.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onLocationSelect(location);
                                setIsOpen(false);
                                setQuery("");
                            }}
                        >
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-gray-600">
                                {location.category.charAt(0).toUpperCase() +
                                    location.category.slice(1)}
                                {location.buildingCode &&
                                    ` (${location.buildingCode})`}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && query.trim().length >= 2 && results.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg p-3 text-center text-gray-500">
                    No locations found
                </div>
            )}
        </div>
    );
};

export default SearchBar;
