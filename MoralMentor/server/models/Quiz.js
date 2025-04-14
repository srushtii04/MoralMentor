//MoralMentor\server\models\Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  theme: String,
  questions: [
    {
      scenario: String,
      options: {
        A: String,
        B: String
      },
      correctDecision: String,
      consequenceA: String,
      consequenceB: String,
      points: Number
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema); // Binds to 'quizzes' collection
