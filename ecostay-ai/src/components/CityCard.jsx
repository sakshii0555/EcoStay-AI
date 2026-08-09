import { Link } from "react-router-dom";

function CityCard({ city, stateId }) {
    return (
        <Link
            to={`/destination/${city.id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
        >
            <div className="relative h-64 overflow-hidden">

                <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition"></div>

                <div className="absolute bottom-0 left-0 right-0 p-5">

                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                        {city.name}
                    </h2>

                </div>

            </div>

            <div className="p-5">

                <p className="text-gray-600 line-clamp-3">
                    {city.description}
                </p>

                <p className="text-green-600 font-semibold mt-4">
                    Explore {city.name} →
                </p>

            </div>
        </Link>
    );
}

export default CityCard;