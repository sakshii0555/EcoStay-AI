import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

    // =====================================================
    // STATE
    // =====================================================

    const [homestays, setHomestays] = useState([]);
    const [loadingHomestays, setLoadingHomestays] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false);

    const [showAddForm, setShowAddForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        image: "",
        price: "",
        rating: "",
        description: "",
    });

    const [submitting, setSubmitting] = useState(false);


    // =====================================================
    // ALL UTTARAKHAND DISTRICTS
    // =====================================================

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
        uttarkashi,
    };


    // =====================================================
    // CURRENT DISTRICT
    // =====================================================

    const district =
        stateId === "uttarakhand"
            ? districts[districtId]
            : null;


    // =====================================================
    // CHECK LOGGED-IN ADMIN
    // =====================================================

    useEffect(() => {
        const checkAdmin = () => {
            try {
                const possibleUserKeys = [
                    "user",
                    "currentUser",
                    "userInfo",
                ];

                let storedUser = null;

                for (const key of possibleUserKeys) {
                    const value = localStorage.getItem(key);

                    if (value) {
                        try {
                            storedUser = JSON.parse(value);
                            break;
                        } catch {
                            // Continue checking other keys
                        }
                    }
                }

                // If user object exists
                if (storedUser?.role === "admin") {
                    setIsAdmin(true);
                    return;
                }

                // Try to get role from JWT if user object wasn't stored
                const token =
                    localStorage.getItem("token") ||
                    localStorage.getItem("accessToken");

                if (token) {
                    try {
                        const payload = JSON.parse(
                            atob(token.split(".")[1])
                        );

                        if (payload?.role === "admin") {
                            setIsAdmin(true);
                            return;
                        }
                    } catch (error) {
                        console.log("Could not decode token.");
                    }
                }

                setIsAdmin(false);

            } catch (error) {
                console.error("Admin check failed:", error);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, []);


    // =====================================================
    // FETCH HOMESTAYS FOR CURRENT DISTRICT
    // =====================================================

    useEffect(() => {
        if (!district) return;

        const fetchHomestays = async () => {
            try {
                setLoadingHomestays(true);

                const response = await fetch(
                    `http://localhost:5000/api/homestays/district/${districtId}`
                );

                const result = await response.json();

                if (response.ok && result.success) {
                    setHomestays(result.data || []);
                } else {
                    console.error(
                        "Failed to fetch homestays:",
                        result.message
                    );

                    setHomestays([]);
                }

            } catch (error) {
                console.error(
                    "Error fetching homestays:",
                    error
                );

                setHomestays([]);

            } finally {
                setLoadingHomestays(false);
            }
        };

        fetchHomestays();

    }, [districtId, district]);


    // =====================================================
    // HANDLE FORM INPUT
    // =====================================================

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {
        setFormData({
            name: "",
            location: "",
            image: "",
            price: "",
            rating: "",
            description: "",
        });
    };


    // =====================================================
    // ADD HOMESTAY
    // =====================================================

    const handleAddHomestay = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert("Only admins can add homestays.");
            return;
        }

        if (
            !formData.name ||
            !formData.location ||
            !formData.image ||
            !formData.price ||
            !formData.rating
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            setSubmitting(true);

            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("accessToken");

            if (!token) {
                alert("Authentication token not found. Please login again.");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/homestays",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        location: formData.location,

                        // Automatically use the current district
                        district: districtId,

                        image: formData.image,

                        price: Number(formData.price),

                        rating: Number(formData.rating),

                        description: formData.description,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.message ||
                    "Failed to add homestay."
                );

                return;
            }

            // Add newly created homestay to the page immediately
            setHomestays((previous) => [
                result.data,
                ...previous,
            ]);

            resetForm();

            setShowAddForm(false);

            alert("Homestay added successfully!");

        } catch (error) {
            console.error(
                "Error adding homestay:",
                error
            );

            alert(
                "Something went wrong while adding the homestay."
            );

        } finally {
            setSubmitting(false);
        }
    };


    // =====================================================
    // DISTRICT NOT FOUND
    // =====================================================

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


    // =====================================================
    // MAIN PAGE
    // =====================================================

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

                <div className="absolute inset-0 bg-black/45"></div>

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

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/about-district-bg.jpeg')",
                    }}
                ></div>

                <div className="absolute inset-0 bg-white/20"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

                    <div className="text-center mb-10">

                        <p className="text-[#8f4f32] font-semibold uppercase tracking-[0.25em] text-sm drop-shadow-md">
                            About the District
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#263528] drop-shadow-sm">
                            Discover {district.name}
                        </h2>

                    </div>

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


                                <div className="px-8 md:px-9 py-8">

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

                {/* HOMESTAYS BACKGROUND */}

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/homestays-bcg.jpg')",
                    }}
                ></div>


                {/* Overlay */}

                <div className="absolute inset-0 bg-white/10"></div>


                {/* HOMESTAY CONTENT */}

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">


                    {/* =================================================
                        SECTION HEADING
                    ================================================== */}

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


                    {/* =================================================
                        ADMIN ADD BUTTON
                    ================================================== */}

                    {isAdmin && (

                        <div className="flex justify-end mb-8">

                            <button
                                onClick={() => setShowAddForm(true)}
                                className="
                                    bg-[#00a63c]
                                    hover:bg-[#008f35]
                                    text-white
                                    font-semibold
                                    px-6
                                    py-3
                                    rounded-xl
                                    shadow-lg
                                    transition
                                    duration-200
                                "
                            >
                                + Add Homestay
                            </button>

                        </div>

                    )}


                    {/* =================================================
                        ADD HOMESTAY FORM
                    ================================================== */}

                    {showAddForm && isAdmin && (

                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 mb-10 border border-white">

                            <div className="flex items-center justify-between mb-7">

                                <div>

                                    <p className="text-[#b56b45] uppercase tracking-wider text-sm font-semibold">
                                        Admin
                                    </p>

                                    <h3 className="text-2xl md:text-3xl font-bold text-[#263528] mt-1">
                                        Add Homestay
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Adding homestay to{" "}
                                        <span className="font-semibold">
                                            {district.name}
                                        </span>
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        resetForm();
                                    }}
                                    className="
                                        text-gray-500
                                        hover:text-red-500
                                        text-2xl
                                        font-bold
                                    "
                                >
                                    ×
                                </button>

                            </div>


                            <form
                                onSubmit={handleAddHomestay}
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            >

                                {/* Name */}

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Homestay Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Himalayan View Homestay"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-500
                                        "
                                        required
                                    />

                                </div>


                                {/* Location */}

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location *
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g. New Tehri"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-500
                                        "
                                        required
                                    />

                                </div>


                                {/* Image */}

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Image URL *
                                    </label>

                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="/images/homestays/example.jpg"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-500
                                        "
                                        required
                                    />

                                    <p className="text-xs text-gray-500 mt-2">
                                        Example: /images/homestays/tehri/himalayan-view.jpg
                                    </p>

                                </div>


                                {/* Price */}

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price per Night (₹) *
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="1800"
                                        min="0"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-500
                                        "
                                        required
                                    />

                                </div>


                                {/* Rating */}

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating *
                                    </label>

                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        placeholder="4.5"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-500
                                        "
                                        required
                                    />

                                </div>


                                {/* Description */}

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the homestay..."
                                        rows="4"
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            rounded-xl
                                            px-4
                                            py-3
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-green-500
                                        "
                                    />

                                </div>


                                {/* Buttons */}

                                <div className="md:col-span-2 flex justify-end gap-4 pt-3">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            resetForm();
                                        }}
                                        className="
                                            px-6
                                            py-3
                                            rounded-xl
                                            border
                                            border-gray-300
                                            text-gray-700
                                            font-semibold
                                            hover:bg-gray-100
                                        "
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="
                                            px-7
                                            py-3
                                            rounded-xl
                                            bg-[#00a63c]
                                            hover:bg-[#008f35]
                                            text-white
                                            font-semibold
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {submitting
                                            ? "Adding..."
                                            : "Add Homestay"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    )}


                    {/* =================================================
                        LOADING
                    ================================================== */}

                    {loadingHomestays ? (

                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-lg">

                            <div className="text-4xl mb-4">
                                ⏳
                            </div>

                            <p className="text-gray-600 text-lg">
                                Loading homestays...
                            </p>

                        </div>

                    ) : homestays.length > 0 ? (


                        /* =================================================
                            HOMESTAY CARDS
                        ================================================== */

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {homestays.map((homestay) => (

                                <article
                                    key={homestay._id || homestay.id}
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

                                    {/* Image */}

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


                                    {/* Details */}

                                    <div className="p-6">

                                        <h3 className="text-xl font-bold text-[#263528]">
                                            {homestay.name}
                                        </h3>


                                        <p className="text-gray-500 mt-2">
                                            📍 {homestay.location}
                                        </p>


                                        {homestay.price !== undefined && (
                                            <p className="text-[#b56b45] font-semibold mt-3">
                                                ₹{homestay.price} / night
                                            </p>
                                        )}


                                        {homestay.rating !== undefined && (
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


                        /* =================================================
                            NO HOMESTAYS
                        ================================================== */

                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-lg">

                            <div className="text-5xl mb-5">
                                🏡
                            </div>

                            <h3 className="text-2xl font-bold text-[#263528]">
                                Homestays Coming Soon
                            </h3>

                            <p className="text-gray-600 mt-3">
                                We're adding local homestays in{" "}
                                {district.name}.
                            </p>

                            {isAdmin && (
                                <p className="text-green-600 font-semibold mt-4">
                                    You're logged in as an admin. Use the
                                    "+ Add Homestay" button above to add one.
                                </p>
                            )}

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