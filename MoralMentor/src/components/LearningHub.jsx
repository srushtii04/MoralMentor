import React from "react";
import { useNavigate } from "react-router-dom";

const LearningHub = () => {
  const navigate = useNavigate();

  const themes = [
    { icon: "🤝", label: "Loyalty" },
    { icon: "🗣️", label: "Honesty" },
    { icon: "😈", label: "Cheating" },
    { icon: "🧑‍🦱", label: "Personal Values" },
    { icon: "🍷", label: "Alcoholism" },
    { icon: "❌", label: "Misconduct" },
    { icon: "⚖️", label: "Fairness" },
    { icon: "📋", label: "Responsibility" },
    { icon: "🫂", label: "Friendship" },
    { icon: "🚫", label: "Bullying" },
    { icon: "👔", label: "Societal Expectations" },
    { icon: "🗨", label: "Integrity dilemma" },
    { icon: "🟰", label: "Equality" },
    { icon: "📜", label: "Plagiarism" },
    { icon: "🙅", label: "Good touch bad touch" },
  ];

  return (
    <div className="bg-[#F3E8FF] min-h-screen px-4 py-8">
      <h2 className="font-semibold text-center pt-2">Learning Hub - Explore Ethical Concepts</h2>
      <h2 className="font-semibold text-center">Quick, engaging lessons to enhance your moral reasoning</h2>
      <h1 className="font-bold text-center pt-5 text-xl">Choose a theme to explore!</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10 justify-items-center">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="cursor-pointer flex items-center justify-center px-4 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8] rounded-md shadow"
            onClick={() => navigate(`/quiz?theme=${encodeURIComponent(theme.label)}`)}
          >
            <span className="mr-2">{theme.icon}</span>
            <span>{theme.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningHub;
