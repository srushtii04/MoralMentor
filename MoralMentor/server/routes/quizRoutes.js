const express = require("express");
const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const User = require("../models/User");

const router = express.Router();

// ✅ Submit Quiz & Calculate Score
router.post("/:theme/submit", async (req, res) => {
  try {
    const { theme } = req.params;
    const { userId, answers } = req.body;

    const quiz = await Quiz.findOne({ theme });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const results = quiz.questions.map((q, index) => {
      const userChoice = answers[index];
      const isCorrect = userChoice === q.correctDecision;
      if (isCorrect) score += 1;

      return {
        scenario: q.scenario,
        userResponse: userChoice,
        correctDecision: q.correctDecision,
        consequence: userChoice === "A" ? q.consequenceA : q.consequenceB,
        isCorrect,
      };
    });

    // ✅ Store Quiz Result
    const quizResult = new QuizResult({
      userId,
      theme,
      score,
      totalQuestions: quiz.questions.length,
      earnedBadges: []
    });

    // ✅ Fetch User & Update Total Points
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.totalPoints += score; // ✅ Add points

    // ✅ Award Badges Based on Points
    const badgeThresholds = [
      { points: 10, title: "Ethical Novice" },
      { points: 20, title: "Moral Explorer" },
      { points: 30, title: "Conscience Keeper" },
      { points: 50, title: "Virtue Champion" }
    ];

    badgeThresholds.forEach((badge) => {
      if (user.totalPoints >= badge.points && !user.badges.some(b => b.title === badge.title)) {
        const newBadge = { title: badge.title, image: "/images/badge.png" };
        user.badges.push(newBadge);
        quizResult.earnedBadges.push(newBadge);
      }
    });

    await user.save();
    await quizResult.save();

    res.status(200).json({ score, total: quiz.questions.length, results, earnedBadges: quizResult.earnedBadges });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
});

module.exports = router;
