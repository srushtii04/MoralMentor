const express = require("express");
const FlipCard = require("../models/FlipCard");

const router = express.Router();

// ✅ Get all FlipCards
router.get("/", async (req, res) => {
  try {
    const flipCards = await FlipCard.find();
    res.json(flipCards);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Add a new FlipCard (Admin only)
router.post("/", async (req, res) => {
  const { question, explanationYes, explanationNo } = req.body;

  try {
    const newFlipCard = new FlipCard({
      question,
      explanationYes,
      explanationNo,
    });

    await newFlipCard.save();
    res.status(201).json({ message: "FlipCard added successfully", flipCard: newFlipCard });
  } catch (error) {
    res.status(500).json({ message: "Error adding flip card", error });
  }
});

// ✅ Get a single FlipCard by ID
router.get("/:id", async (req, res) => {
  try {
    const flipCard = await FlipCard.findById(req.params.id);
    if (!flipCard) {
      return res.status(404).json({ message: "FlipCard not found" });
    }
    res.json(flipCard);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Submit an answer and get the explanation
router.post("/:id/submit", async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body; // Expecting "Yes" or "No"

    const flipCard = await FlipCard.findById(id);
    if (!flipCard) {
      return res.status(404).json({ message: "FlipCard not found" });
    }

    // Determine the explanation based on the user's choice
    const explanation =
      answer === "Yes" ? flipCard.explanationYes : flipCard.explanationNo;

    res.status(200).json({
      question: flipCard.question,
      selectedAnswer: answer,
      explanation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing answer", error });
  }
});

// ✅ Delete a FlipCard (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const flipCard = await FlipCard.findByIdAndDelete(req.params.id);
    if (!flipCard) {
      return res.status(404).json({ message: "FlipCard not found" });
    }
    res.status(200).json({ message: "FlipCard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flip card", error });
  }
});

// ✅ Get Random Set of 8 FlipCards
router.get("/random", async (req, res) => {
  try {
    const totalCards = await FlipCard.countDocuments();
    const randomSkip = Math.floor(Math.random() * totalCards);
    
    const randomFlipCards = await FlipCard.aggregate([
      { $skip: randomSkip },
      { $limit: 8 }, // Fetch 8 cards randomly
    ]);

    if (randomFlipCards.length === 0) {
      return res.status(404).json({ message: "No FlipCards found" });
    }

    res.json(randomFlipCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random FlipCards", error });
  }
});

// ✅ Reset FlipCards (Get next random set)
router.get("/reset", async (req, res) => {
  try {
    const totalCards = await FlipCard.countDocuments();
    const randomSkip = Math.floor(Math.random() * totalCards);

    const randomFlipCards = await FlipCard.aggregate([
      { $skip: randomSkip },
      { $limit: 8 }, // Fetch next 8 cards randomly
    ]);

    if (randomFlipCards.length === 0) {
      return res.status(404).json({ message: "No FlipCards found" });
    }

    res.json(randomFlipCards);
  } catch (error) {
    res.status(500).json({ message: "Error resetting FlipCards", error });
  }
});

module.exports = router;
