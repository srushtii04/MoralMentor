//MoralMentor\server\index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require('./routes/quizRoutes');
const flipCardRoutes = require('./routes/flipCardRoutes');
const userStatsRoutes = require('./routes/userStatsRoutes'); // ✅ Added userStatsRoutes

const app = express();
const server = require('http').createServer(app);


// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(cookieParser()); // Parse cookies, including JWT token
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// API Routes
app.use("/api", authRoutes); // Auth routes (login, signup, logout)
app.use('/api', quizRoutes); // Quiz-related routes
app.use('/api', flipCardRoutes); // Flip card-related routes
app.use('/api', userStatsRoutes); // User stats-related routes

// Default Route
app.get('/', (req, res) => {
  res.send('Moral Mentor Backend Running');
});

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
