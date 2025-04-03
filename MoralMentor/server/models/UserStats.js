const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  quizzesCompleted: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  badges: [
    {
      title: { type: String, required: true },  // Badge title
      earnedAt: { type: Date, default: Date.now }
    }
  ],
  bestLessons: [{ type: String }]  // List of best lessons user saved
});

module.exports = mongoose.model("UserStats", userStatsSchema);
