import { useState, useEffect } from "react";
import VoteResults from "./VoteResults";
import CommentSection from "./CommentSection";

const DebateCard = ({ debate, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState({ optionA: 50, optionB: 50 }); // Dummy values
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleVote = (option) => {
    setSelectedOption(option);
    fetch("/api/vote", {
      method: "POST",
      body: JSON.stringify({ debateId: debate._id, choice: option }),
    }).then((res) => res.json()).then((data) => setVotes(data));
  };

  return (
    <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
      <p className="text-lg sm:text-xl">{debate.question}</p>
      
      <div className="mt-4 space-y-3">
        <button 
          onClick={() => handleVote("A")} 
          className={`w-full py-3 rounded-lg shadow-md ${
            selectedOption === "A" ? "bg-purple-700" : "bg-purple-300 hover:bg-purple-400"
          }`}
        >
          {debate.optionA}
        </button>
        
        <button 
          onClick={() => handleVote("B")} 
          className={`w-full py-3 rounded-lg shadow-md ${
            selectedOption === "B" ? "bg-purple-700" : "bg-purple-300 hover:bg-purple-400"
          }`}
        >
          {debate.optionB}
        </button>
      </div>

      <p className="mt-4 text-sm sm:text-md">⏳ Time left: {timer}s</p>

      {selectedOption && <VoteResults votes={votes} />}
      
      <CommentSection debateId={debate._id} />

      <button 
        onClick={onNext} 
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
      >
        Next Debate
      </button>
    </div>
  );
};

export default DebateCard;
