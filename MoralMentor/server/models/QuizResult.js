//MoralMentor\server\models\QuizResult.js
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  answers: [String],
  score: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QuizResult', quizResultSchema); // Binds to 'quizresults' collection
