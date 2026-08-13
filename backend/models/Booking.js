const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // =====================================================
    // USER
    // =====================================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =====================================================
    // HOMESTAY
    // =====================================================

    homestay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homestay",
      required: true,
    },

    // =====================================================
    // CHECK-IN
    // =====================================================

    checkIn: {
      type: Date,
      required: true,
    },

    // =====================================================
    // CHECK-OUT
    // =====================================================

    checkOut: {
      type: Date,
      required: true,
    },

    // =====================================================
    // GUESTS
    // =====================================================

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    // =====================================================
    // NIGHTS
    // =====================================================

    nights: {
      type: Number,
      required: true,
      min: 1,
    },

    // =====================================================
    // TOTAL AMOUNT
    // =====================================================

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // =====================================================
    // STATUS
    // =====================================================

    status: {
      type: String,
      enum: [
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);