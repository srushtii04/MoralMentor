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
    debateRooms: [
        {
            debateRoomId: { type: mongoose.Schema.Types.ObjectId, ref: "Debate" },
            role: { type: String, enum: ['debater', 'audience'], required: true },
            side: { type: String, enum: ['pro', 'con'], required: false } // Optional for debaters
        }
    ] // Tracks debates the user is a part of
});

module.exports = mongoose.model("User", userSchema);
