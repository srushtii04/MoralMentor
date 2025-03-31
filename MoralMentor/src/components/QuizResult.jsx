import { PieChart, Pie, Cell, Tooltip } from "recharts";

const QuizResult = ({ score, total, userResponses }) => {
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
    </div>
  );
};

export default QuizResult;
