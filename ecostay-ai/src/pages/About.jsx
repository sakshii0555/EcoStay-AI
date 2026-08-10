import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
    return (
        <>
            <Navbar />

            <div className="bg-[#f7f4ec] text-[#263528] min-h-screen">

                {/* ================= HERO ================= */}

                <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">

                    {/* Pahadi Hero Background */}
                    <img
                        src="/images/about.png"
                        alt="Pahadi village in Uttarakhand"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">

                        <p className="text-[#f0a35b] uppercase tracking-[0.3em] text-sm font-semibold mb-5">
                            About EcoStay AI
                        </p>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            More Than Just
                            <br />
                            <span className="text-[#f0a35b]">
                                a Destination
                            </span>
                        </h1>

                        <div className="w-20 h-1 bg-[#f0a35b] mx-auto mb-7 rounded-full"></div>

                        <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-8">
                            Discover Uttarakhand beyond the usual tourist trail —
                            through its mountains, villages, culture, people,
                            food and the warmth of a Pahadi home.
                        </p>

                    </div>

                </section>


                {/* ================= OUR STORY ================= */}

                <section className="max-w-6xl mx-auto px-6 py-24">

                    <div className="grid md:grid-cols-2 gap-14 items-center">

                        {/* Image */}
                        <div className="relative">

                            <div className="absolute -inset-4 bg-[#b56b45]/20 blur-2xl rounded-3xl"></div>

                            <img
                                src="/images/explore/har-ki-doon.jpg"
                                alt="Har Ki Dun valley in Uttarakhand"
                                className="relative rounded-3xl shadow-xl w-full h-[450px] object-cover"
                            />

                        </div>


                        {/* Text */}
                        <div>

                            <p className="text-[#b56b45] uppercase tracking-[0.25em] text-sm font-semibold mb-4">
                                Our Story
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold text-[#263528] leading-tight mb-6">
                                Built for the
                                <span className="text-[#b56b45]">
                                    {" "}Pahad.
                                </span>
                            </h2>

                            <div className="space-y-5 text-gray-700 text-lg leading-8">

                                <p>
                                    EcoStay AI was created with a simple idea —
                                    travelling through Uttarakhand should be
                                    about more than checking famous places off
                                    a list.
                                </p>

                                <p>
                                    The real beauty of the Pahad lies in its
                                    quiet villages, winding mountain roads,
                                    local food, traditional homes, peaceful
                                    landscapes and the people who call these
                                    mountains home.
                                </p>

                                <p>
                                    EcoStay AI brings these experiences
                                    together so travellers can discover
                                    Uttarakhand in a more personal,
                                    meaningful and responsible way.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= WHAT WE BELIEVE ================= */}

                <section className="relative py-24 overflow-hidden">

                    {/* Pahadi Pattern Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                           backgroundImage:
    "url('/images/mtt.jpg')",
                        }}
                    ></div>

                    {/* Soft overlay */}
                    <div className="absolute inset-0 bg-black/25"></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-6xl mx-auto px-6">

                        <div className="text-center mb-14">

                            <p className="text-[#b56b45] uppercase tracking-[0.25em] text-sm font-semibold mb-3">
                                The EcoStay Philosophy
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold text-[#263528]">
                                Experience the Pahad
                            </h2>

                            <p className="text-gray-700 text-lg mt-5 max-w-2xl mx-auto leading-8">
                                Because the best way to know Uttarakhand is
                                to experience it like a local.
                            </p>

                        </div>


                        {/* Cards */}

                        <div className="grid md:grid-cols-3 gap-7">

                            {/* Discover */}
                            <div className="bg-[#fffdf8]/95 backdrop-blur-sm rounded-3xl p-9 text-center shadow-lg border border-white/70 hover:-translate-y-2 transition duration-300">

                                <div className="text-5xl mb-6">
                                    🏔️
                                </div>

                                <h3 className="text-2xl font-bold text-[#263528] mb-4">
                                    Discover
                                </h3>

                                <p className="text-gray-600 leading-7">
                                    Explore hidden valleys, mountain villages,
                                    peaceful lakes and places beyond the
                                    usual tourist trail.
                                </p>

                            </div>


                            {/* Experience */}
                            <div className="bg-[#fffdf8]/95 backdrop-blur-sm rounded-3xl p-9 text-center shadow-lg border border-white/70 hover:-translate-y-2 transition duration-300">

                                <div className="text-5xl mb-6">
                                    🪕
                                </div>

                                <h3 className="text-2xl font-bold text-[#263528] mb-4">
                                    Experience
                                </h3>

                                <p className="text-gray-600 leading-7">
                                    Experience Pahadi food, traditions,
                                    festivals, stories and the everyday
                                    rhythm of mountain life.
                                </p>

                            </div>


                            {/* Stay Local */}
                            <div className="bg-[#fffdf8]/95 backdrop-blur-sm rounded-3xl p-9 text-center shadow-lg border border-white/70 hover:-translate-y-2 transition duration-300">

                                <div className="text-5xl mb-6">
                                    🏡
                                </div>

                                <h3 className="text-2xl font-bold text-[#263528] mb-4">
                                    Stay Local
                                </h3>

                                <p className="text-gray-600 leading-7">
                                    Stay with local hosts and experience the
                                    warmth, stories and hospitality of a
                                    Pahadi home.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= 13 DISTRICTS ================= */}

                <section className="bg-[#263528] text-white py-24 px-6">

                    <div className="max-w-6xl mx-auto">

                        <div className="grid md:grid-cols-2 gap-14 items-center">

                            <div>

                                <p className="text-[#f0a35b] uppercase tracking-[0.25em] text-sm font-semibold mb-4">
                                    One State. Many Stories.
                                </p>

                                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                    Explore All Sides of
                                    <span className="text-[#f0a35b]">
                                        {" "}Uttarakhand
                                    </span>
                                </h2>

                                <p className="text-gray-200 text-lg leading-8 mb-5">
                                    From the Garhwal Himalayas to Kumaon,
                                    every corner of Uttarakhand has its own
                                    landscapes, traditions, food and stories.
                                </p>

                                <p className="text-gray-300 text-lg leading-8">
                                    EcoStay AI is built around discovering
                                    all 13 districts — not just the places
                                    that appear on every tourist itinerary.
                                </p>

                            </div>


                            {/* District highlights */}

                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center">

                                    <div className="text-4xl mb-2">
                                        🏔️
                                    </div>

                                    <p className="font-semibold text-lg">
                                        Garhwal
                                    </p>

                                    <p className="text-gray-400 text-sm mt-1">
                                        Mountains & Temples
                                    </p>

                                </div>


                                <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center">

                                    <div className="text-4xl mb-2">
                                        🌲
                                    </div>

                                    <p className="font-semibold text-lg">
                                        Kumaon
                                    </p>

                                    <p className="text-gray-400 text-sm mt-1">
                                        Lakes & Valleys
                                    </p>

                                </div>


                                <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center">

                                    <div className="text-4xl mb-2">
                                        🏡
                                    </div>

                                    <p className="font-semibold text-lg">
                                        Villages
                                    </p>

                                    <p className="text-gray-400 text-sm mt-1">
                                        Local Life
                                    </p>

                                </div>


                                <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center">

                                    <div className="text-4xl mb-2">
                                        🪕
                                    </div>

                                    <p className="font-semibold text-lg">
                                        Culture
                                    </p>

                                    <p className="text-gray-400 text-sm mt-1">
                                        Stories & Traditions
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= EXPERIENCE ================= */}

                <section className="max-w-6xl mx-auto px-6 py-24">

                    <div className="relative rounded-3xl overflow-hidden min-h-[460px] flex items-center">

                        <img
    src="/images/pahadi_pattern_stream_temple.png"
    alt="Pahadi stream and temple in Uttarakhand"
    className="absolute inset-0 w-full h-full object-cover"
