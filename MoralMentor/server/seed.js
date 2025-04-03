const mongoose = require("mongoose");
const dotenv = require("dotenv");
const FlipCard = require("./models/FlipCard");
const Quiz = require("./models/Quiz"); // ✅ Import the Quiz model

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const flipCards = [
  {
    question: "Is it okay to lie to protect someone’s feelings?",
    correctAnswer: "No",
    explanation: "Honesty builds trust, and a lie can cause bigger issues later.",
  },
  {
    question: "Should you return a lost wallet if no one saw you take it?",
    correctAnswer: "Yes",
    explanation: "Returning it shows integrity and responsibility.",
  },
];

const quizzes = [
  {
    question: "What is the fundamental principle of ethics?",
    options: ["Honesty", "Loyalty", "Wealth", "Fame"],
    correctAnswer: "Honesty",
  },
  {
    question: "Is it ethical to use someone's work without giving credit?",
    options: ["Yes", "No", "Depends on the situation", "Only in emergencies"],
    correctAnswer: "No",
  },
];

const seedDB = async () => {
  try {
    await FlipCard.deleteMany({});
    await FlipCard.insertMany(flipCards);
    console.log("✅ FlipCards Seeded!");

    await Quiz.deleteMany({}); // ✅ Add this for quizzes
    await Quiz.insertMany(quizzes);
    console.log("✅ Quiz Questions Seeded!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    mongoose.connection.close();
  }
};

seedDB();
