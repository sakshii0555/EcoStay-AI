import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import almora from "../data/districts/almora";
import bageshwar from "../data/districts/bageshwar";
import chamoli from "../data/districts/chamoli";
import champawat from "../data/districts/champawat";
import dehradun from "../data/districts/dehradun"
import haridwar from "../data/districts/haridwar";

function DistrictPage() {
    const { stateId, districtId } = useParams();

    // ================= ALL UTTARAKHAND DISTRICTS =================

    const districts = {
        almora,
        bageshwar,
        chamoli,
        champawat,
        dehradun,
        haridwar
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

            <section className="max-w-5xl mx-auto px-6 py-20">

                <div className="text-center mb-10">

                    <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
                        About the District
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528]">
                        Discover {district.name}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-[#e5ded2] p-8 md:p-12">

                    <p className="text-[#4b5563] text-lg leading-8 whitespace-pre-line">
                        {district.description}
                    </p>

                </div>

            </section>


            {/* =====================================================
                TOURIST ATTRACTIONS
            ====================================================== */}

            <section className="bg-[#eee8dc] px-6 py-20">

                <div className="max-w-6xl mx-auto">

                    {/* Section heading */}

                    <div className="text-center mb-14">

                        <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
                            Explore the Pahad
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528]">
                            Places to Visit in {district.name}
                        </h2>

                        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                            Discover the landscapes, culture and hidden
                            experiences that make {district.name} special.
                        </p>

                    </div>


                    {/* Attraction cards */}

                    <div className="grid md:grid-cols-2 gap-8">

                        {district.attractions?.map((place, index) => (

                            <article
                                key={place.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                            >

                                {/* Image */}

                                <div className="h-64 overflow-hidden">

                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                    />

                                </div>


                                {/* Content */}

                                <div className="p-7">

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-sm font-semibold text-[#b56b45] uppercase tracking-wider">
                                            {place.category}
                                        </span>

                                        <span className="text-sm text-gray-400">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                    </div>

                                    <h3 className="text-2xl font-bold mt-3 mb-4 text-[#263528]">
                                        {place.name}
                                    </h3>

                                    <p className="text-gray-600 leading-8">
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

            <section className="max-w-6xl mx-auto px-6 py-20">

                <div className="text-center mb-14">

                    <p className="text-[#b56b45] font-semibold uppercase tracking-[0.25em] text-sm">
                        Stay Like a Local
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528]">
                        Homestays in {district.name}
                    </h2>

                    <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                        Experience the warmth of Pahadi hospitality and
                        discover Uttarakhand through local homes and hosts.
                    </p>

                </div>


                {/* Homestay cards */}

                {district.homestays?.length > 0 ? (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {district.homestays.map((homestay) => (

                            <article
                                key={homestay.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-[#e5ded2]"
                            >

                                {/* Homestay image */}

                                <div className="h-56 overflow-hidden">

                                    <img
                                        src={homestay.image}
                                        alt={homestay.name}
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

                    <div className="bg-[#eee8dc] rounded-3xl p-12 text-center">

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

            </section>


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <Footer />

        </div>
    );
}

export default DistrictPage;