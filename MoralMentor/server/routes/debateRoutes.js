const express = require('express'); 
const Debate = require('../models/Debate');
const User = require('../models/User');
const router = express.Router();

// POST /api/debate/create
router.post('/create', async (req, res) => {
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

// GET /api/debate/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const debate = await Debate.findById(id).populate('participants.userId', 'name email');

    if (!debate) {
      return res.status(404).json({ message: 'Debate not found' });
    }

    res.status(200).json(debate);
  } catch (err) {
    console.error('Error fetching debate:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/debate/join
router.post('/join', async (req, res) => {
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

    if (debate.participants.some(p => p.userId.toString() === userId)) {
      return res.status(400).json({ message: 'User is already a participant' });
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

// POST /api/debate/submit-argument
router.post('/submit-argument', async (req, res) => {
  const { userId, debateRoomId, argument, side } = req.body;

  try {
    const debate = await Debate.findById(debateRoomId);
    if (!debate) {
      return res.status(404).json({ message: 'Debate not found' });
    }

    const participant = debate.participants.find(p => p.userId.toString() === userId);
    if (!participant) {
      return res.status(400).json({ message: 'User not part of this debate' });
    }

    if (debate.status !== 'active') {
      return res.status(400).json({ message: 'Debate is not active' });
    }

    // If no rounds yet, create the first one
    if (debate.rounds.length === 0) {
      debate.rounds.push({
        roundNumber: 1,
        proArgument: '',
        conArgument: '',
        proVotes: 0,
        conVotes: 0,
        winner: 'none' // Fix: Changed from '' to 'none'
      });
    }

    const currentRound = debate.rounds[debate.rounds.length - 1];

    // Add argument based on side
    if (side === 'pro') {
      currentRound.proArgument = argument;
    } else if (side === 'con') {
      currentRound.conArgument = argument;
    } else {
      return res.status(400).json({ message: 'Invalid side' });
    }

    await debate.save();

    res.status(200).json({ message: 'Argument submitted successfully', debate });
  } catch (err) {
    console.error('Error submitting argument:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/debate/vote
router.post('/vote', async (req, res) => {
  const { userId, debateRoomId, side } = req.body;

  try {
    const debate = await Debate.findById(debateRoomId);
    if (!debate) {
      return res.status(404).json({ message: 'Debate not found' });
    }

    const participant = debate.participants.find(p => p.userId.toString() === userId);
    if (!participant) {
      return res.status(400).json({ message: 'User not part of this debate' });
    }

    if (debate.status !== 'active') {
      return res.status(400).json({ message: 'Debate is not active' });
    }

    const currentRound = debate.rounds[debate.rounds.length - 1];
    if (side === 'pro') {
      currentRound.proVotes += 1;
    } else if (side === 'con') {
      currentRound.conVotes += 1;
    }

    await debate.save();

    res.status(200).json({ message: 'Vote recorded successfully', debate });
  } catch (err) {
    console.error('Error voting:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/debate/end-round
router.post('/end-round', async (req, res) => {
  const { debateRoomId, winner } = req.body;

  try {
    // Ensure 'winner' is a valid value
    const validWinners = ['pro', 'con', 'none'];
    if (!validWinners.includes(winner)) {
      return res.status(400).json({ message: 'Invalid winner' });
    }

    const debate = await Debate.findById(debateRoomId);
    if (!debate) {
      return res.status(404).json({ message: 'Debate not found' });
    }

    if (debate.status !== 'active') {
      return res.status(400).json({ message: 'Debate is not active' });
    }

    const roundNumber = debate.rounds.length + 1;
    const round = {
      roundNumber,
      winner,
    };

    debate.rounds.push(round);
    debate.status = 'completed'; // End the debate after the round
    await debate.save();

    res.status(200).json({ message: 'Round ended successfully', debate });
  } catch (err) {
    console.error('Error ending round:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
