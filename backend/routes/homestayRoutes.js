const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  getAllHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays,
} = require("../controllers/homestayController");

// Search Homestays
router.get("/search", searchHomestays);

// Get All Homestays
router.get("/", getAllHomestays);

// Get Homestay by ID
router.get("/:id", getHomestayById);

// Create Homestay
router.post("/", protect, createHomestay);

router.put("/:id", protect, updateHomestay);

router.delete("/:id", protect, deleteHomestay);

module.exports = router;