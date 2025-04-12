const mongoose = require("mongoose");

const flipCardSchema = new mongoose.Schema({
  theme: { type: String, required: true }, // Theme mentioned once
  cards: [
    {
      question: { type: String, required: true },
      correctAnswer: { type: String, enum: ["Yes", "No"], required: true }, // Define the correct answer
      explanationCorrect: { type: String, required: true }, // Explanation for correct answer
      explanationIncorrect: { type: String, required: true } // Explanation for incorrect answer
    }
  ]
});

module.exports = mongoose.model("FlipCard", flipCardSchema);
