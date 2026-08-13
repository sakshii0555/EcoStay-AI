const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllHomestays,
  getHomestaysByDistrict,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
} = require("../controllers/homestayController");


// =====================================================
// PUBLIC ROUTES
// =====================================================

// Search Homestays
router.get("/search", searchHomestays);

// Get Homestays by District
router.get("/district/:district", getHomestaysByDistrict);

// Get All Homestays
router.get("/", getAllHomestays);

// Get Homestay by ID
router.get("/:id", getHomestayById);


// =====================================================
// ADMIN ONLY ROUTES
// =====================================================

// Create Homestay
router.post("/", protect, adminOnly, createHomestay);

// Update Homestay
router.put("/:id", protect, adminOnly, updateHomestay);

// Delete Homestay
router.delete("/:id", protect, adminOnly, deleteHomestay);


module.exports = router;