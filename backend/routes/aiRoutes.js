const express = require("express");
const { generateTrip } = require("../controllers/aiController");

const router = express.Router();

router.post("/plan", generateTrip);

module.exports = router;