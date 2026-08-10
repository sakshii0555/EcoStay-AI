import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Explore() {
    const gallery = [
    {
        image: "/images/explore/nainital.jpg",
        title: "Naini Lake",
        subtitle: "Nainital",
    },
    {
        image: "/images/explore/rishikesh.jpg",
        title: "The Ganga",
        subtitle: "Rishikesh",
    },
    {
        image: "/images/explore/auli.jpg",
        title: "Himalayan Slopes",
        subtitle: "Auli",
    },
    {
        image: "/images/explore/mussoorie.jpg",
        title: "Queen of the Hills",
        subtitle: "Mussoorie",
    },
    {
        image: "/images/explore/almora.jpg",
        title: "Pahadi Towns",
        subtitle: "Almora",
    },
    {
        image: "/images/explore/chopta.jpg",
        title: "Meadows & Mountains",
        subtitle: "Chopta",
    },
    {
        image: "/images/explore/tehri lake.jpg",
        title: "Mountain Waters",
        subtitle: "Tehri Lake",
    },
    {
        image: "/images/explore/kausani.jpg",
        title: "Himalayan Views",
        subtitle: "Kausani",
    },
    {
        image: "/images/explore/valley of flowers.jpg",
        title: "Valley in Bloom",
        subtitle: "Valley of Flowers",
    },
    {
        image: "/images/explore/nanda devi.jpg",
        title: "The High Himalayas",
        subtitle: "Nanda Devi",
    },
];

    return (
        <div className="bg-[#faf8f2] text-gray-900 min-h-screen">

            <Navbar />

            {/* ================= HERO ================= */}

            <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden">

                <img
                    src={gallery[9].image}
                    alt="Nanda Devi mountains from Joshimath"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45"></div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70"></div>

                <div className="relative z-10 text-center text-white px-6 max-w-5xl">

                    <p className="text-green-200 font-medium tracking-[0.35em] uppercase text-sm mb-4">
                        Namaskar • Pahad mein aapka swagat hai
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Your Journey Through
                        <span className="block text-green-300 mt-2">
                            Uttarakhand Begins Here
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto mt-7 leading-8 text-gray-100">
                        Come a little closer to the mountains.
                        Discover quiet valleys, sacred places, Pahadi
                        villages, flowing rivers and the warmth of
                        Uttarakhand.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">

                        <a
                            href="#discover"
                            className="bg-green-700 hover:bg-green-800 text-white px-9 py-4 rounded-full font-semibold text-lg transition shadow-xl"
                        >
                            Discover Uttarakhand ↓
                        </a>

                        <Link
                            to="/register"
                            className="bg-[#f5ead7]/95 hover:bg-white text-[#3f4d35] px-9 py-4 rounded-full font-semibold text-lg transition shadow-xl"
                        >
                            Begin Your Journey
                        </Link>

                    </div>

                </div>
            </section>


            {/* ================= INTRO ================= */}

            <section
    id="discover"
    className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
>
   {/* Mountain background */}
<div
    className="absolute inset-0 bg-cover bg-center"
    style={{
        backgroundImage:
            "url('/images/explore/mt.png')",
    }}
></div>

{/* Soft atmospheric overlay */}
<div className="absolute inset-0 bg-white/35"></div>
    <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">

        <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
            देवभूमि उत्तराखंड
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-[#263528] mt-4 leading-tight">
            More Than Just a Destination
        </h2>

        <div className="w-20 h-1 bg-[#b56b45] mx-auto mt-7 rounded-full"></div>

        <p className="text-gray-700 text-lg md:text-xl leading-8 mt-8 max-w-4xl mx-auto">
            Uttarakhand is a land of towering mountains, ancient temples,
            peaceful rivers, green valleys and villages where traditions
            still live close to everyday life.
        </p>

        <p className="text-gray-700 text-lg md:text-xl leading-8 mt-5 max-w-4xl mx-auto">
            With EcoStay AI, we want you to experience the Pahad beyond
            the usual tourist checklist — discover its landscapes,
            culture, people and local stays.
        </p>

    </div>
</section>

            
            {/* ================= GALLERY ================= */}

            <section className="bg-[#eef1e8] px-6 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-12">

                        <p className="text-[#b56b45] font-semibold uppercase tracking-[0.2em]">
                            एक झलक उत्तराखंड की
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#263528] mt-3">
                            See the Mountains. Feel the Pahad.
                        </h2>

                        <p className="text-gray-600 text-lg mt-4">
                            Just a glimpse of the places waiting to be explored.
                        </p>

                    </div>


                    {/* Gallery */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

                        {gallery.map((item, index) => (

                            <div
                                key={index}
                                className={`
                                    group relative overflow-hidden rounded-3xl
                                    shadow-lg
                                    ${
                                        index === 0 || index === 5
                                            ? "md:col-span-2 md:row-span-2"
                                            : ""
                                    }
                                `}
                            >

                                <img
                                    src={item.image}
                                    alt={`${item.title}, ${item.subtitle}`}
                                    className="w-full h-full min-h-[260px] object-cover group-hover:scale-110 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6">

                                    <p className="text-green-200 text-sm font-medium">
                                        {item.subtitle}
                                    </p>

                                    <h3 className="text-white text-xl md:text-2xl font-bold mt-1">
                                        {item.title}
                                    </h3>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ================= PAHADI EXPERIENCE ================= */}

<section className="relative py-24 px-6 overflow-hidden">

   {/* Pahadi meadow background */}
<div
    className="absolute inset-0 bg-cover bg-center"
    style={{
        backgroundImage:
            "url('/images/explore/pahadi_meadow_background.png')",
    }}
></div>

{/* Soft cream atmospheric overlay */}
<div className="absolute inset-0 bg-[#f8f5ec]/25"></div>

    <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-14">

            <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
                The EcoStay Experience
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#263528] mt-4">
                Experience the Pahad
            </h2>

            <div className="w-20 h-1 bg-[#b56b45] mx-auto mt-6 rounded-full"></div>

        </div>

        <div className="grid md:grid-cols-3 gap-7">

            {/* Discover */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-sm rounded-3xl p-9 text-center shadow-xl border border-white/60 hover:-translate-y-2 transition duration-300">

                <div className="text-5xl mb-6">
                    🏔️
                </div>

                <h3 className="text-2xl font-bold text-[#263528]">
                    Discover
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                    Explore the hidden corners, landscapes and stories
                    that make every part of Uttarakhand special.
                </p>

            </div>

            {/* Experience */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-sm rounded-3xl p-9 text-center shadow-xl border border-white/60 hover:-translate-y-2 transition duration-300">

                <div className="text-5xl mb-6">
                    🪕
                </div>

                <h3 className="text-2xl font-bold text-[#263528]">
                    Experience
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                    Learn about Pahadi culture, traditions, food,
                    festivals and the local way of life.
                </p>

            </div>

            {/* Stay Local */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-sm rounded-3xl p-9 text-center shadow-xl border border-white/60 hover:-translate-y-2 transition duration-300">

                <div className="text-5xl mb-6">
                    🏡
                </div>

                <h3 className="text-2xl font-bold text-[#263528]">
                    Stay Local
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                    Stay with local hosts and experience the warmth
                    of Uttarakhand beyond conventional hotels.
                </p>

            </div>

        </div>

    </div>
</section>

         {/* ================= CTA ================= */}

<section className="relative min-h-[560px] flex items-center justify-center overflow-hidden">
{/* Pahadi lake background */}
<div
    className="absolute inset-0 bg-cover bg-center"
    style={{
        backgroundImage:
            "url('/images/explore/pahadi_lake_background.png')",
    }}
></div>

{/* Soft dark overlay */}
<div className="absolute inset-0 bg-black/40"></div>

    {/* CTA Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        <p className="text-green-200 tracking-[0.25em] uppercase text-sm font-semibold">
            Your Pahadi Journey Awaits
        </p>

        <h2 className="text-4xl md:text-6xl font-bold mt-5 leading-tight">
            Want to Explore Uttarakhand
            <span className="block">
                Beyond the Glimpse?
            </span>
        </h2>

        <div className="w-20 h-1 bg-green-300 mx-auto mt-7 rounded-full"></div>

        <p className="text-gray-100 text-lg md:text-xl leading-8 mt-7 max-w-3xl mx-auto">
            Create your free EcoStay account to unlock detailed
            district guides, local attractions, authentic homestays,
            saved places and personalized travel planning.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
                to="/register"
                className="bg-[#f5ead7] hover:bg-white text-[#304735] px-9 py-4 rounded-full font-bold text-lg transition duration-300 shadow-xl"
            >
                Create Free Account →
            </Link>

            <Link
                to="/login"
                className="border-2 border-white/70 hover:bg-white/15 px-9 py-4 rounded-full font-semibold text-lg transition duration-300"
            >
                Already a member? Login
            </Link>

        </div>

    </div>

</section>

<Footer />

</div>
    );
}

export default Explore;