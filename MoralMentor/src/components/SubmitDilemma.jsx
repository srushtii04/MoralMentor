import { useState } from "react";

const SubmitDilemma = ({ onSubmit }) => {
  const [dilemma, setDilemma] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dilemma.trim()) {
      onSubmit(dilemma);
      setDilemma(""); // Clear input after submission
    }
  };

  return (
    <div className="bg-purple-200 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Submit Your Ethical Dilemma</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-3 border rounded-md text-gray-800 focus:ring-2 focus:ring-purple-400"
          placeholder="Type your ethical dilemma here..."
          value={dilemma}
          onChange={(e) => setDilemma(e.target.value)}
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="mt-3 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitDilemma;
