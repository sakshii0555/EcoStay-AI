import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
    return (
        <div>

            <Navbar />

            {/* ================= HERO ================= */}

            <Hero />


            {/* ================= UTTARAKHAND INTRO ================= */}

            <section className="relative py-20 px-6 overflow-hidden">

                {/* Mountain background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/explore/mt.png')",
                    }}
                ></div>

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-white/65"></div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center">

                    <p className="text-green-600 font-semibold uppercase tracking-[0.2em]">
                        Explore EcoStay AI
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3">
                        Discover Uttarakhand Differently
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-8 mt-6">
                        From quiet Himalayan villages and ancient temples to
                        breathtaking valleys and welcoming local homestays,
                        EcoStay AI helps you experience Uttarakhand beyond
                        the usual tourist trail.
                    </p>

                    {/* Explore Button */}
                    <div className="mt-9">

                        <Link
                            to="/explore"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white px-9 py-4 rounded-full font-semibold text-lg transition duration-300 shadow-lg hover:shadow-green-500/30"
                        >
                            Explore Homestays →
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= PUBLIC EXPLORE CTA ================= */}

            <section className="relative text-white py-20 px-6 overflow-hidden">

                {/* Uttarakhand background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/uttara.jpg')",
                    }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55"></div>

                {/* CTA Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center">

                    <div className="text-5xl mb-5">
                        🌿
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold">
                        Ready to Discover Uttarakhand?
                    </h2>

                    <p className="text-white text-lg md:text-xl mt-5 leading-8">
                        Take a glimpse of the mountains, valleys, culture and
                        experiences waiting for you.
                    </p>

                    <Link
                        to="/explore"
                        className="inline-block mt-8 bg-white text-green-800 hover:bg-gray-100 px-9 py-4 rounded-full font-bold text-lg transition duration-300 shadow-lg"
                    >
                        Begin Your Journey →
                    </Link>

                </div>

            </section>


            <Footer />

        </div>
    );
}

export default Home;