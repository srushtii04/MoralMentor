import React, { useState } from "react";

const FlipCard = ({ question, correctAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleClick = (answer) => {
    if (!isFlipped) {
      if (answer === correctAnswer) {
        setFeedback("You are right");
      } else {
        setFeedback("You are wrong");
      }
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-64 h-40 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-[#E5D4FF] rounded-lg flex flex-col justify-center items-center backface-hidden shadow-lg">
          <p className="text-black text-center px-4 font-medium">{question}</p>
          <div className="mt-4 space-x-4">
            <button
              className="bg-[#865CC7] text-white px-4 py-1 rounded shadow-md"
              onClick={(e) => { e.stopPropagation(); handleClick("Yes"); }}
            >
              Yes
            </button>
            <button
              className="bg-[#865CC7] text-white px-4 py-1 rounded shadow-md"
              onClick={(e) => { e.stopPropagation(); handleClick("No"); }}
            >
              No
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-[#C9A7EB] rounded-lg flex justify-center items-center backface-hidden rotate-y-180 shadow-lg">
          <p className="text-black text-center px-4 font-medium">{feedback}</p>
        </div>
      </div>
    </div>
  );
};

const FlipCards = () => {
  const questions = [
    {
      question: "Should people be held accountable for unintended harm they cause?",
      correctAnswer: "Yes",
    },
    {
      question: "Is it unethical to buy products from companies that exploit workers?",
      correctAnswer: "Yes",
    },
    {
      question: "Is it ethical to use AI-generated content without crediting the original creator?",
      correctAnswer: "No",
    },
    {
      question: "Is it ethical to punish students for speaking against school policies?",
      correctAnswer: "No",
    },
    {
      question: "Is stealing always morally wrong, even in extreme survival situations?",
      correctAnswer: "No",
    },
    {
      question: "Is it ethical for companies to prioritize profits over social responsibility?",
      correctAnswer: "No",
    },
    {
      question: "Should students be allowed to use AI tools like ChatGPT for academic work?",
      correctAnswer: "Yes",
    },
    {
      question: "Should students be required to report unethical behavior of their peers?",
      correctAnswer: "Yes",
    },
  ];

  return (
    <div className="bg-[#F3E8FF] min-h-screen">
      <h1 className="font-bold text-center text-3xl py-8">Flip the Card, Face the Choice</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {questions.map((item, index) => (
          <FlipCard key={index} question={item.question} correctAnswer={item.correctAnswer} />
        ))}
      </div>
    </div>
  );
};

export default FlipCards;

