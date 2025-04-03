const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    scenario: { type: String, required: true },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    correctDecision: { type: String, enum: ["A", "B"], required: true },
    consequenceA: { type: String, required: true },
    consequenceB: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    theme: { type: String, required: true, unique: true },
    questions: [questionSchema]
});

module.exports = mongoose.model("Quiz", quizSchema);
