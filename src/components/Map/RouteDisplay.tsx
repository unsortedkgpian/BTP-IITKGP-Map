// src/components/Map/RouteDisplay.tsx

import { Polyline, Popup } from "react-leaflet";
import type { Route } from "@/types";
import { formatDistance, formatDuration } from "@/utils/formatters";

interface RouteDisplayProps {
    route: Route;
}

const RouteDisplay = ({ route }: RouteDisplayProps) => {
    return (
        <>
            <Polyline
                positions={route.path}
                pathOptions={{
                    color: "#3498db",
                    weight: 5,
                    opacity: 0.7,
                    lineCap: "round",
                    lineJoin: "round",
                    dashArray: "10, 10",
                }}
            >
                <Popup>
                    <div className="p-2">
                        <h3 className="font-bold">Route Information</h3>
                        <p>From: {route.start.name}</p>
                        <p>To: {route.end.name}</p>
                        <p>Distance: {formatDistance(route.distance)}</p>
                        <p>Walking time: {formatDuration(route.duration)}</p>
                    </div>
                </Popup>
            </Polyline>
        </>
    );
};

export default RouteDisplay;
