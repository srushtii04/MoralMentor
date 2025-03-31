import { useState, useEffect } from "react";
import DebateCard from "./DebateCard";
import SubmitDilemma from "./SubmitDilemma";
import Leaderboard from "./Leaderboard";

const DebatePage = () => {
  const [debates, setDebates] = useState([]);
  const [currentDebate, setCurrentDebate] = useState(0);

  useEffect(() => {
    fetch("/api/debates") // Fetch debates from backend
      .then((res) => res.json())
      .then((data) => setDebates(data));
  }, []);

  return (
    <div className="min-h-screen bg-lilac text-white flex flex-col items-center p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-6">
        Live Ethical Debates 🎤
      </h1>

      {debates.length > 0 && (
        <DebateCard
          debate={debates[currentDebate]}
          onNext={() => setCurrentDebate((prev) => (prev + 1) % debates.length)}
        />
      )}

      <SubmitDilemma />
      <Leaderboard />
    </div>
  );
};

export default DebatePage;
