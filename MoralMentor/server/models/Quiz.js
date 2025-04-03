const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  theme: { type: String, required: true, unique: true }, // Example: "Integrity", "Empathy"
  questions: [
    {
      scenario: { type: String, required: true }, // Scenario description
      decisionA: { type: String, required: true }, // First choice
      consequenceA: { type: String, required: true }, // Consequence of first choice
      decisionB: { type: String, required: true }, // Second choice
      consequenceB: { type: String, required: true }, // Consequence of second choice
      correctDecision: { type: String, enum: ["A", "B"], required: true }, // Correct choice (A/B)
    },
  ],
});

module.exports = mongoose.model("Quiz", QuizSchema);
