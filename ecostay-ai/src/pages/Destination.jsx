import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import destinations from "../data/destination.js";

function Destination() {
    const { city } = useParams();

    const [homestays, setHomestays] = useState([]);
    const [loading, setLoading] = useState(true);

    const destination = destinations[city?.toLowerCase()];

    useEffect(() => {
        if (!destination) {
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(
            `http://localhost:5000/api/homestays/search?location=${destination.name}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setHomestays(data.data.slice(0, 3));
                } else {
                    setHomestays([]);
                }
            })
            .catch((err) => {
                console.error(err);
                setHomestays([]);
            })
            .finally(() => setLoading(false));
    }, [city, destination]);

    if (!destination) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold">
                        Destination not found
                    </h1>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <Navbar />

            {/* ================= DESTINATION HERO ================= */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                {/* Destination Image */}
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/35"></div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        {destination.name}
                    </h1>

                    <p className="text-xl md:text-2xl font-light">
                        Find your way around {destination.name}
                    </p>
                </div>
            </section>

            {/* ================= ABOUT DESTINATION ================= */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    A little about {destination.name}
                </h2>

                <div className="text-gray-600 text-lg leading-8 space-y-4">
                    {destination.description
                        .trim()
                        .split("\n\n")
                        .map((paragraph, index) => (
                            <p key={index}>
                                {paragraph.trim()}
                            </p>
                        ))}
                </div>
            </section>

            {/* ================= PLACES TO EXPLORE ================= */}
            <section className="bg-gray-50 px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Explore {destination.name}
                        </h2>

                        <p className="text-gray-600 mt-3 text-lg">
                            Places worth adding to your itinerary.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {destination.places.map((place) => (
                            <div
                                key={place.name}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                            >
                                {/* Place Image */}
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className="w-full h-64 object-cover"
                                />

                                {/* Place Content */}
                                <div className="p-7">
                                    <h3 className="text-2xl font-bold mb-4">
                                        {place.name}
                                    </h3>

                                    <div className="text-gray-600 leading-7 space-y-4">
                                        {place.description
                                            .trim()
                                            .split("\n\n")
                                            .map((paragraph, index) => (
                                                <p key={index}>
                                                    {paragraph.trim()}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= HOMESTAYS ================= */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Stay in {destination.name}
                    </h2>

                    <p className="text-gray-600 mt-4 text-xl">
                        Find a comfortable place to stay during your trip.
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 text-lg">
                        Finding stays...
                    </p>
                ) : homestays.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        Homestays in {destination.name} will be available soon.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {homestays.map((homestay) => (
                            <Card
                                key={homestay._id}
                                title={homestay.name}
                                description={homestay.location}
                                image={homestay.image}
                                price={homestay.price}
                                rating={homestay.rating}
                                details={homestay.description}
                            />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default Destination;