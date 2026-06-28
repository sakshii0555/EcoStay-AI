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

// GET all homestays
router.get("/", getAllHomestays);

// Search homestays
router.get("/search", searchHomestays);

// GET single homestay
router.get("/:id", getHomestayById);

// POST create homestay
router.post("/", createHomestay);

// PUT update homestay
router.put("/:id", updateHomestay);

// DELETE homestay
router.delete("/:id", deleteHomestay);

module.exports = router;