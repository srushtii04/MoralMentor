const mongoose = require("mongoose");

const flipCardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  correctAnswer: { type: String, enum: ["Yes", "No"], required: true },
  explanation: { type: String, required: true },
});

module.exports = mongoose.model("FlipCard", flipCardSchema);
