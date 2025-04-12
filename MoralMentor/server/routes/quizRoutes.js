const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

// GET /api/quiz?theme=Empathy - Get 10 random scenarios for a theme
router.get('/quiz', async (req, res) => {
  try {
    const theme = req.query.theme;
    if (!theme) {
      return res.status(400).json({ message: 'Theme is required' });
    }

    const result = await Quiz.aggregate([
      { $match: { theme } },
      { $unwind: "$questions" },
      { $sample: { size: 10 } },
      {
        $group: {
          _id: "$theme",
          questions: { $push: "$questions" }
        }
      },
      {
        $project: {
          _id: 0,
          theme: "$_id",
          questions: 1
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No quiz found for this theme' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching quiz questions' });
  }
});

// POST /api/quiz-result - Submit quiz answers
router.post('/quiz-result', async (req, res) => {
  try {
    const { answers, theme } = req.body;

    if (!theme || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Theme and answers are required' });
    }

    const result = await Quiz.aggregate([
      { $match: { theme } },
      { $unwind: "$questions" },
      { $sample: { size: 10 } },
      {
        $group: {
          _id: "$theme",
          questions: { $push: "$questions" }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const selectedQuestions = result[0].questions;

    let score = 0;
    selectedQuestions.forEach((q, i) => {
      if (answers[i] === q.correctDecision) {
        score += q.points;
      }
    });

    const quizResult = new QuizResult({ answers, score });
    await quizResult.save();

    res.status(200).json({ score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving result' });
  }
});

module.exports = router;
