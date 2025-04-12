const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const socketIo = require('socket.io');

const quizRoutes = require('./routes/quizRoutes');
const flipCardRoutes = require('./routes/flipCardRoutes'); // ✅ Added

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);

const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/moralmentor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Existing Routes
app.use('/api', quizRoutes);

// FlipCard Routes (Updated to handle /api/flipcards/:theme, /api/flipcards/random/:theme)
app.use('/api', flipCardRoutes);

// Optional: Direct theme route for initial data if needed
const FlipCard = require('./models/FlipCard');
app.get('/api/questions/:theme', async (req, res) => {
  try {
    const decodedTheme = decodeURIComponent(req.params.theme);
    console.log("Decoded theme:", decodedTheme);

    const flipCardData = await FlipCard.findOne({ theme: decodedTheme });

    if (!flipCardData) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    const cards = flipCardData.cards.map((card) => ({
      question: card.question,
      optionYes: "Yes",
      optionNo: "No",
      explanationYes: card.correctAnswer === "Yes" ? card.explanationCorrect : card.explanationIncorrect,
      explanationNo: card.correctAnswer === "No" ? card.explanationCorrect : card.explanationIncorrect,
    }));

    res.json({ [decodedTheme]: cards });
  } catch (err) {
    console.error('Error fetching questions for theme:', req.params.theme, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Moral Mentor Backend Running');
});

// Real-time socket handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join debate room
  socket.on('joinDebate', (debateRoomId, userId, side) => {
    socket.join(debateRoomId);
    console.log(`${userId} joined debate room ${debateRoomId} as ${side}`);
    io.to(debateRoomId).emit('userJoined', userId, side); // Notify other users
  });

  // Voting event
  socket.on('vote', (debateRoomId, side) => {
    console.log(`User voted for ${side} in room ${debateRoomId}`);
    io.to(debateRoomId).emit('newVote', side); // Update the votes in the room
  });

  // Round end event
  socket.on('endRound', (debateRoomId, winner) => {
    console.log(`Round ended in room ${debateRoomId}, winner: ${winner}`);
    io.to(debateRoomId).emit('roundEnded', winner); // Announce winner of the round
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
