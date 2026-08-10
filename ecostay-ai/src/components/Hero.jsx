import { Link } from "react-router-dom";

function Hero() {
    return (
        <section
            className="h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/images/pahadi-hero.png')",
            }}
        >

            {/* Dark atmospheric overlay */}
            <div className="absolute inset-0 bg-black/35"></div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

                {/* Main Title */}
                <h1
    className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-2 drop-shadow-lg"
    style={{ fontFamily: "'Kaushan Script', cursive" }}
>
    Find Your Way to the
</h1>

                {/* Pahad */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#d58a45] leading-tight mb-8 drop-shadow-lg">
                    पहाड़
                </h1>

                {/* Decorative line */}
                <div className="w-24 h-1 bg-[#d58a45] rounded-full mb-8"></div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl leading-relaxed drop-shadow-md">
                    From quiet mountain villages and ancient temples to
                    breathtaking valleys and welcoming local homestays,
                    discover Uttarakhand your way.
                </p>

                {/* CTA */}
                <Link
                    to="/explore"
                    className="mt-9 bg-green-600 hover:bg-green-700 px-9 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-green-500/30"
                >
                    Explore Homestays →
                </Link>

            </div>

        </section>
    );
}

export default Hero;