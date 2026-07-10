const express = require("express");
const passport = require("passport");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");

const authLimiter = require("../middleware/rateLimiter");

const router = express.Router();

// =====================
// Register
// =====================
router.post(
  "/register",
  authLimiter,
  registerValidation,
  register
);

// =====================
// Login
// =====================
router.post(
  "/login",
  authLimiter,
  loginValidation,
  login
);

// =====================
// Google Login
// =====================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// =====================
// Google Callback
// =====================
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

module.exports = router;