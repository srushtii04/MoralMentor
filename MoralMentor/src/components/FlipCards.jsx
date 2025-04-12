import React, { useEffect, useState } from "react";

// FlipCard Component
const FlipCard = ({ question, correctAnswer, explanationCorrect, explanationIncorrect, cardKey, resetCounter }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleClick = (answer) => {
    if (!isFlipped) {
      if (answer === correctAnswer) {
        setFeedback(`Yes — ${explanationCorrect}`);
      } else {
        setFeedback(`No — ${explanationIncorrect}`);
      }
      setIsFlipped(true);
    }
  };

  useEffect(() => {
    setIsFlipped(false); // Reset flip state when resetCounter or cardKey changes
  }, [resetCounter, cardKey]);

  return (
    <div className="relative w-64 h-40 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full bg-[#E5D4FF] rounded-lg flex flex-col justify-center items-center backface-hidden shadow-lg">
          <p className="text-black text-center px-4 font-medium">{question}</p>
          <div className="mt-4 space-x-4">
            <button
              className="bg-[#865CC7] text-white px-4 py-1 rounded shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleClick("Yes");
              }}
            >
              Yes
            </button>
            <button
              className="bg-[#865CC7] text-white px-4 py-1 rounded shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleClick("No");
              }}
            >
              No
            </button>
          </div>
        </div>

        <div className="absolute w-full h-full bg-[#C9A7EB] rounded-lg flex justify-center items-center backface-hidden rotate-y-180 shadow-lg px-4">
          <p className="text-black text-center font-medium">{feedback}</p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const FlipCards = () => {
  const themes = [
    "Campus & Academic Ethics",
    "Digital and Technological Responsibility",
    "Society, Sustainability & Global Justice",
  ];

  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState({});
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [resetCounter, setResetCounter] = useState(0); // Track reset count

  const fetchQuestions = async (theme) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/flipcards/${encodeURIComponent(theme)}?skip=0&limit=8`
      );
      const data = await response.json();

      const questions = data[theme];

      if (Array.isArray(questions)) {
        setAllQuestions((prev) => ({ ...prev, [theme]: questions }));
      } else {
        console.warn("No questions found for theme:", theme);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const getNextSetOfQuestions = (theme) => {
    if (allQuestions[theme] && Array.isArray(allQuestions[theme])) {
      let questions = [...allQuestions[theme]];
      let availableQuestions = questions.filter((q) => !usedQuestions.includes(q));

      const randomCards = [];
      while (randomCards.length < 8) {
        if (availableQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          const selected = availableQuestions.splice(randomIndex, 1)[0];
          randomCards.push(selected);
          setUsedQuestions((prev) => [...prev, selected]);
        } else {
          const randomIndex = Math.floor(Math.random() * questions.length);
          randomCards.push(questions[randomIndex]);
        }
      }
      return randomCards;
    }
    return [];
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setUsedQuestions([]);
    setResetCounter((prev) => prev + 1); // Increment counter to reset cards
  };

  const handleResetCards = () => {
    setShuffledQuestions(getNextSetOfQuestions(selectedTheme));
    setResetCounter((prev) => prev + 1); // Increment counter to reset flip states
  };

  useEffect(() => {
    if (selectedTheme && !allQuestions[selectedTheme]) {
      fetchQuestions(selectedTheme);
    }
  }, [selectedTheme]);

  useEffect(() => {
    if (allQuestions[selectedTheme]) {
      setShuffledQuestions(getNextSetOfQuestions(selectedTheme));
    }
  }, [allQuestions, selectedTheme]);

  return (
    <div className="bg-[#F3E8FF] min-h-screen">
      <h1 className="font-bold text-center text-3xl py-8">Flip the Card, Face the Choice</h1>

      {/* Category Navigation */}
      <div className="flex justify-center gap-4 my-4 flex-wrap">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`px-4 py-1 rounded-full shadow-md font-medium ${
              selectedTheme === theme ? "bg-[#865CC7] text-white" : "bg-[#E5D4FF] text-black"
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Cards Display */}
      <div className="flex justify-center gap-8 flex-wrap p-4">
        {shuffledQuestions.length === 0 ? (
          <div>Loading questions...</div>
        ) : (
          shuffledQuestions.map((card, index) => (
            <FlipCard
              key={`${resetCounter}-${index}`} // Ensure each card resets on counter change
              {...card}
              cardKey={index} // Pass a unique key for each card
              resetCounter={resetCounter} // Pass the reset counter to trigger reset
            />
          ))
        )}
      </div>

      {/* Reset Cards Button */}
      <div className="flex justify-center py-6">
        <button
          onClick={handleResetCards}
          className="bg-[#865CC7] text-white px-6 py-2 rounded-full shadow-md text-lg"
        >
          Reset Cards
        </button>
      </div>
    </div>
  );
};

export default FlipCards;
