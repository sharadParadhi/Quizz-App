// File: src/pages/StartPage.tsx
import React from 'react';

interface Props {
  onStart: () => void;
}

const StartPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 p-6">
      <div className="w-full max-w-xl text-center text-white bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          🧠 Online Quiz App
        </h1>
        <p className="mb-8 text-lg tracking-wide">
          Complete the quiz within the time limit. Good luck!
        </p>
        <button
          onClick={onStart}
          className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl shadow-xl hover:bg-indigo-50 hover:text-indigo-700 transform hover:scale-105 transition-all duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
