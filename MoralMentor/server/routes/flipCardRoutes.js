const express = require("express");
const FlipCard = require("../models/FlipCard");

const router = express.Router();

// ✅ Get all FlipCards
router.get("/", async (req, res) => {
  try {
    const flipCards = await FlipCard.find();
    res.json(flipCards);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Add a new FlipCard (Admin only)
router.post("/", async (req, res) => {
  const { question, correctAnswer, explanation } = req.body;
  try {
    const newFlipCard = new FlipCard({ question, correctAnswer, explanation });
    await newFlipCard.save();
    res.status(201).json(newFlipCard);
  } catch (error) {
    res.status(500).json({ message: "Error adding flip card" });
  }
});

module.exports = router;
