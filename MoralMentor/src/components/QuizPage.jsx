import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import QuizResult from "./QuizResult";

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const theme = searchParams.get("theme");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quiz?theme=${theme}`);
        setQuizData(res.data.questions || []);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    fetchQuiz();
  }, [theme]);

  useEffect(() => {
    if (time > 0 && !quizEnded) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 && !selectedOption) {
      handleNext(); // Auto move to next if time runs out
    }
  }, [time, quizEnded, selectedOption]);

  const handleAnswerClick = (key) => {
    if (selectedOption) return;

    const question = quizData[currentQuestion];
    const isCorrect = key === question.correctDecision;
    const selectedText = question.options[key];
    const correctText = question.options[question.correctDecision];
    const consequence = question[`consequence${key}`];

    setSelectedOption(key);

    setUserResponses([
      ...userResponses,
      {
        question: question.scenario,
        selectedAnswer: selectedText,
        correctAnswer: correctText,
        isCorrect,
        consequence,
      },
    ]);

    if (isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTime(20);
    } else {
      setQuizEnded(true);
    }
  };

  const handleQuit = () => setShowQuitModal(true);
  const cancelQuit = () => setShowQuitModal(false);
  const confirmQuit = () => navigate("/hub");

  if (!quizData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading quiz...
      </div>
    );
  }

  const current = quizData[currentQuestion];
  const totalQuestions = quizData.length;

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center p-4 sm:p-6 overflow-hidden">
      {/* Quit Confirmation Modal */}
      {showQuitModal && (
        <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md text-center shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quit Quiz?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to quit? Your progress will be lost.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelQuit}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmQuit}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition"
              >
                Yes, Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {!quizEnded ? (
        <>
          <div className="w-full max-w-4xl flex justify-between items-center text-sm sm:text-lg font-semibold mb-4">
            <span className="text-blue-700">
              Question: {currentQuestion + 1}/{totalQuestions}
            </span>
            <span
              className={`text-base sm:text-xl ${time <= 5 ? "text-red-600" : "text-green-600"}`}
            >
              00:{time < 10 ? `0${time}` : time}
            </span>
            <button
              onClick={handleQuit}
              className="text-red-600 hover:underline text-base sm:text-lg"
            >
              Quit
            </button>
          </div>

          <div className="bg-purple-500 text-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
            <p className="text-sm sm:text-lg md:text-xl leading-relaxed">
              {current.scenario}
            </p>
          </div>

          <div className="mt-6 w-full max-w-4xl space-y-4">
            {["A", "B"].map((key, index) => {
              const isCorrect = key === current.correctDecision;
              const isSelected = key === selectedOption;
              const baseClass =
                "w-full py-3 sm:py-4 md:py-5 rounded-lg shadow-md text-sm sm:text-lg md:text-xl";

              let bgColor = "bg-gray-100 hover:bg-gray-200 text-black";
              if (selectedOption) {
                if (isCorrect) {
                  bgColor = "bg-green-400 text-white";
                } else if (isSelected) {
                  bgColor = "bg-red-400 text-white";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(key)}
                  className={`${baseClass} ${bgColor}`}
                  disabled={!!selectedOption}
                >
                  {current.options[key]}
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <>
              <p className="mt-6 text-blue-600 font-semibold text-sm sm:text-lg md:text-xl">
                {current[`consequence${selectedOption}`]}
              </p>

              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md"
              >
                {currentQuestion < totalQuestions - 1 ? "Next" : "Finish"}
              </button>
            </>
          )}
        </>
      ) : (
        <QuizResult
          score={score}
          total={totalQuestions}
          userResponses={userResponses}
        />
      )}
    </div>
  );
};

export default QuizPage;
