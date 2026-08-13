const Booking = require("../models/Booking");
const Homestay = require("../models/Homestay");

// ============================================================
// CREATE BOOKING
// ============================================================

const createBooking = async (req, res, next) => {
  try {
    console.log("=================================");
    console.log("CREATE BOOKING REQUEST");
    console.log("User:", req.user);
    console.log("Body:", req.body);
    console.log("=================================");

    const {
      homestayId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    // --------------------------------------------------------
    // CHECK USER
    // --------------------------------------------------------

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    // --------------------------------------------------------
    // CHECK REQUIRED FIELDS
    // --------------------------------------------------------

    if (
      !homestayId ||
      !checkIn ||
      !checkOut ||
      guests === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all booking details.",
      });
    }

    // --------------------------------------------------------
    // FIND HOMESTAY
    // --------------------------------------------------------

    const homestay = await Homestay.findById(homestayId);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: "Homestay not found.",
      });
    }

    console.log("Homestay found:", homestay.name);
    console.log("Price per night:", homestay.price);

    // --------------------------------------------------------
    // CONVERT DATES
    // --------------------------------------------------------

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out date.",
      });
    }

    // --------------------------------------------------------
    // CHECK DATE ORDER
    // --------------------------------------------------------

    if (endDate <= startDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    // --------------------------------------------------------
    // CALCULATE NIGHTS
    // --------------------------------------------------------

    const difference =
      endDate.getTime() - startDate.getTime();

    const nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    if (nights < 1) {
      return res.status(400).json({
        success: false,
        message: "Booking must be for at least one night.",
      });
    }

    // --------------------------------------------------------
    // GUEST COUNT
    // --------------------------------------------------------

    const guestCount = Number(guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Number of guests must be at least 1.",
      });
    }

    // --------------------------------------------------------
    // CHECK FOR EXISTING BOOKING
    // --------------------------------------------------------

    const existingBooking = await Booking.findOne({
      homestay: homestayId,

      status: "confirmed",

      checkIn: {
        $lt: endDate,
      },

      checkOut: {
        $gt: startDate,
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message:
          "This homestay is already booked for the selected dates.",
      });
    }

    // --------------------------------------------------------
    // CALCULATE TOTAL
    // --------------------------------------------------------

    const pricePerNight = Number(homestay.price);

    if (
      isNaN(pricePerNight) ||
      pricePerNight < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid homestay price.",
      });
    }

    /*
      IMPORTANT:

      The price is for the ENTIRE HOMESTAY per night.

      Example:

      ₹1300/night
      3 nights
      4 guests

      Total = ₹1300 × 3
            = ₹3900

      Guests do NOT multiply the price.
    */

    const totalAmount =
      pricePerNight * nights;

    console.log("Price per night:", pricePerNight);
    console.log("Number of nights:", nights);
    console.log("Guests:", guestCount);
    console.log("Total amount:", totalAmount);

    // --------------------------------------------------------
    // CREATE BOOKING
    // --------------------------------------------------------

    const booking = await Booking.create({
      user: req.user._id,

      homestay: homestayId,

      checkIn: startDate,

      checkOut: endDate,

      guests: guestCount,

      nights: nights,

      totalAmount: totalAmount,

      status: "confirmed",
    });

    console.log(
      "Booking successfully created:",
      booking._id
    );

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(201).json({
      success: true,

      message: "Booking created successfully.",

      data: booking,
    });

  } catch (error) {
    console.error("=================================");
    console.error("BOOKING ERROR:");
    console.error(error);
    console.error("=================================");

    next(error);
  }
};


// ============================================================
// GET MY BOOKINGS
// ============================================================

const getMyBookings = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("homestay")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully.",
      data: bookings,
    });

  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    next(error);
  }
};


// ============================================================
// GET SINGLE BOOKING
// ============================================================

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("homestay");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    console.error("GET BOOKING ERROR:", error);
    next(error);
  }
};


// ============================================================
// CANCEL BOOKING
// ============================================================

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled.",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      data: booking,
    });

  } catch (error) {
    console.error("CANCEL BOOKING ERROR:", error);
    next(error);
  }
};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};