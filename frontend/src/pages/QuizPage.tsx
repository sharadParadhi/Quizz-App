// File: src/pages/QuizPage.tsx
import React, { useEffect, useState } from 'react';
import Timer from '../component/Timer';
import type { Answer, Questions } from '../types/quiz';

interface Props {
  questions: Questions[];
  initialAnswers: Answer[];
  duration: number;
  onSubmit: (answers: Answer[]) => void;
}

const QuizPage: React.FC<Props> = ({
  questions,
  initialAnswers,
  duration,
  onSubmit,
}) => {
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === questions[current].id
          ? { ...a, selected: optionIndex }
          : a
      )
    );
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading quiz...
      </div>
    );
  }

  const q = questions[current];
  const selectedIndex =
    answers.find((a) => a.questionId === q.id)?.selected ?? -1;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
        {/* Header: Question & Timer */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Question {current + 1} / {questions.length}
          </h2>
          <Timer duration={duration} onTimeUp={handleSubmit} />
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <p className="text-lg text-gray-700">{q.text}</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ease-in-out shadow-sm
            ${
              selectedIndex === idx
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg'
                : 'bg-gray-50 text-gray-800 hover:bg-indigo-50 hover:scale-105'
            }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((prev) => prev - 1)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-medium shadow hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-2xl font-medium shadow hover:bg-green-700 transition-colors transform hover:scale-105"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setCurrent((prev) => prev + 1)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-medium shadow hover:bg-indigo-700 transition-colors transform hover:scale-105"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
