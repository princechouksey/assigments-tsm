const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// 1️⃣ CORS should be applied **before routes**
app.use(cors({
    origin: CLIENT_URL,      // allows requests from any origin
    credentials: true // allow cookies
}));


// 2️⃣ Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3️⃣ Logging middleware
app.use(morgan("combined"));

// 4️⃣ Routes
app.use("/api/user", userRoutes);
app.use("/auth", authRoutes);

// 5️⃣ Passport config (if needed)
require('./config/passport');

// 6️⃣ Error handler should be **after all routes**
app.use(errorHandler);

module.exports = app;
