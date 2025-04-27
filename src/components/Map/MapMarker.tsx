import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Location } from "@/types";

// Category-based colors for markers
const categoryColors = {
    academic: "#3498db", // Blue
    hostel: "#e74c3c", // Red
    dining: "#f39c12", // Orange
    sports: "#2ecc71", // Green
    administrative: "#9b59b6", // Purple
    landmark: "#e67e22", // Dark Orange
    library: "#1abc9c", // Turquoise
    utility: "#95a5a6", // Gray
    medical: "#c0392b", // Dark Red
    recreational: "#16a085", // Light Green
};

interface MapMarkerProps {
    location: Location;
    isSelected?: boolean;
    onClick?: () => void;
}

const MapMarker = ({ location, isSelected, onClick }: MapMarkerProps) => {
    // Create custom marker based on location category
    const getMarkerIcon = () => {
        const size = isSelected ? 35 : 25;
        const iconColor = getCategoryColor(location.category);

        return L.divIcon({
            html: `
        <div style="
          background-color: ${iconColor};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
          font-size: ${isSelected ? "14px" : "12px"};
        ">
          ${location.buildingCode || location.category.charAt(0).toUpperCase()}
        </div>
      `,
            className: "",
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
            popupAnchor: [0, -size / 2],
        });
    };

    // Get color based on location category
    const getCategoryColor = (category: string): string => {
        return (
            categoryColors[category as keyof typeof categoryColors] || "#34495e"
        );
    };

    return (
        <Marker
            position={location.coordinates}
            icon={getMarkerIcon()}
            eventHandlers={{
                click: onClick,
            }}
        >
            <Popup>
                <div className="p-2 max-w-xs">
                    <h3 className="font-bold text-lg">{location.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        {location.description}
                    </p>

                    <div className="text-xs bg-gray-100 px-2 py-1 rounded inline-block mb-2">
                        {location.category.charAt(0).toUpperCase() +
                            location.category.slice(1)}
                    </div>

                    {location.buildingCode && (
                        <p className="text-sm">
                            <span className="font-medium">Building Code:</span>{" "}
                            {location.buildingCode}
                        </p>
                    )}

                    {location.floorCount && (
                        <p className="text-sm">
                            <span className="font-medium">Floors:</span>{" "}
                            {location.floorCount}
                        </p>
                    )}

                    {location.address && (
                        <p className="text-sm">
                            <span className="font-medium">Address:</span>{" "}
                            {location.address}
                        </p>
                    )}

                    {location.phone && (
                        <p className="text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {location.phone}
                        </p>
                    )}

                    {location.website && (
                        <p className="text-sm">
                            <a
                                href={location.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Website
                            </a>
                        </p>
                    )}

                    {location.isAccessible !== undefined && (
                        <p className="text-sm">
                            <span className="font-medium">
                                Wheelchair Access:
                            </span>{" "}
                            {location.isAccessible ? "Yes" : "No"}
                        </p>
                    )}

                    {location.tags && location.tags.length > 0 && (
                        <div className="mt-2">
                            {location.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

export default MapMarker;
