const express = require('express');
const Debate = require('../models/Debate');
const User = require('../models/User');
const router = express.Router();

// Create a debate
router.post('/debate/create', async (req, res) => {
  const { theme, proSide, conSide } = req.body;

  try {
    const newDebate = new Debate({
      theme,
      proSide,
      conSide,
      status: 'pending',
    });

    await newDebate.save();
    res.status(201).json({ message: 'Debate created successfully', debate: newDebate });
  } catch (err) {
    console.error('Error creating debate:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Join a debate
router.post('/debate/join', async (req, res) => {
  const { userId, debateRoomId, side } = req.body;

  try {
    const debate = await Debate.findById(debateRoomId);
    const user = await User.findById(userId);

    if (!debate || !user) {
      return res.status(404).json({ message: 'Debate or user not found' });
    }

    if (debate.status === 'active') {
      return res.status(400).json({ message: 'Debate is already active' });
    }

    user.debateRoom = debateRoomId;
    user.role = 'debater';
    await user.save();

    debate.participants.push({ userId, side });
    await debate.save();

    res.status(200).json({ message: 'User joined debate', debate });
  } catch (err) {
    console.error('Error joining debate:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
