import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import almora from "../data/places/almora";

function DistrictPage() {
    const { stateId, districtId } = useParams();

    // Currently loading Almora data.
    // Later we will make this dynamic for every district.
    const district =
        stateId === "uttarakhand" && districtId === "almora"
            ? almora
            : null;

    // District not found
    if (!district) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">
                            District Not Found
                        </h1>

                        <p className="text-gray-500 mt-3">
                            We couldn't find this district.
                        </p>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <div className="bg-white min-h-screen text-gray-900">
            <Navbar />

            {/* ================= DISTRICT HERO ================= */}

            <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
                <img
                    src={`/images/districts/uttarakhand/${districtId}.jpg`}
                    alt={district.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                    <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-4">
                        {district.state}
                    </p>

                    <h1 className="text-5xl md:text-6xl font-bold">
                        {district.name}
                    </h1>

                    <p className="max-w-2xl text-xl mt-5 text-gray-100">
                        Discover the beauty, culture and experiences of{" "}
                        {district.name}.
                    </p>
                </div>
            </section>

            {/* ================= ABOUT DISTRICT ================= */}

            <section className="max-w-5xl mx-auto px-6 py-16">
                <p className="text-green-600 font-semibold uppercase tracking-wider text-center">
                    About the District
                </p>

                <h2 className="text-4xl font-bold text-center mt-2 mb-8">
                    Discover {district.name}
                </h2>

                <div className="text-gray-600 text-lg leading-8 whitespace-pre-line">
                    {district.description}
                </div>
            </section>

            {/* ================= FAMOUS PLACES ================= */}

            <section className="bg-gray-50 px-6 py-16">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-12">
                        <p className="text-green-600 font-semibold uppercase tracking-wider">
                            Explore
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            Famous Places in {district.name}
                        </h2>

                        <p className="text-gray-600 text-lg mt-3">
                            Discover the most beautiful and culturally
                            significant places to visit.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {district.places.map((place) => (
                            <div
                                key={place.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                            >

                                {/* Place Image */}

                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                    />
                                </div>

                                {/* Place Details */}

                                <div className="p-6">

                                    <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                                        {place.category}
                                    </span>

                                    <h3 className="text-2xl font-bold mt-2 mb-4">
                                        {place.name}
                                    </h3>

                                    <p className="text-gray-600 leading-7">
                                        {place.description}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= HOMESTAYS ================= */}

            <section className="max-w-6xl mx-auto px-6 py-20">

                <div className="text-center">

                    <p className="text-green-600 font-semibold uppercase tracking-wider">
                        Stay
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        Homestays in {district.name}
                    </h2>

                    <p className="text-gray-600 text-lg mt-3">
                        Find comfortable and local places to stay in{" "}
                        {district.name}.
                    </p>

                </div>

                <div className="mt-12 text-center py-12 bg-gray-50 rounded-2xl">

                    <p className="text-gray-500 text-lg">
                        Homestays for {district.name} will appear here.
                    </p>

                </div>

            </section>

            <Footer />
        </div>
    );
}

export default DistrictPage;