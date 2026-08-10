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


            {/* ================= WHY ECOSTAY ================= */}

            <section className="relative py-20 px-6 overflow-hidden">

                {/* Pahadi meadow background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/explore/pahadi_meadow_background.png')",
                    }}
                ></div>

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-white/55"></div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto">

                    {/* Heading */}

                    <div className="text-center mb-12">

                        <p className="text-green-600 font-semibold uppercase tracking-wider">
                            Why EcoStay AI?
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3">
                            Experience the Pahad, Not Just the Place
                        </h2>

                        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                            Discover local culture, beautiful places and
                            authentic homestays across Uttarakhand.
                        </p>

                    </div>


                    {/* Cards */}

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Card 1 */}

                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300">

                            <div className="text-5xl mb-5">
                                🏔️
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                Explore Uttarakhand
                            </h3>

                            <p className="text-gray-600 leading-7">
                                Discover all 13 districts of Uttarakhand,
                                their culture, landscapes and unique
                                attractions.
                            </p>

                        </div>


                        {/* Card 2 */}

                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300">

                            <div className="text-5xl mb-5">
                                🏡
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                Stay Like a Local
                            </h3>

                            <p className="text-gray-600 leading-7">
                                Find welcoming local homestays and experience
                                the warmth and hospitality of the Pahad.
                            </p>

                        </div>


                        {/* Card 3 */}

                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300">

                            <div className="text-5xl mb-5">
                                🗺️
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                Plan Your Journey
                            </h3>

                            <p className="text-gray-600 leading-7">
                                Use AI-powered travel planning to create
                                personalized Uttarakhand experiences.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= PUBLIC EXPLORE CTA ================= */}

            <section className="relative bg-green-800 text-white py-20 px-6 overflow-hidden">

                <div className="absolute -top-24 -left-24 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">

                    <div className="text-5xl mb-5">
                        🌿
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold">
                        Ready to Discover Uttarakhand?
                    </h2>

                    <p className="text-green-50 text-lg md:text-xl mt-5 leading-8">
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