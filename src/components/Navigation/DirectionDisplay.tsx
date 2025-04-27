import { Route } from "@/types";
import { formatDistance, formatDuration } from "@/utils/formatters";

interface DirectionDisplayProps {
    route: Route;
}

const DirectionDisplay = ({ route }: DirectionDisplayProps) => {
    return (
        <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Route Summary</h3>
                <div className="text-sm">
                    <span className="font-medium">
                        {formatDistance(route.distance)}
                    </span>
                    <span className="mx-1">•</span>
                    <span>{formatDuration(route.duration)}</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex justify-center items-center text-white mr-2">
                        A
                    </div>
                    <span className="font-medium">{route.start.name}</span>
                </div>

                <div className="border-l-2 border-gray-300 ml-3 pl-5 py-2">
                    <div className="text-sm text-gray-600">
                        {formatDistance(route.distance)} •{" "}
                        {formatDuration(route.duration)}
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center text-white mr-2">
                        B
                    </div>
                    <span className="font-medium">{route.end.name}</span>
                </div>
            </div>

            <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Directions</h4>

                <ul className="space-y-3">
                    {route.instructions.map((instruction, index) => (
                        <li key={index} className="flex">
                            <div className="mr-3 flex-shrink-0">
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xs">
                                    {index + 1}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm">{instruction.text}</p>
                                <p className="text-xs text-gray-500">
                                    {formatDistance(instruction.distance)} •{" "}
                                    {formatDuration(instruction.duration)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DirectionDisplay;
