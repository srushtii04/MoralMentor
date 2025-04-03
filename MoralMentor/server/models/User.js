const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },  
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalPoints: { type: Number, default: 0 }, // ✅ Stores total points earned
    badges: [
        {
            title: { type: String, required: true }, // ✅ Badge title
            image: { type: String, required: true, default: "/images/badge.png" } // ✅ Fixed badge image
        }
    ] // ✅ Stores all earned badges (previous ones not overwritten)
});

module.exports = mongoose.model("User", userSchema);
