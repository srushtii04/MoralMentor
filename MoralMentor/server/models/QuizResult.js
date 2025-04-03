const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    theme: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    earnedBadges: [
        {
            title: { type: String, required: true },
            image: { type: String, required: true, default: "/images/badge.png" }
        }
    ], // ✅ Stores newly earned badges
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
