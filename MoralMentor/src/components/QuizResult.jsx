// QuizResult.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const QuizResult = ({ score, total, userResponses }) => {
  const navigate = useNavigate();

  // Debug logs to check the props
  console.log("Score:", score);
  console.log("Total:", total);
  console.log("User Responses:", userResponses);

  // If data is missing, show a message prompting to take the quiz
  if (score === undefined || total === undefined || !userResponses) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3E8FF] text-center px-4">
        <p className="text-xl font-semibold mb-4">No result data available. Please take the quiz.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Go to Quiz
        </button>
      </div>
    );
  }

  const data = [
    { name: "Correct", value: score, color: "#4CAF50" },
    { name: "Incorrect", value: total - score, color: "#F44336" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Score: {score}/{total}</h2>

      <PieChart width={200} height={200}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <h3 className="text-xl font-semibold text-gray-600 mt-6">Quiz Summary</h3>
      <table className="mt-4 border-collapse border border-gray-300 w-full max-w-3xl text-sm sm:text-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Question</th>
            <th className="border p-2">Your Answer</th>
            <th className="border p-2">Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {userResponses.map((response, index) => (
            <tr key={index} className="text-gray-700">
              <td className="border p-2">{response.question}</td>
              <td className={`border p-2 ${response.isCorrect ? "text-green-600" : "text-red-600"}`}>
                {response.selectedAnswer}
              </td>
              <td className="border p-2">{response.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default QuizResult;
