import { Link } from "react-router-dom";

function StateCard({ state }) {
    return (
        <Link
            to={`/state/${state.id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
        >
            {/* State Image */}
            <div className="relative h-64 overflow-hidden">

                <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition duration-300"></div>

                {/* State Name */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                        {state.name}
                    </h2>
                </div>

            </div>

            {/* Description */}
            {state.description && (
                <div className="p-5">
                    <p className="text-gray-600 line-clamp-2">
                        {state.description}
                    </p>
                </div>
            )}

        </Link>
    );
}

export default StateCard;