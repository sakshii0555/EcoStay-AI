import { Link } from "react-router-dom";

function Hero() {
    return (
        <section
            className="h-screen bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('/images/pahadi-hero.png')",
            }}
        >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/35"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Where Your Next Journey Begins
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mb-10">
                    "Find your stay, plan your journey, and make it yours"
                </p>

                <Link
                    to="/explore"
                    className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-green-500/30"
                >
                    Explore Homestays
                </Link>

            </div>
        </section>
    );
}

export default Hero;