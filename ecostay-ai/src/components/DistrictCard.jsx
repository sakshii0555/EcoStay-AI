import { Link } from "react-router-dom";

function DistrictCard({ district }) {
    return (
        <Link
            to={`/district/uttarakhand/${district.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
        >
            {/* District Image */}
            <div className="h-64 overflow-hidden">
                <img
                    src={district.image}
                    alt={district.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
            </div>

            {/* District Name */}
            <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    {district.name}
                </h2>

                <p className="text-gray-500 mt-2">
                    Explore the beauty, culture and experiences of{" "}
                    {district.name}.
                </p>

                <span className="inline-block mt-4 text-green-600 font-semibold">
                    Explore District →
                </span>
            </div>
        </Link>
    );
}

export default DistrictCard;