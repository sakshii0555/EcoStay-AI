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
router.post("/", createHomestay);

// Update Homestay
router.put("/:id", updateHomestay);

// Delete Homestay
router.delete("/:id", deleteHomestay);

module.exports = router;