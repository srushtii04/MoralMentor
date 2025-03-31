import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizData from "./QuizData";
import QuizResult from "./QuizResult";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNext();
    }
  }, [time]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setUserResponses([
      ...userResponses,
      {
        question: QuizData[currentQuestion].question,
        selectedAnswer: option.text,
        correctAnswer: QuizData[currentQuestion].options.find((opt) => opt.isCorrect).text,
        isCorrect: option.isCorrect,
        consequence: option.consequence
      }
    ]);

    if (option.isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTime(20);
    } else {
      setQuizEnded(true);
    }
  };

  const handleQuit = () => {
    navigate("/home");  
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 sm:p-6">
      {!quizEnded ? (
        <>
          {/* Header Section */}
          <div className="w-full max-w-4xl flex justify-between items-center text-sm sm:text-lg font-semibold mb-4">
            <span className="text-blue-700">Question: {currentQuestion + 1}/10</span>
            <span className={`text-base sm:text-xl ${time <= 5 ? "text-red-600" : "text-green-600"}`}>
              00:{time < 10 ? `0${time}` : time}
            </span>
            <button onClick={handleQuit} className="text-red-600 hover:underline text-base sm:text-lg">Quit</button>
          </div>

          {/* Question Box */}
          <div className="bg-purple-500 text-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
            <p className="text-sm sm:text-lg md:text-xl leading-relaxed">
              {QuizData[currentQuestion].question}
            </p>
          </div>

          {/* Options */}
          <div className="mt-6 w-full max-w-4xl space-y-4">
            {QuizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`w-full py-3 sm:py-4 md:py-5 rounded-lg shadow-md text-sm sm:text-lg md:text-xl 
                  ${selectedAnswer
                    ? option.isCorrect
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"}
                `}
                disabled={!!selectedAnswer}
              >
                {option.text}
              </button>
            ))}
          </div>

          {/* Consequence & Next Button */}
          {selectedAnswer && (
            <p className="mt-6 text-blue-600 font-semibold text-sm sm:text-lg md:text-xl">
              {selectedAnswer.consequence}
            </p>
          )}

          {selectedAnswer && (
            <button onClick={handleNext} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md">
              {currentQuestion < 9 ? "Next" : "Finish"}
            </button>
          )}
        </>
      ) : (
        <QuizResult score={score} total={10} userResponses={userResponses} />
      )}
    </div>
  );
};

export default QuizPage;
