import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
import states from "../data/states";
import uttarakhandDistricts from "../data/districts/uttarakhand";

function Statepage() {
    const { stateId } = useParams();

    const state = states.find(
        (item) => item.id === stateId
    );

    // If state doesn't exist
    if (!state) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">
                            State Not Found
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Sorry, we couldn't find this destination.
                        </p>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    // Temporary city data
    // We will move this into separate data files later.
   
    const stateCities =
    state.id === "uttarakhand"
        ? uttarakhandDistricts
        : [];

    return (
        <div className="bg-white min-h-screen text-gray-900">
            <Navbar />

            {/* ================= STATE HERO ================= */}

            <section className="relative h-[55vh] min-h-[400px] overflow-hidden">

                <img
                    src={state.image}
                    alt={state.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">

                    <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-4">
                        Explore India
                    </p>

                    <h1 className="text-5xl md:text-6xl font-bold">
                        {state.name}
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl mt-5 text-gray-100">
                        Discover beautiful destinations, local experiences
                        and eco-friendly stays across {state.name}.
                    </p>

                </div>
            </section>

            {/* ================= CITIES ================= */}

            <section className="max-w-6xl mx-auto px-6 py-16">

                <div className="text-center mb-12">

                    <p className="text-green-600 font-semibold uppercase tracking-wider">
                        Destinations
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        Explore {state.name}
                    </h2>

                    <p className="text-gray-600 text-lg mt-3">
                        Choose a city or destination to discover more.
                    </p>

                </div>

                {stateCities.length === 0 ? (
                    <div className="text-center py-16">

                        <p className="text-gray-500 text-lg">
                            Destinations for {state.name} will be added soon.
                        </p>

                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {stateCities.map((city) => (
                            <CityCard
                                key={city.id}
                                city={city}
                                stateId={state.id}
                            />
                        ))}

                    </div>
                )}

            </section>

            <Footer />
        </div>
    );
}

export default Statepage;