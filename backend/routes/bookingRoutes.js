const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} = require("../controllers/bookingController");


// =====================================================
// USER BOOKING ROUTES
// =====================================================


// Create booking
router.post(
  "/",
  protect,
  createBooking
);


// Get logged-in user's bookings
router.get(
  "/my",
  protect,
  getMyBookings
);


// Get one booking
router.get(
  "/:id",
  protect,
  getBookingById
);


// Cancel booking
router.put(
  "/:id/cancel",
  protect,
  cancelBooking
);


module.exports = router;