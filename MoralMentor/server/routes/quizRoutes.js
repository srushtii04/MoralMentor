const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

// ✅ Add a new quiz (Admin/Moderator)
router.post("/", async (req, res) => {
  try {
    const { theme, questions } = req.body;
    const quizExists = await Quiz.findOne({ theme });

    if (quizExists) {
      return res.status(400).json({ message: "Quiz with this theme already exists" });
    }

    const newQuiz = new Quiz({ theme, questions });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Error adding quiz", error });
  }
});

// ✅ Fetch quiz questions by theme
router.get("/:theme", async (req, res) => {
  try {
    const { theme } = req.params;
    const quiz = await Quiz.findOne({ theme });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found for this theme" });
    }

    res.status(200).json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
});

// ✅ Submit quiz answers and calculate score
router.post("/:theme/submit", async (req, res) => {
  try {
    const { theme } = req.params;
    const { answers } = req.body; // Example: { "0": "A", "1": "B", ... }

    const quiz = await Quiz.findOne({ theme });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found for this theme" });
    }

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

    res.status(200).json({ score, total: quiz.questions.length, results });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
});

// ✅ Delete a quiz by theme (Admin/Moderator)
router.delete("/:theme", async (req, res) => {
  try {
    const { theme } = req.params;
    const quiz = await Quiz.findOneAndDelete({ theme });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
});

module.exports = router;
