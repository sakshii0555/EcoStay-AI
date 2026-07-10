const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ======================
// Load Environment Variables FIRST
// ======================
dotenv.config();

const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const connectDB = require("./config/database");

const app = express();

// ======================
// Connect MongoDB
// ======================
connectDB();

// ======================
// Debug (Remove later if you want)
// ======================
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

// ======================
// Middleware
// ======================
app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ======================
// Routes
// ======================
const homestayRoutes = require("./routes/homestayRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/homestays", homestayRoutes);
app.use("/api/auth", authRoutes);

// ======================
// Error Handler
// ======================
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});