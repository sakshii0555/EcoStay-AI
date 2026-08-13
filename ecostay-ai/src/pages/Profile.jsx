import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);


    // =====================================================
    // LOAD USER + BOOKINGS
    // =====================================================

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                // Get user from local storage
                const storedUser = localStorage.getItem("user");

                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (error) {
                        console.error(
                            "Unable to read user:",
                            error
                        );
                    }
                }

                // Get user's bookings
                const response = await fetch(
                    "http://localhost:5000/api/bookings/my",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Unable to load bookings."
                    );
                }

                if (result.success) {
                    setBookings(result.data || []);
                }

            } catch (error) {
                console.error(
                    "Profile loading error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to load your profile."
                );

            } finally {
                setLoading(false);
            }
        };

        loadProfile();

    }, [navigate]);


    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    const handleCancelBooking = async (bookingId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            setCancellingId(bookingId);

            const response = await fetch(
                `http://localhost:5000/api/bookings/${bookingId}/cancel`,
                {
                    method: "PUT",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Unable to cancel booking."
                );
            }

            // Update booking in UI
            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking._id === bookingId
                        ? {
                            ...booking,
                            status: "cancelled",
                        }
                        : booking
                )
            );

            alert(
                "Booking cancelled successfully."
            );

        } catch (error) {
            console.error(
                "Cancel booking error:",
                error
            );

            alert(
                error.message ||
                "Unable to cancel booking."
            );

        } finally {
            setCancellingId(null);
        }
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };


    // =====================================================
    // DISPLAY NAME
    // =====================================================

    const displayName =
        user?.name ||
        user?.username ||
        user?.fullName ||
        user?.email?.split("@")[0] ||
        "Traveler";


    // =====================================================
    // BOOKING STATISTICS
    // =====================================================

    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(
        (booking) =>
            booking.status === "confirmed"
    );

    const cancelledBookings = bookings.filter(
        (booking) =>
            booking.status === "cancelled"
    );

    const completedBookings = bookings.filter(
        (booking) =>
            booking.status === "completed"
    );


    // Upcoming bookings

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const upcomingBookings = bookings.filter(
        (booking) => {

            if (
                booking.status !==
                "confirmed"
            ) {
                return false;
            }

            const checkOut =
                new Date(
                    booking.checkOut
                );

            return checkOut >= today;
        }
    );


    // =====================================================
    // TOTAL SPENT
    // =====================================================

    const totalSpent = bookings
        .filter(
            (booking) =>
                booking.status !==
                "cancelled"
        )
        .reduce(
            (
                total,
                booking
            ) =>
                total +
                Number(
                    booking.totalAmount || 0
                ),
            0
        );


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {
        return (
            <div className="
                min-h-screen
                bg-[#f7f3eb]
                dark:bg-gray-950
                text-[#263528]
                dark:text-white
                transition-colors
                duration-300
            ">

                <Navbar />

                <div className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                ">

                    <div className="
                        text-center
                    ">

                        <div className="
                            text-5xl
                            mb-4
                        ">
                            🌿
                        </div>

                        <p className="
                            text-gray-600
                            dark:text-gray-300
                            text-lg
                        ">
                            Loading your profile...
                        </p>

                    </div>

                </div>

                <Footer />

            </div>
        );
    }


    // =====================================================
    // MAIN PROFILE
    // =====================================================

    return (
        <div className="
            min-h-screen
            bg-[#f7f3eb]
            dark:bg-gray-950
            text-[#263528]
            dark:text-gray-100
            transition-colors
            duration-300
        ">

            <Navbar />


            <main className="
                pt-28
                pb-20
                px-5
            ">

                <div className="
                    max-w-6xl
                    mx-auto
                ">


                    {/* =================================================
                        PROFILE HEADER
                    ================================================== */}

                    <section className="
                        bg-white
                        dark:bg-gray-900
                        rounded-3xl
                        shadow-xl
                        dark:shadow-black/30
                        p-7
                        md:p-10
                        mb-8
                        transition-colors
                        duration-300
                    ">

                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            gap-6
                        ">

                            {/* PROFILE ICON */}

                            <div className="
                                w-24
                                h-24
                                rounded-full
                                bg-green-100
                                dark:bg-green-950
                                flex
                                items-center
                                justify-center
                                text-5xl
                                shadow-inner
                            ">
                                👤
                            </div>


                            {/* USER DETAILS */}

                            <div className="
                                flex-1
                            ">

                                <p className="
                                    text-[#b56b45]
                                    dark:text-orange-400
                                    uppercase
                                    tracking-[0.2em]
                                    text-sm
                                    font-semibold
                                ">
                                    My Profile
                                </p>


                                <h1 className="
                                    text-3xl
                                    md:text-4xl
                                    font-bold
                                    mt-2
                                    text-[#263528]
                                    dark:text-white
                                ">
                                    Welcome, {displayName}! 👋
                                </h1>


                                {user?.email && (
                                    <p className="
                                        text-gray-500
                                        dark:text-gray-400
                                        mt-2
                                    ">
                                        {user.email}
                                    </p>
                                )}

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        STATISTICS
                    ================================================== */}

                    <section className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-4
                        md:gap-5
                        mb-12
                    ">


                        {/* TOTAL BOOKINGS */}

                        <div className="
                            bg-white
                            dark:bg-gray-900
                            rounded-2xl
                            shadow-md
                            dark:shadow-black/30
                            p-5
                            md:p-6
                            transition-colors
                            duration-300
                        ">

                            <div className="
                                text-3xl
                                mb-3
                            ">
                                🏡
                            </div>

                            <p className="
                                text-gray-500
                                dark:text-gray-400
                                text-sm
                            ">
                                Total Bookings
                            </p>

                            <p className="
                                text-3xl
                                font-bold
                                mt-1
                                text-[#263528]
                                dark:text-white
                            ">
                                {totalBookings}
                            </p>

                        </div>


                        {/* UPCOMING */}

                        <div className="
                            bg-white
                            dark:bg-gray-900
                            rounded-2xl
                            shadow-md
                            dark:shadow-black/30
                            p-5
                            md:p-6
                            transition-colors
                            duration-300
                        ">

                            <div className="
                                text-3xl
                                mb-3
                            ">
                                📅
                            </div>

                            <p className="
                                text-gray-500
                                dark:text-gray-400
                                text-sm
                            ">
                                Upcoming Trips
                            </p>

                            <p className="
                                text-3xl
                                font-bold
                                mt-1
                                text-green-600
                                dark:text-green-400
                            ">
                                {upcomingBookings.length}
                            </p>

                        </div>


                        {/* COMPLETED */}

                        <div className="
                            bg-white
                            dark:bg-gray-900
                            rounded-2xl
                            shadow-md
                            dark:shadow-black/30
                            p-5
                            md:p-6
                            transition-colors
                            duration-300
                        ">

                            <div className="
                                text-3xl
                                mb-3
                            ">
                                🏔️
                            </div>

                            <p className="
                                text-gray-500
                                dark:text-gray-400
                                text-sm
                            ">
                                Trips Completed
                            </p>

                            <p className="
                                text-3xl
                                font-bold
                                mt-1
                                text-[#b56b45]
                                dark:text-orange-400
                            ">
                                {completedBookings.length}
                            </p>

                        </div>


                        {/* TOTAL SPENT */}

                        <div className="
                            bg-white
                            dark:bg-gray-900
                            rounded-2xl
                            shadow-md
                            dark:shadow-black/30
                            p-5
                            md:p-6
                            transition-colors
                            duration-300
                        ">

                            <div className="
                                text-3xl
                                mb-3
                            ">
                                💰
                            </div>

                            <p className="
                                text-gray-500
                                dark:text-gray-400
                                text-sm
                            ">
                                Total Spent
                            </p>

                            <p className="
                                text-2xl
                                font-bold
                                mt-1
                                text-green-600
                                dark:text-green-400
                            ">
                                ₹{totalSpent}
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        MY BOOKINGS
                    ================================================== */}

                    <section>

                        <div className="
                            mb-7
                        ">

                            <p className="
                                text-[#b56b45]
                                dark:text-orange-400
                                uppercase
                                tracking-[0.2em]
                                text-sm
                                font-semibold
                            ">
                                Your Trips
                            </p>

                            <h2 className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                mt-2
                                text-[#263528]
                                dark:text-white
                            ">
                                My Bookings
                            </h2>

                            <p className="
                                text-gray-500
                                dark:text-gray-400
                                mt-2
                            ">
                                View and manage all your
                                homestay bookings.
                            </p>

                        </div>


                        {/* =================================================
                            NO BOOKINGS
                        ================================================== */}

                        {bookings.length === 0 ? (

                            <div className="
                                bg-white
                                dark:bg-gray-900
                                rounded-3xl
                                shadow-lg
                                dark:shadow-black/30
                                p-10
                                md:p-14
                                text-center
                                transition-colors
                                duration-300
                            ">

                                <div className="
                                    text-6xl
                                    mb-5
                                ">
                                    🏡
                                </div>

                                <h3 className="
                                    text-2xl
                                    font-bold
                                    text-[#263528]
                                    dark:text-white
                                ">
                                    No Bookings Yet
                                </h3>

                                <p className="
                                    text-gray-500
                                    dark:text-gray-400
                                    mt-3
                                    max-w-lg
                                    mx-auto
                                ">
                                    Your Uttarakhand adventure
                                    is waiting! Explore beautiful
                                    districts and book your first
                                    homestay.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/dashboard"
                                        )
                                    }
                                    className="
                                        mt-7
                                        px-7
                                        py-3
                                        rounded-xl
                                        bg-green-600
                                        hover:bg-green-700
                                        text-white
                                        font-semibold
                                        transition
                                    "
                                >
                                    Explore Homestays
                                </button>

                            </div>

                        ) : (

                            <div className="
                                space-y-6
                            ">

                                {bookings.map(
                                    (booking) => {

                                        const homestay =
                                            booking.homestay;

                                        return (
                                            <article
                                                key={
                                                    booking._id
                                                }
                                                className="
                                                    bg-white
                                                    dark:bg-gray-900
                                                    rounded-3xl
                                                    shadow-lg
                                                    dark:shadow-black/30
                                                    overflow-hidden
                                                    transition-colors
                                                    duration-300
                                                "
                                            >

                                                <div className="
                                                    grid
                                                    grid-cols-1
                                                    md:grid-cols-[280px_1fr]
                                                ">


                                                    {/* IMAGE */}

                                                    <div className="
                                                        h-64
                                                        md:h-full
                                                        min-h-[280px]
                                                        bg-green-100
                                                        dark:bg-green-950
                                                    ">

                                                        {homestay?.image ? (

                                                            <img
                                                                src={encodeURI(
                                                                    homestay.image
                                                                )}
                                                                alt={
                                                                    homestay.name ||
                                                                    "Homestay"
                                                                }
                                                                className="
                                                                    w-full
                                                                    h-full
                                                                    object-cover
                                                                "
                                                            />

                                                        ) : (

                                                            <div className="
                                                                w-full
                                                                h-full
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-7xl
                                                            ">
                                                                🏡
                                                            </div>

                                                        )}

                                                    </div>


                                                    {/* BOOKING DETAILS */}

                                                    <div className="
                                                        p-6
                                                        md:p-8
                                                    ">


                                                        {/* NAME + STATUS */}

                                                        <div className="
                                                            flex
                                                            flex-col
                                                            sm:flex-row
                                                            sm:items-start
                                                            sm:justify-between
                                                            gap-4
                                                        ">

                                                            <div>

                                                                <p className="
                                                                    text-[#b56b45]
                                                                    dark:text-orange-400
                                                                    uppercase
                                                                    tracking-wider
                                                                    text-xs
                                                                    font-bold
                                                                ">
                                                                    Homestay
                                                                </p>

                                                                <h3 className="
                                                                    text-2xl
                                                                    font-bold
                                                                    mt-1
                                                                    text-[#263528]
                                                                    dark:text-white
                                                                ">
                                                                    {
                                                                        homestay?.name ||
                                                                        "Homestay"
                                                                    }
                                                                </h3>

                                                                <p className="
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    mt-2
                                                                ">
                                                                    📍{" "}
                                                                    {
                                                                        homestay?.location ||
                                                                        "Uttarakhand"
                                                                    }
                                                                </p>

                                                            </div>


                                                            {/* STATUS */}

                                                            <span
                                                                className={`
                                                                    inline-flex
                                                                    w-fit
                                                                    px-4
                                                                    py-2
                                                                    rounded-full
                                                                    text-sm
                                                                    font-semibold

                                                                    ${
                                                                        booking.status ===
                                                                        "confirmed"

                                                                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"

                                                                            : booking.status ===
                                                                              "cancelled"

                                                                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"

                                                                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                                    }
                                                                `}
                                                            >
                                                                {booking.status
                                                                    ? booking.status
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                      booking.status.slice(1)
                                                                    : "Unknown"}
                                                            </span>

                                                        </div>


                                                        {/* BOOKING INFO */}

                                                        <div className="
                                                            grid
                                                            grid-cols-2
                                                            lg:grid-cols-4
                                                            gap-3
                                                            mt-7
                                                        ">


                                                            {/* CHECK IN */}

                                                            <div className="
                                                                bg-[#f7f3eb]
                                                                dark:bg-gray-800
                                                                rounded-xl
                                                                p-4
                                                            ">

                                                                <p className="
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    text-xs
                                                                    uppercase
                                                                    font-semibold
                                                                ">
                                                                    Check-in
                                                                </p>

                                                                <p className="
                                                                    font-semibold
                                                                    mt-1
                                                                    text-sm
                                                                    text-[#263528]
                                                                    dark:text-gray-100
                                                                ">
                                                                    {
                                                                        formatDate(
                                                                            booking.checkIn
                                                                        )
                                                                    }
                                                                </p>

                                                            </div>


                                                            {/* CHECK OUT */}

                                                            <div className="
                                                                bg-[#f7f3eb]
                                                                dark:bg-gray-800
                                                                rounded-xl
                                                                p-4
                                                            ">

                                                                <p className="
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    text-xs
                                                                    uppercase
                                                                    font-semibold
                                                                ">
                                                                    Check-out
                                                                </p>

                                                                <p className="
                                                                    font-semibold
                                                                    mt-1
                                                                    text-sm
                                                                    text-[#263528]
                                                                    dark:text-gray-100
                                                                ">
                                                                    {
                                                                        formatDate(
                                                                            booking.checkOut
                                                                        )
                                                                    }
                                                                </p>

                                                            </div>


                                                            {/* GUESTS */}

                                                            <div className="
                                                                bg-[#f7f3eb]
                                                                dark:bg-gray-800
                                                                rounded-xl
                                                                p-4
                                                            ">

                                                                <p className="
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    text-xs
                                                                    uppercase
                                                                    font-semibold
                                                                ">
                                                                    Guests
                                                                </p>

                                                                <p className="
                                                                    font-semibold
                                                                    mt-1
                                                                    text-sm
                                                                    text-[#263528]
                                                                    dark:text-gray-100
                                                                ">
                                                                    {
                                                                        booking.guests
                                                                    }{" "}
                                                                    {
                                                                        booking.guests ===
                                                                        1
                                                                            ? "Guest"
                                                                            : "Guests"
                                                                    }
                                                                </p>

                                                            </div>


                                                            {/* NIGHTS */}

                                                            <div className="
                                                                bg-[#f7f3eb]
                                                                dark:bg-gray-800
                                                                rounded-xl
                                                                p-4
                                                            ">

                                                                <p className="
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    text-xs
                                                                    uppercase
                                                                    font-semibold
                                                                ">
                                                                    Nights
                                                                </p>

                                                                <p className="
                                                                    font-semibold
                                                                    mt-1
                                                                    text-sm
                                                                    text-[#263528]
                                                                    dark:text-gray-100
                                                                ">
                                                                    {
                                                                        booking.nights
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>


                                                        {/* TOTAL */}

                                                        <div className="
                                                            mt-5
                                                            flex
                                                            items-center
                                                            justify-between
                                                            bg-green-50
                                                            dark:bg-green-950/40
                                                            rounded-xl
                                                            px-5
                                                            py-4
                                                        ">

                                                            <div>

                                                                <p className="
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    text-sm
                                                                ">
                                                                    Total Amount
                                                                </p>

                                                                <p className="
                                                                    text-2xl
                                                                    font-bold
                                                                    text-green-700
                                                                    dark:text-green-400
                                                                ">
                                                                    ₹
                                                                    {
                                                                        booking.totalAmount
                                                                    }
                                                                </p>

                                                            </div>


                                                            <div className="
                                                                text-right
                                                            ">

                                                                <p className="
                                                                    text-gray-400
                                                                    dark:text-gray-500
                                                                    text-xs
                                                                ">
                                                                    Price / Night
                                                                </p>

                                                                <p className="
                                                                    font-semibold
                                                                    text-gray-600
                                                                    dark:text-gray-300
                                                                ">
                                                                    ₹
                                                                    {
                                                                        homestay?.price ||
                                                                        0
                                                                    }
                                                                </p>

                                                            </div>

                                                        </div>


                                                        {/* BOOKING ID + CANCEL */}

                                                        <div className="
                                                            mt-5
                                                            pt-5
                                                            border-t
                                                            border-gray-200
                                                            dark:border-gray-700
                                                            flex
                                                            flex-col
                                                            sm:flex-row
                                                            sm:items-center
                                                            sm:justify-between
                                                            gap-4
                                                        ">

                                                            <div>

                                                                <p className="
                                                                    text-xs
                                                                    text-gray-400
                                                                ">
                                                                    Booking ID
                                                                </p>

                                                                <p className="
                                                                    text-xs
                                                                    text-gray-500
                                                                    dark:text-gray-400
                                                                    break-all
                                                                    mt-1
                                                                ">
                                                                    {
                                                                        booking._id
                                                                    }
                                                                </p>

                                                            </div>


                                                            {booking.status ===
                                                                "confirmed" && (

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleCancelBooking(
                                                                            booking._id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        cancellingId ===
                                                                        booking._id
                                                                    }
                                                                    className="
                                                                        px-5
                                                                        py-2.5
                                                                        rounded-xl
                                                                        border
                                                                        border-red-300
                                                                        dark:border-red-500
                                                                        text-red-600
                                                                        dark:text-red-400
                                                                        font-semibold
                                                                        hover:bg-red-50
                                                                        dark:hover:bg-red-950/40
                                                                        transition
                                                                        disabled:opacity-50
                                                                        disabled:cursor-not-allowed
                                                                    "
                                                                >
                                                                    {
                                                                        cancellingId ===
                                                                        booking._id
                                                                            ? "Cancelling..."
                                                                            : "Cancel Booking"
                                                                    }
                                                                </button>

                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                            </article>
                                        );
                                    }
                                )}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        PLACES VISITED
                    ================================================== */}

                    {completedBookings.length > 0 && (

                        <section className="
                            mt-14
                        ">

                            <p className="
                                text-[#b56b45]
                                dark:text-orange-400
                                uppercase
                                tracking-[0.2em]
                                text-sm
                                font-semibold
                            ">
                                Your Journey
                            </p>

                            <h2 className="
                                text-3xl
                                font-bold
                                mt-2
                                mb-6
                                text-[#263528]
                                dark:text-white
                            ">
                                Places You've Visited 🏔️
                            </h2>

                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-5
                            ">

                                {completedBookings.map(
                                    (booking) => {

                                        const homestay =
                                            booking.homestay;

                                        return (
                                            <div
                                                key={
                                                    booking._id
                                                }
                                                className="
                                                    bg-white
                                                    dark:bg-gray-900
                                                    rounded-2xl
                                                    shadow-md
                                                    dark:shadow-black/30
                                                    overflow-hidden
                                                    transition-colors
                                                    duration-300
                                                "
                                            >

                                                <div className="
                                                    h-44
                                                ">

                                                    {homestay?.image ? (

                                                        <img
                                                            src={encodeURI(
                                                                homestay.image
                                                            )}
                                                            alt={
                                                                homestay.name
                                                            }
                                                            className="
                                                                w-full
                                                                h-full
                                                                object-cover
                                                            "
                                                        />

                                                    ) : (

                                                        <div className="
                                                            w-full
                                                            h-full
                                                            bg-green-100
                                                            dark:bg-green-950
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-5xl
                                                        ">
                                                            🏔️
                                                        </div>

                                                    )}

                                                </div>


                                                <div className="
                                                    p-5
                                                ">

                                                    <h3 className="
                                                        font-bold
                                                        text-xl
                                                        text-[#263528]
                                                        dark:text-white
                                                    ">
                                                        {
                                                            homestay?.name ||
                                                            "Homestay"
                                                        }
                                                    </h3>


                                                    <p className="
                                                        text-gray-500
                                                        dark:text-gray-400
                                                        mt-2
                                                    ">
                                                        📍{" "}
                                                        {
                                                            homestay?.location ||
                                                            "Uttarakhand"
                                                        }
                                                    </p>


                                                    <p className="
                                                        text-sm
                                                        text-gray-400
                                                        dark:text-gray-500
                                                        mt-3
                                                    ">
                                                        Visited on{" "}
                                                        {
                                                            formatDate(
                                                                booking.checkOut
                                                            )
                                                        }
                                                    </p>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                        </section>

                    )}

                </div>

            </main>


            <Footer />

        </div>
    );
}

export default Profile;