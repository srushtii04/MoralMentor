import { useState } from "react";

const QuizPage = () => {
  const [time, setTime] = useState(20); 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl flex justify-between items-center text-sm sm:text-lg font-semibold mb-4">
        <span className="text-blue-700">Question: 1/10</span>
        <span className="text-green-600 text-base sm:text-xl">
          00:{time < 10 ? `0${time}` : time}
        </span>
        <button className="text-red-600 hover:underline text-base sm:text-lg">Quit</button>
      </div>
      <div className="bg-purple-500 text-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <p className="text-sm sm:text-lg md:text-xl leading-relaxed">
          You discover that your best friend Emily has an incredible talent for drawing. 
          She's been secretly entering art competitions and winning prizes but hasn't told anyone 
          because she's afraid of being judged for being different. She begs you not to tell anyone about her talent 
          because she's not ready for the attention.
        </p>
      </div>
      <div className="mt-6 w-full max-w-4xl space-y-4">
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 sm:py-4 md:py-5 rounded-lg shadow-md text-sm sm:text-lg md:text-xl">
          Would you respect her wishes and keep her secret?
        </button>
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 sm:py-4 md:py-5 rounded-lg shadow-md text-sm sm:text-lg md:text-xl">
          Would you try to convince her to embrace her talent and share it with the world?
        </button>
      </div>
      <p className="mt-6 text-green-600 font-semibold text-sm sm:text-lg md:text-xl">
        Points Awarded: 1
      </p>
    </div>
  );
};

export default QuizPage;
