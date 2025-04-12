const express = require('express');
const router = express.Router();
const FlipCard = require('../models/FlipCard');

// GET paginated flip cards by theme
router.get('/flipcards/:theme', async (req, res) => {
  try {
    const decodedTheme = decodeURIComponent(req.params.theme); // Decode the theme
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 8;

    const flipCardData = await FlipCard.findOne({ theme: decodedTheme });

    if (!flipCardData) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    const paginatedCards = flipCardData.cards.slice(skip, skip + limit).map((card) => ({
      question: card.question,
      correctAnswer: card.correctAnswer,
      explanationCorrect: card.explanationCorrect,
      explanationIncorrect: card.explanationIncorrect,
    }));

    res.json({ [decodedTheme]: paginatedCards });
  } catch (err) {
    console.error('Pagination error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a random card by theme
router.get('/flipcards/random/:theme', async (req, res) => {
  try {
    const decodedTheme = decodeURIComponent(req.params.theme); // Decode the theme
    const flipCardData = await FlipCard.findOne({ theme: decodedTheme });

    if (!flipCardData || !flipCardData.cards.length) {
      return res.status(404).json({ error: 'Theme not found or no cards available' });
    }

    const randomIndex = Math.floor(Math.random() * flipCardData.cards.length);
    const card = flipCardData.cards[randomIndex];

    const formattedCard = {
      question: card.question,
      correctAnswer: card.correctAnswer,
      explanationCorrect: card.explanationCorrect,
      explanationIncorrect: card.explanationIncorrect,
    };

    res.json(formattedCard);
  } catch (err) {
    console.error('Random card error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
