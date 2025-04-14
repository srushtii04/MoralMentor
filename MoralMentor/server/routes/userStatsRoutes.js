//MoralMentor\server\routes\userStatsRoutes.js
const express = require("express");
const UserStats = require("../models/UserStats"); // Import user stats model

const router = express.Router();

// Update Quiz Score & Earn Badges
router.post("/update-score", async (req, res) => {
  try {
    const { userId, score } = req.body;

    let userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      return res.status(404).json({ message: "User stats not found" });
    }

    // Update user score
    userStats.totalScore += score;
    userStats.quizzesCompleted += 1;

    // Badge system (Earn badge at 100, 150, 200 points)
    const badgeMilestones = [100, 150, 200, 300, 500];
    if (badgeMilestones.includes(userStats.totalScore)) {
      userStats.badges.push({
        title: `Achiever - ${userStats.totalScore} Points`,
        earnedAt: new Date(),
      });
    }

    await userStats.save();

    res.json({ message: "User stats updated", userStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
