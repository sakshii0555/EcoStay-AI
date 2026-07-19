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
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/homestays", homestayRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

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