import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([
    { name: "Shreya", points: 150 },
    { name: "Amit", points: 120 },
    { name: "Neha", points: 110 },
    { name: "Rahul", points: 100 },
    { name: "Priya", points: 95 },
  ]);

  return (
    <div className="bg-purple-200 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-3xl">
      <ul className="mt-4">
        {leaders.map((leader, index) => (
          <li
            key={index}
            className={`p-2 flex justify-between rounded-md ${
              index === 0 ? "bg-yellow-300 text-gray-900 font-bold" : "bg-white"
            } mb-2`}
          >
            <span>{index + 1}. {leader.name}</span>
            <span>{leader.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
