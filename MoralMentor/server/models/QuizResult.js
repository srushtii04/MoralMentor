const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  theme: { type: String, required: true },
  score: { type: Number, required: true },
  resultSummary: [
    {
      scenario: { type: String, required: true },
      selectedDecision: { type: String, required: true },
      correctDecision: { type: String, required: true },
      consequence: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("QuizResult", QuizResultSchema);
