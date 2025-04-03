const express = require("express");
const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Submit quiz responses and calculate score
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { userId, theme, responses } = req.body; // Responses contain { questionId, selectedDecision }

    const quiz = await Quiz.findOne({ theme });
    if (!quiz) {
      return res.status(404).json({ message: "Theme not found" });
    }

    let score = 0;
    const resultSummary = [];

    responses.forEach((response) => {
      const question = quiz.questions.id(response.questionId); // Find question by ID
      if (!question) return;

      const isCorrect = question.correctDecision === response.selectedDecision;
      if (isCorrect) score++;

      resultSummary.push({
        scenario: question.scenario,
        selectedDecision: response.selectedDecision,
        correctDecision: question.correctDecision,
        consequence: response.selectedDecision === "A" ? question.consequenceA : question.consequenceB,
        isCorrect,
      });
    });

    // Save the result in DB
    const quizResult = new QuizResult({
      user: userId,
      theme,
      score,
      resultSummary,
    });

    await quizResult.save();

    res.status(200).json({ message: "Quiz submitted successfully", score, resultSummary });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
});

module.exports = router;
