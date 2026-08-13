import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import almora from "../data/districts/almora";
import bageshwar from "../data/districts/bageshwar";
import chamoli from "../data/districts/chamoli";
import champawat from "../data/districts/champawat";
import dehradun from "../data/districts/dehradun";
import haridwar from "../data/districts/haridwar";
import nainital from "../data/districts/nainital";
import pauri from "../data/districts/pauri";
import pithoragarh from "../data/districts/pithoragarh";
import rudraprayag from "../data/districts/rudraprayag";
import tehri from "../data/districts/tehri";
import uttarkashi from "../data/districts/uttarkashi";

function DistrictPage() {
    const { stateId, districtId } = useParams();

    // ================= ALL UTTARAKHAND DISTRICTS =================

    const districts = {
        almora,
        bageshwar,
        chamoli,
        champawat,
        dehradun,
        haridwar,
        nainital,
        "pauri-garhwal": pauri,
        pithoragarh,
        rudraprayag,
        "tehri-garhwal": tehri,
        uttarkashi
    };

    // Only Uttarakhand is supported
    const district =
        stateId === "uttarakhand"
            ? districts[districtId]
            : null;

    // ================= DISTRICT NOT FOUND =================

    if (!district) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex items-center justify-center bg-[#f7f3eb] px-6">

                    <div className="text-center">

                        <div className="text-6xl mb-5">
                            🏔️
                        </div>

                        <h1 className="text-4xl font-bold text-[#263528]">
                            District Not Found
                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">
                            We couldn't find this Uttarakhand district.
                        </p>

                    </div>

                </div>

                <Footer />
            </>
        );
    }

    return (
        <div className="bg-[#f7f3eb] min-h-screen text-[#263528]">

            <Navbar />

            {/* =====================================================
                DISTRICT HERO
            ====================================================== */}

            <section className="relative h-[55vh] min-h-[450px] overflow-hidden">

                <img
                    src={`/images/districts/uttarakhand/${districtId}.jpg`}
                    alt={district.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}

                <div className="absolute inset-0 bg-black/45"></div>

                {/* Hero content */}

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">

                    <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-4 text-[#f0a35b]">
                        {district.state}
                    </p>

                    <h1 className="text-5xl md:text-6xl font-bold">
                        {district.name}
                    </h1>

                    <div className="w-20 h-1 bg-[#f0a35b] rounded-full my-6"></div>

                    <p className="max-w-2xl text-xl mt-2 text-gray-100">
                        Discover the beauty, culture and experiences of{" "}
                        {district.name}.
                    </p>

                </div>

            </section>

            {/* =====================================================
                ABOUT THE DISTRICT
            ====================================================== */}

            <section className="relative overflow-hidden">

                {/* Common background image */}

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/about-district-bg.jpeg')",
                    }}
                ></div>

                {/* Soft overlay */}

                <div className="absolute inset-0 bg-white/20"></div>

                {/* Content */}

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

                    {/* Section heading */}

                    <div className="text-center mb-10">

                        <p className="text-[#8f4f32] font-semibold uppercase tracking-[0.25em] text-sm drop-shadow-md">
                            About the District
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528] drop-shadow-sm">
                            Discover {district.name}
                        </h2>

                    </div>

                    {/* Description card */}

                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">

                        <p className="text-[#334155] text-lg leading-8 whitespace-pre-line">
                            {district.description}
                        </p>

                    </div>

                </div>

            </section>

            {/* =====================================================
                TOURIST ATTRACTIONS
            ====================================================== */}

            <section className="bg-[#eee8dc] px-5 md:px-8 py-20">

                <div className="max-w-7xl mx-auto">

                    {/* ================= SECTION HEADING ================= */}

                    <div className="text-center mb-16">

                        <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
                            Explore the Pahad
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528]">
                            Places to Visit in {district.name}
                        </h2>

                        <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto leading-8">
                            Discover the landscapes, culture and hidden
                            experiences that make {district.name} special.
                        </p>

                    </div>

                    {/* ================= LARGE ATTRACTION GRID ================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {district.attractions?.map((place, index) => (

                            <article
                                key={place.id}
                                className="
                                    bg-white
                                    rounded-[28px]
                                    overflow-hidden
                                    shadow-md
                                    hover:shadow-2xl
                                    transition-all
                                    duration-500
                                "
                            >

                                {/* =================================================
                                    LARGE TOURIST PHOTO
                                ================================================== */}

                                <div
                                    className="
                                        w-full
                                        h-[380px]
                                        md:h-[440px]
                                        bg-white
                                        flex
                                        items-center
                                        justify-center
                                        overflow-hidden
                                    "
                                >

                                    <img
                                        src={encodeURI(place.image)}
                                        alt={place.name}
                                        onError={(e) => {
                                            console.error(
                                                "Image failed to load:",
                                                place.name,
                                                place.image
                                            );
                                        }}
                                        className="
                                            w-full
                                            h-full
                                            object-contain
                                            transition-transform
                                            duration-700
                                            hover:scale-[1.02]
                                        "
                                    />

                                </div>

                                {/* =================================================
                                    ATTRACTION INFORMATION
                                ================================================== */}

                                <div className="px-8 md:px-9 py-8">

                                    {/* Category + Number */}

                                    <div className="flex items-center justify-between">

                                        <span
                                            className="
                                                text-[#b56b45]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-sm
                                            "
                                        >
                                            {place.category}
                                        </span>

                                        <span className="text-gray-400 text-sm">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                    </div>

                                    {/* Attraction name */}

                                    <h3
                                        className="
                                            text-2xl
                                            md:text-3xl
                                            font-bold
                                            mt-3
                                            mb-5
                                            text-[#263528]
                                        "
                                    >
                                        {place.name}
                                    </h3>

                                    {/* Description */}

                                    <p
                                        className="
                                            text-gray-600
                                            leading-8
                                            text-[16px]
                                        "
                                    >
                                        {place.description}
                                    </p>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>

            </section>

            {/* =====================================================
                HOMESTAYS
            ====================================================== */}

            <section className="relative overflow-hidden">

                {/* =================================================
                    HOMESTAYS BACKGROUND IMAGE
                ================================================== */}

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/homestays-bcg.jpg')",
                    }}
                ></div>

                {/* Soft overlay so text/cards remain readable */}

                <div className="absolute inset-0 bg-white/10"></div>

                {/* =================================================
                    HOMESTAY CONTENT
                ================================================== */}

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

                    {/* Section Heading */}

                    <div className="text-center mb-14">

                        <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
                            Stay Like a Local
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528]">
                            Homestays in {district.name}
                        </h2>

                        <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto leading-8">
                            Experience the warmth of Pahadi hospitality and
                            discover Uttarakhand through local homes and hosts.
                        </p>

                    </div>

                    {/* ================= HOMESTAY CARDS ================= */}

                    {district.homestays?.length > 0 ? (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {district.homestays.map((homestay) => (

                                <article
                                    key={homestay.id}
                                    className="
                                        bg-white/95
                                        backdrop-blur-sm
                                        rounded-3xl
                                        overflow-hidden
                                        shadow-lg
                                        hover:shadow-2xl
                                        transition
                                        duration-300
                                        border
                                        border-white/70
                                    "
                                >

                                    {/* Homestay image */}

                                    <div className="h-56 overflow-hidden">

                                        <img
                                            src={encodeURI(homestay.image)}
                                            alt={homestay.name}
                                            onError={(e) => {
                                                console.error(
                                                    "Homestay image failed to load:",
                                                    homestay.name,
                                                    homestay.image
                                                );
                                            }}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    {/* Homestay details */}

                                    <div className="p-6">

                                        <h3 className="text-xl font-bold text-[#263528]">
                                            {homestay.name}
                                        </h3>

                                        <p className="text-gray-500 mt-2">
                                            📍 {homestay.location}
                                        </p>

                                        {homestay.price && (

                                            <p className="text-[#b56b45] font-semibold mt-3">
                                                ₹{homestay.price} / night
                                            </p>

                                        )}

                                        {homestay.rating && (

                                            <p className="text-gray-600 mt-2">
                                                ⭐ {homestay.rating}
                                            </p>

                                        )}

                                        {homestay.description && (

                                            <p className="text-gray-600 leading-7 mt-4">
                                                {homestay.description}
                                            </p>

                                        )}

                                    </div>

                                </article>

                            ))}

                        </div>

                    ) : (

                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-lg">

                            <div className="text-5xl mb-5">
                                🏡
                            </div>

                            <h3 className="text-2xl font-bold text-[#263528]">
                                Homestays Coming Soon
                            </h3>

                            <p className="text-gray-600 mt-3">
                                We're adding local homestays in {district.name}.
                            </p>

                        </div>

                    )}

                </div>

            </section>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <Footer />

        </div>
    );
}

export default DistrictPage;