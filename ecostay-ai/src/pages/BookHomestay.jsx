import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BookHomestay() {
    const { homestayId } = useParams();
    const navigate = useNavigate();

    const [homestay, setHomestay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    // =====================================================
    // GET HOMESTAY
    // =====================================================

    useEffect(() => {
        const fetchHomestay = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/homestays/${homestayId}`
                );

                const result = await response.json();

                if (response.ok && result.success) {
                    setHomestay(result.data);
                } else {
                    alert(
                        result.message ||
                        "Homestay not found."
                    );

                    navigate(-1);
                }
            } catch (error) {
                console.error(
                    "Error fetching homestay:",
                    error
                );

                alert(
                    "Unable to load homestay details."
                );

                navigate(-1);
            } finally {
                setLoading(false);
            }
        };

        if (homestayId) {
            fetchHomestay();
        }
    }, [homestayId, navigate]);


    // =====================================================
    // CALCULATE NIGHTS
    // =====================================================

    const calculateNights = () => {
        if (!checkIn || !checkOut) {
            return 0;
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        const difference =
            end.getTime() - start.getTime();

        const nights =
            difference /
            (1000 * 60 * 60 * 24);

        return nights > 0 ? nights : 0;
    };


    const nights = calculateNights();


    // =====================================================
    // TOTAL PRICE
    // =====================================================

    /*
      IMPORTANT:

      Homestay price is the price for the
      entire homestay per night.

      Example:

      ₹1300/night
      3 nights
      4 guests

      Total = ₹1300 × 3
            = ₹3900

      Number of guests does NOT multiply
      the homestay price.
    */

    const totalAmount =
        nights > 0 && homestay
            ? nights * Number(homestay.price)
            : 0;


    // =====================================================
    // TODAY
    // =====================================================

    const today = new Date()
        .toISOString()
        .split("T")[0];


    // =====================================================
    // CONFIRM BOOKING
    // =====================================================

    const handleBooking = async (e) => {
        e.preventDefault();

        const token =
            localStorage.getItem("token") ||
            localStorage.getItem("accessToken");

        // -------------------------------------------------
        // CHECK LOGIN
        // -------------------------------------------------

        if (!token) {
            alert(
                "Please login before booking."
            );

            navigate("/login");
            return;
        }


        // -------------------------------------------------
        // VALIDATE CHECK-IN
        // -------------------------------------------------

        if (!checkIn) {
            alert(
                "Please select a check-in date."
            );

            return;
        }


        // -------------------------------------------------
        // VALIDATE CHECK-OUT
        // -------------------------------------------------

        if (!checkOut) {
            alert(
                "Please select a check-out date."
            );

            return;
        }


        // -------------------------------------------------
        // VALIDATE DATES
        // -------------------------------------------------

        if (
            new Date(checkOut) <=
            new Date(checkIn)
        ) {
            alert(
                "Check-out date must be after check-in date."
            );

            return;
        }


        // -------------------------------------------------
        // VALIDATE GUESTS
        // -------------------------------------------------

        if (guests < 1) {
            alert(
                "At least one guest is required."
            );

            return;
        }


        try {
            setBooking(true);

            // -------------------------------------------------
            // SEND BOOKING REQUEST
            // -------------------------------------------------

            const response = await fetch(
                "http://localhost:5000/api/bookings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        homestayId,
                        checkIn,
                        checkOut,
                        guests: Number(guests),
                    }),
                }
            );


            const result =
                await response.json();


            // -------------------------------------------------
            // HANDLE FAILED BOOKING
            // -------------------------------------------------

            if (!response.ok) {
                alert(
                    result.message ||
                    "Failed to create booking."
                );

                return;
            }


            // -------------------------------------------------
            // SUCCESSFUL BOOKING
            // -------------------------------------------------

            /*
              Our backend returns:

              data: booking

              Therefore the booking ID is:

              result.data._id

              NOT:

              result.data.bookingId
            */

            const bookingId =
                result.data?._id;


            alert(
                `Booking confirmed! 🎉\n\nBooking ID: ${
                    bookingId || "Not available"
                }`
            );


            // -------------------------------------------------
            // GO TO MY PROFILE
            // -------------------------------------------------

            navigate(
                "/profile",
                {
                    replace: true,
                }
            );

        } catch (error) {
            console.error(
                "Booking error:",
                error
            );

            alert(
                "Something went wrong while creating your booking."
            );

        } finally {
            setBooking(false);
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f3eb]">

                <Navbar />

                <div className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                ">

                    <div className="text-center">

                        <div className="
                            text-5xl
                            mb-4
                        ">
                            ⏳
                        </div>

                        <p className="
                            text-gray-600
                            text-lg
                        ">
                            Loading homestay...
                        </p>

                    </div>

                </div>

                <Footer />

            </div>
        );
    }


    // =====================================================
    // HOMESTAY NOT FOUND
    // =====================================================

    if (!homestay) {
        return (
            <div className="
                min-h-screen
                bg-[#f7f3eb]
            ">

                <Navbar />

                <div className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    px-6
                ">

                    <div className="text-center">

                        <div className="
                            text-6xl
                            mb-5
                        ">
                            🏡
                        </div>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-[#263528]
                        ">
                            Homestay Not Found
                        </h1>

                        <button
                            onClick={() =>
                                navigate(-1)
                            }
                            className="
                                mt-6
                                px-6
                                py-3
                                rounded-xl
                                bg-[#00a63c]
                                text-white
                                font-semibold
                            "
                        >
                            Go Back
                        </button>

                    </div>

                </div>

                <Footer />

            </div>
        );
    }


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (
        <div className="
            min-h-screen
            bg-[#f7f3eb]
            text-[#263528]
        ">

            <Navbar />


            {/* =================================================
                BOOKING SECTION
            ================================================== */}

            <main className="
                pt-28
                pb-20
                px-5
            ">

                <div className="
                    max-w-6xl
                    mx-auto
                ">


                    {/* BACK BUTTON */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="
                            mb-6
                            text-[#8f4f32]
                            font-semibold
                            hover:text-[#b56b45]
                            transition
                        "
                    >
                        ← Back to Homestays
                    </button>


                    <div className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-10
                        items-start
                    ">


                        {/* =================================================
                            HOMESTAY DETAILS
                        ================================================== */}

                        <div className="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow-xl
                        ">

                            <div className="
                                h-72
                            ">

                                <img
                                    src={encodeURI(
                                        homestay.image
                                    )}
                                    alt={homestay.name}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            </div>


                            <div className="
                                p-7
                            ">

                                <p className="
                                    text-[#b56b45]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-sm
                                ">
                                    Your Stay
                                </p>


                                <h1 className="
                                    text-3xl
                                    font-bold
                                    mt-2
                                    text-[#263528]
                                ">
                                    {homestay.name}
                                </h1>


                                <p className="
                                    text-gray-500
                                    mt-3
                                    text-lg
                                ">
                                    📍 {homestay.location}
                                </p>


                                <div className="
                                    flex
                                    items-center
                                    gap-5
                                    mt-5
                                ">

                                    <span className="
                                        text-[#b56b45]
                                        font-bold
                                        text-xl
                                    ">
                                        ₹{homestay.price}

                                        <span className="
                                            text-gray-500
                                            text-sm
                                            font-normal
                                        ">
                                            {" "}
                                            / night
                                        </span>
                                    </span>


                                    <span className="
                                        text-gray-600
                                    ">
                                        ⭐ {homestay.rating}
                                    </span>

                                </div>


                                {homestay.description && (
                                    <p className="
                                        text-gray-600
                                        leading-7
                                        mt-6
                                    ">
                                        {homestay.description}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* =================================================
                            BOOKING FORM
                        ================================================== */}

                        <div className="
                            bg-white
                            rounded-3xl
                            shadow-xl
                            p-7
                            md:p-9
                        ">

                            <p className="
                                text-[#b56b45]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-sm
                            ">
                                Reserve Your Stay
                            </p>


                            <h2 className="
                                text-3xl
                                font-bold
                                mt-2
                                text-[#263528]
                            ">
                                Book Homestay
                            </h2>


                            <p className="
                                text-gray-500
                                mt-2
                                mb-7
                            ">
                                Choose your dates and number
                                of guests.
                            </p>


                            <form
                                onSubmit={handleBooking}
                                className="
                                    space-y-6
                                "
                            >


                                {/* CHECK-IN */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        mb-2
                                    ">
                                        Check-in Date
                                    </label>


                                    <input
                                        type="date"
                                        value={checkIn}
                                        min={today}
                                        onChange={(e) =>
                                            setCheckIn(
                                                e.target.value
                                            )
                                        }
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


                                {/* CHECK-OUT */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        mb-2
                                    ">
                                        Check-out Date
                                    </label>


                                    <input
                                        type="date"
                                        value={checkOut}
                                        min={
                                            checkIn ||
                                            today
                                        }
                                        onChange={(e) =>
                                            setCheckOut(
                                                e.target.value
                                            )
                                        }
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


                                {/* GUESTS */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        mb-2
                                    ">
                                        Number of Guests
                                    </label>


                                    <div className="
                                        flex
                                        items-center
                                        border
                                        border-gray-300
                                        rounded-xl
                                        overflow-hidden
                                    ">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setGuests(
                                                    Math.max(
                                                        1,
                                                        guests - 1
                                                    )
                                                )
                                            }
                                            className="
                                                px-5
                                                py-3
                                                text-xl
                                                hover:bg-gray-100
                                            "
                                        >
                                            −
                                        </button>


                                        <div className="
                                            flex-1
                                            text-center
                                            font-semibold
                                        ">
                                            {guests}{" "}
                                            {guests === 1
                                                ? "Guest"
                                                : "Guests"}
                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setGuests(
                                                    guests + 1
                                                )
                                            }
                                            className="
                                                px-5
                                                py-3
                                                text-xl
                                                hover:bg-gray-100
                                            "
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>


                                {/* =================================================
                                    PRICE SUMMARY
                                ================================================== */}

                                <div className="
                                    bg-[#f7f3eb]
                                    rounded-2xl
                                    p-5
                                ">

                                    <h3 className="
                                        font-bold
                                        text-lg
                                        mb-4
                                    ">
                                        Booking Summary
                                    </h3>


                                    <div className="
                                        flex
                                        justify-between
                                        text-gray-600
                                        mb-3
                                    ">

                                        <span>
                                            ₹{homestay.price}
                                            {" "}×{" "}
                                            {nights || 0}
                                            {" "}
                                            {nights === 1
                                                ? "night"
                                                : "nights"}
                                        </span>


                                        <span>
                                            ₹{totalAmount}
                                        </span>

                                    </div>


                                    <div className="
                                        border-t
                                        border-gray-300
                                        pt-4
                                        flex
                                        justify-between
                                        text-xl
                                        font-bold
                                    ">

                                        <span>
                                            Total
                                        </span>


                                        <span className="
                                            text-[#00a63c]
                                        ">
                                            ₹{totalAmount}
                                        </span>

                                    </div>

                                </div>


                                {/* =================================================
                                    CONFIRM BUTTON
                                ================================================== */}

                                <button
                                    type="submit"
                                    disabled={
                                        booking ||
                                        nights < 1
                                    }
                                    className="
                                        w-full
                                        px-6
                                        py-4
                                        rounded-xl
                                        bg-[#00a63c]
                                        hover:bg-[#008f35]
                                        text-white
                                        font-bold
                                        text-lg
                                        transition
                                        duration-200
                                        shadow-lg
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                    "
                                >
                                    {booking
                                        ? "Confirming Booking..."
                                        : "🏡 Confirm Booking"}
                                </button>


                                <p className="
                                    text-xs
                                    text-gray-500
                                    text-center
                                ">
                                    You can review your booking
                                    from My Profile after
                                    confirmation.
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </main>


            <Footer />

        </div>
    );
}

export default BookHomestay;