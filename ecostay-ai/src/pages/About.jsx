import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
    return (
        <>
            <Navbar />

            <div className="bg-gray-950 text-white min-h-screen">

                {/* ================= HERO ================= */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">

                    {/* Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85"
                        alt="Mountain landscape"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* Glow */}
                    <div className="absolute w-96 h-96 bg-green-500/20 blur-3xl rounded-full top-10 left-10"></div>
                    <div className="absolute w-96 h-96 bg-emerald-400/10 blur-3xl rounded-full bottom-0 right-10"></div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                        <p className="text-green-400 uppercase tracking-[0.3em] text-sm font-semibold mb-5">
                            Welcome to EcoStay AI
                        </p>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Travel Better.
                            <br />
                            <span className="text-green-400">
                                Stay Local. Explore Deeper.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            EcoStay AI brings homestays, destination discovery,
                            and intelligent travel planning together to help you
                            experience India in a more personal and meaningful way.
                        </p>

                    </div>
                </section>


                {/* ================= ABOUT ================= */}
                <section className="max-w-6xl mx-auto px-6 py-24">

                    <div className="grid md:grid-cols-2 gap-14 items-center">

                        {/* Image */}
                        <div className="relative">

                            <div className="absolute -inset-3 bg-green-500/20 blur-2xl rounded-3xl"></div>

                            <img
                                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85"
                                alt="Indian heritage"
                                className="relative rounded-3xl shadow-2xl w-full h-[450px] object-cover"
                            />

                        </div>


                        {/* Text */}
                        <div>

                            <p className="text-green-400 uppercase tracking-widest text-sm font-semibold mb-4">
                                What is EcoStay AI?
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Your journey,
                                <span className="text-green-400">
                                    {" "}your way.
                                </span>
                            </h2>

                            <div className="space-y-5 text-gray-300 text-lg leading-8">

                                <p>
                                    EcoStay AI is an AI-powered travel and
                                    homestay platform designed to make exploring
                                    India more personal, convenient, and meaningful.
                                </p>

                                <p>
                                    Instead of spending hours searching across
                                    different websites, travellers can discover
                                    destinations, find comfortable homestays,
                                    explore places worth visiting, and create
                                    personalised travel plans in one place.
                                </p>

                                <p>
                                    Whether you want to explore Himalayan villages,
                                    historic cities, peaceful beaches, or cultural
                                    destinations, EcoStay AI helps you discover
                                    more than just the usual tourist checklist.
                                </p>

                            </div>

                        </div>

                    </div>
                </section>


                {/* ================= FEATURES ================= */}
                <section className="relative py-24 bg-gray-900 overflow-hidden">

                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 blur-3xl rounded-full"></div>

                    <div className="relative max-w-6xl mx-auto px-6">

                        <div className="text-center mb-16">

                            <p className="text-green-400 uppercase tracking-widest text-sm font-semibold mb-3">
                                Why EcoStay AI?
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold">
                                Everything you need for your next journey.
                            </h2>

                            <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto">
                                From finding a place to stay to planning what
                                to do next, EcoStay AI brings the entire travel
                                experience together.
                            </p>

                        </div>


                        {/* Cards */}
                        <div className="grid md:grid-cols-3 gap-8">

                            {/* Card 1 */}
                            <div className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-green-400/60 via-transparent to-green-400/10">

                                <div className="h-full bg-gray-950 rounded-3xl p-8 transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.20)]">

                                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-green-500/10 text-4xl mb-7">
                                        🏡
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">
                                        Stay Local
                                    </h3>

                                    <p className="text-gray-400 leading-7">
                                        Discover comfortable homestays that
                                        bring you closer to local communities,
                                        culture, and everyday life.
                                    </p>

                                </div>

                            </div>


                            {/* Card 2 */}
                            <div className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-green-400/60 via-transparent to-green-400/10">

                                <div className="h-full bg-gray-950 rounded-3xl p-8 transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.20)]">

                                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-green-500/10 text-4xl mb-7">
                                        🤖
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">
                                        Plan with AI
                                    </h3>

                                    <p className="text-gray-400 leading-7">
                                        Tell our AI where you are going, your
                                        budget, trip duration, and travel style
                                        and get a personalised itinerary.
                                    </p>

                                </div>

                            </div>


                            {/* Card 3 */}
                            <div className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-green-400/60 via-transparent to-green-400/10">

                                <div className="h-full bg-gray-950 rounded-3xl p-8 transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.20)]">

                                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-green-500/10 text-4xl mb-7">
                                        🌍
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">
                                        Explore Deeper
                                    </h3>

                                    <p className="text-gray-400 leading-7">
                                        Go beyond famous attractions and
                                        discover food, heritage, nature,
                                        culture, and hidden experiences.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                </section>


                {/* ================= EXPERIENCE ================= */}
                <section className="max-w-6xl mx-auto px-6 py-24">

                    <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center">

                        <img
                            src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1600&q=85"
                            alt="Mountain travel"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/65"></div>

                        <div className="relative z-10 p-10 md:p-16 max-w-3xl">

                            <p className="text-green-400 uppercase tracking-widest text-sm font-semibold mb-4">
                                More than a destination
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                The best journeys are the ones you remember.
                            </h2>

                            <p className="text-gray-200 text-lg leading-8">
                                Discover the character of every destination —
                                the people, food, landscapes, traditions and
                                stories that make a place worth visiting.
                                EcoStay AI helps you find them.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= CTA ================= */}
                <section className="text-center px-6 pb-24">

                    <div className="max-w-4xl mx-auto">

                        <div className="relative p-10 md:p-14 rounded-3xl border border-green-500/20 bg-green-500/5 shadow-[0_0_60px_rgba(34,197,94,0.08)]">

                            <h2 className="text-4xl md:text-5xl font-bold mb-5">
                                Your next adventure is waiting.
                            </h2>

                            <p className="text-gray-400 text-lg mb-8">
                                Find your stay, plan your journey, and make it yours.
                            </p>

                            <a
                                href="/"
                                className="inline-block bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg shadow-green-500/20"
                            >
                                Start Exploring
                            </a>

                        </div>

                    </div>

                </section>

            </div>

            <Footer />
        </>
    );
}

export default About;