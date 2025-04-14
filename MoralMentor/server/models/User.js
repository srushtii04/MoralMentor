const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalPoints: { type: Number, default: 0 }, // Tracks total points earned
    badges: [
        {
            title: { type: String, required: true },
            image: { type: String, required: true, default: "/images/badge.png" } // Default badge image
        }
    ], // Stores all earned badges
});

module.exports = mongoose.model("User", userSchema);
