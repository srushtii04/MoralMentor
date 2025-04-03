require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend requests
app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Test API
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Import routes
const flipCardRoutes = require("./routes/flipCardRoutes");
const authRoutes = require("./routes/authRoutes"); 
const quizRoutes = require("./routes/quizRoutes"); // Import quiz routes

// ✅ Use routes
app.use("/api/flipcards", flipCardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes); // Add quiz routes

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
