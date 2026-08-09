import { Link } from "react-router-dom";

function CityCard({ city, stateId }) {
    return (
        <Link
            to={`/district/${stateId}/${city.id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
        >
            {/* Image */}
            <div className="relative h-80 overflow-hidden">
                <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition"></div>

                {/* District Name */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                        {city.name}
                    </h2>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
                <p className="text-gray-600 line-clamp-3">
                    {city.description ||
                        `Explore the beautiful district of ${city.name}.`}
                </p>

                <p className="text-green-600 font-semibold mt-4">
                    Explore {city.name} →
                </p>
            </div>
        </Link>
    );
}

export default CityCard;