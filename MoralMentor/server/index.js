require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Import Routes
const flipCardRoutes = require("./routes/flipCardRoutes");
const authRoutes = require("./routes/authRoutes"); 
const quizRoutes = require("./routes/quizRoutes"); 
const userStatsRoutes = require("./routes/userStatsRoutes"); 
const resourceRoutes = require("./routes/resourceRoutes"); 

// ✅ Use Routes
app.use("/api/flipcards", flipCardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/userstats", userStatsRoutes);  // Dashboard route
app.use("/api/resources", resourceRoutes);   // Resources route

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
