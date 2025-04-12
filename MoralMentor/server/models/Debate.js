const mongoose = require('mongoose');

const debateSchema = new mongoose.Schema({
  theme: { type: String, required: true },
  proSide: { type: String, required: true },
  conSide: { type: String, required: true },
  participants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    side: { type: String, enum: ['pro', 'con'], required: true },
    arguments: [{ type: String }],
    votes: { type: Number, default: 0 },
  }],
  rounds: [{
    roundNumber: { type: Number, required: true },
    proArgument: String,
    conArgument: String,
    proVotes: { type: Number, default: 0 },
    conVotes: { type: Number, default: 0 },
    winner: { type: String, enum: ['pro', 'con', 'none'] },
  }],
  status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('Debate', debateSchema);
