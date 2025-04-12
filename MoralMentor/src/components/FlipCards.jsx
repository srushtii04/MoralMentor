import React, { useState } from "react";

// FlipCard Component
const FlipCard = ({ question, optionYes, optionNo, explanationYes, explanationNo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleClick = (answer) => {
    if (!isFlipped) {
      if (answer === optionYes) {
        setFeedback(`Yes — ${explanationYes}`);
      } else {
        setFeedback(`No — ${explanationNo}`);
      }
      setIsFlipped(true);
    }
  };

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
                handleClick(optionYes);
              }}
            >
              {optionYes}
            </button>
            <button
              className="bg-[#865CC7] text-white px-4 py-1 rounded shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(optionNo);
              }}
            >
              {optionNo}
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

// Shuffle Function
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Main Component
const FlipCards = () => {
  const [selectedTheme, setSelectedTheme] = useState("Campus & Academic Ethics");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const allQuestions = {
    "Campus & Academic Ethics": [
      {
        question: "Is it ethical to use AI tools like ChatGPT to complete assignments?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "When used for guidance, it supports learning—not replaces it.",
        explanationNo: "Using AI to directly complete assignments bypasses the learning process.",
      },
      {
        question: "Should students report peers who cheat on exams?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Academic integrity ensures a fair learning environment for all.",
        explanationNo: "Ignoring cheating undermines fairness and the value of education.",
      },
      {
        question: "Is it wrong to not intervene if you witness bullying on campus?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Silence can enable harm. Speaking up promotes safety.",
        explanationNo: "Ignoring bullying makes you complicit in the harmful behavior.",
      },
      {
        question: "Is protesting against unfair campus policies justified?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Student activism is part of democratic expression.",
        explanationNo: "Suppression of protest can infringe on freedom of expression.",
      },
      {
        question: "Is it ethical to share a friend’s notes without asking them?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Sharing notes with permission can be helpful for peers.",
        explanationNo: "Sharing someone else’s work without permission violates trust and consent.",
      },
      {
        question: "Is prioritizing grades over real learning ethical?",
        optionYes: "No",
        optionNo: "Yes",
        explanationYes: "True education is about understanding, not just scores.",
        explanationNo: "Focusing on grades can undermine the purpose of learning.",
      },
      {
        question: "Is using AI to fake a sick note unethical?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "It violates trust and exploits tech dishonestly.",
        explanationNo: "Faking illness undermines the integrity of your actions.",
      },
      {
        question: "Should you speak up if a professor shares biased views?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Raising concerns fosters inclusive, respectful spaces.",
        explanationNo: "Ignoring biased views allows harmful ideas to spread.",
      },
    ],

    "Digital & Technological Responsibility": [
      {
        question: "Is using AI to copy someone’s art style unethical?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "It can undermine creative authenticity and consent.",
        explanationNo: "Copying without permission exploits someone else's creativity.",
      },
      {
        question: "Should we avoid sharing memes with false information?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Even jokes can spread harmful misinformation.",
        explanationNo: "Sharing false memes contributes to the spread of fake news.",
      },
      {
        question: "Is doxxing someone justified if they’ve done wrong?",
        optionYes: "No",
        optionNo: "Yes",
        explanationYes: "Vigilante justice online can spiral out of control.",
        explanationNo: "Doxxing is a harmful act, regardless of circumstances.",
      },
      {
        question: "Is deleting negative comments about you ethical?",
        optionYes: "No",
        optionNo: "Yes",
        explanationYes: "Silencing criticism can be a form of manipulation.",
        explanationNo: "Negative feedback helps us grow and improve.",
      },
      {
        question: "Is tracking user behavior without consent ethical?",
        optionYes: "No",
        optionNo: "Yes",
        explanationYes: "Digital privacy is a fundamental right.",
        explanationNo: "Consent is key to maintaining ethical digital practices.",
      },
      {
        question: "Should AI influencers disclose they aren’t real people?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Transparency prevents manipulation and confusion.",
        explanationNo: "Hiding the nature of AI influencers can mislead followers.",
      },
      {
        question: "Is it okay to pirate software if you can't afford it?",
        optionYes: "No",
        optionNo: "Yes",
        explanationYes: "Ethics apply regardless of circumstance—seek alternatives.",
        explanationNo: "Piracy is a form of theft and harms the creators.",
      },
      {
        question: "Should companies be held responsible for AI bias?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Ethical tech demands accountability and fairness.",
        explanationNo: "Ignoring AI biases can perpetuate systemic inequalities.",
      },
    ],

    "Society, Sustainability & Global Justice": [
      {
        question: "Is buying from fast fashion brands unethical?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "It supports exploitative labor and environmental damage.",
        explanationNo: "Supporting sustainable fashion reduces harm to the planet.",
      },
      {
        question: "Is it wrong to throw away electronics that still work?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "E-waste harms the planet—reuse or recycle responsibly.",
        explanationNo: "Disposing of functioning electronics is wasteful and damaging.",
      },
      {
        question: "Should you stop buying from a company with unethical practices?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Consumer power can pressure companies to change.",
        explanationNo: "Buying from unethical companies fuels their practices.",
      },
      {
        question: "Is eating meat unethical due to environmental concerns?",
        optionYes: "No",
        optionNo: "Yes",
        explanationYes: "Ethics vary—mindful consumption is key.",
        explanationNo: "Excessive meat consumption contributes to environmental damage.",
      },
      {
        question: "Is using too many streaming services harming sustainability?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Data centers use energy—digital choices matter too.",
        explanationNo: "Excessive streaming can lead to higher carbon footprints.",
      },
      {
        question: "Should influencers disclose paid promotions always?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Honesty builds trust with followers.",
        explanationNo: "Transparency is key in maintaining ethical influence.",
      },
      {
        question: "Is ignoring political issues in other countries unethical?",
        optionYes: "Yes",
        optionNo: "No",
        explanationYes: "Global awareness is part of responsible citizenship.",
        explanationNo: "Apathy towards global issues neglects collective responsibility.",
      },
    ],
  };

  // Shuffle the questions when the theme is selected or reset
  const getShuffledQuestions = (theme) => {
    return shuffleArray(allQuestions[theme]);
  };

  const handleResetCards = () => {
    setShuffledQuestions(getShuffledQuestions(selectedTheme));
  };

  // Set the initial shuffled questions on theme change
  React.useEffect(() => {
    setShuffledQuestions(getShuffledQuestions(selectedTheme));
  }, [selectedTheme]);

  return (
    <div className="bg-[#F3E8FF] min-h-screen">
      <h1 className="font-bold text-center text-3xl py-8">Flip the Card, Face the Choice</h1>

      {/* Category Navigation Pills */}
      <div className="flex justify-center gap-4 my-4 flex-wrap">
        {Object.keys(allQuestions).map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
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
        {shuffledQuestions.map((card, index) => (
          <FlipCard key={index} {...card} />
        ))}
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
