// authRoutes.js
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserStats = require("../models/UserStats"); // Import the UserStats model
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ User Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the User collection
    await newUser.save();

    // Create a new entry in UserStats for the user
    const userStats = new UserStats({
      userId: newUser._id,   // Link stats to the newly created user
      quizzesCompleted: 0,   // Initialize with zero completed quizzes
      totalScore: 0,         // Initialize with zero total score
      badges: [],            // Initialize with no badges
      bestLessons: []        // Initialize with no best lessons
    });

    // Save the user stats to the UserStats collection
    await userStats.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message, stack: error.stack });
  }
});

// ✅ User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token (user ID and email as payload)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the token as a cookie for session management
    res.cookie("token", token, { httpOnly: true, secure: false }); // `secure: true` in production with HTTPS

    // Send the token and user information in the JSON response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // Add other relevant user data you want to send to the frontend
        // For example, if your User model has an 'avatar' field:
        // avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message, stack: error.stack });
  }
});

// ✅ Logout
router.post("/logout", (req, res) => {
  // Clear the cookie and logout the user
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Check Authentication (reads token from cookie)
router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // Include other relevant user data
        // avatar: user.avatar, // If your User model has it
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking authentication", error: error.message, stack: error.stack });
  }
});

// ✅ Example of a Protected Route (now using the standard authMiddleware)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");   // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user stats to include total score and badges
    const userStats = await UserStats.findOne({ userId: req.user.id });
    if (!userStats) {
      return res.status(404).json({ message: "User stats not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // Include other relevant user data
        // avatar: user.avatar, // If your User model has it
      },
      stats: userStats
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error: error.message, stack: error.stack });
  }
});

module.exports = router;