/>

                        <div className="absolute inset-0 bg-black/60"></div>

                        <div className="relative z-10 p-10 md:p-16 max-w-3xl text-white">

                            <p className="text-[#f0a35b] uppercase tracking-[0.25em] text-sm font-semibold mb-4">
                                More Than a Destination
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Come for the mountains.
                                <br />
                                Stay for the
                                <span className="text-[#f0a35b]">
                                    {" "}feeling.
                                </span>
                            </h2>

                            <p className="text-gray-100 text-lg leading-8">
                                Discover the character of Uttarakhand —
                                the people, food, landscapes, traditions and
                                stories that make the Pahad feel like more
                                than just a place on a map.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= CTA ================= */}

<section className="px-6 pb-24">

    <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden">

        {/* Pahadi Pattern Background */}
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('/images/pahadi_background_4th.png')",
            }}
        ></div>

        {/* Dark Green Overlay */}
        <div className="absolute inset-0 bg-[#263528]/55"></div>

        {/* CTA Content */}
        <div className="relative z-10 text-center text-white px-6 py-16 md:py-20">

            <p className="text-[#f0a35b] uppercase tracking-[0.25em] text-sm font-semibold mb-4">
                Your Pahadi Journey Awaits
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
                Find Your Way to the
                <span className="text-[#f0a35b]">
                    {" "}पहाड़
                </span>
            </h2>

            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-8 mb-8">
                Find your stay, discover hidden places,
                plan your journey and experience Uttarakhand
                your way.
            </p>

            <a
                href="/explore"
                className="inline-block bg-[#f0a35b] hover:bg-[#d98b45] text-[#263528] px-9 py-4 rounded-full font-bold text-lg transition duration-300 shadow-lg"
            >
                Start Exploring →
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