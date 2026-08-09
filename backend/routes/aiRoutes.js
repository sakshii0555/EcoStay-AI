const express = require("express");
const {
  generateTrip,
  chatWithAI,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/plan", generateTrip);

router.post("/chat", chatWithAI);

module.exports = router;