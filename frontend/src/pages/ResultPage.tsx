// File: src/pages/ResultPage.tsx
import React from 'react';
import type { Answer, Questions, QuizResult } from '../types/quiz';

interface Props {
  result: QuizResult;
  questions: Questions[];
  userAnswers: Answer[];
  onRetry?: () => void;
}

const ResultPage: React.FC<Props> = ({
  result,
  questions,
  userAnswers,
  onRetry,
}) => {
  const mapById = (id: number) => questions.find((q) => q.id === id);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-200">
          {/* Header */}
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800 drop-shadow-md">
            🎉 Quiz Completed
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Your Score:{' '}
            <span className="font-semibold text-gray-900">{result.score}</span>{' '}
            / {result.total}{' '}
            {result.score > 4 ? (
              <span className="ml-2">🎉 Excellent! Keep it up!</span>
            ) : (
              <span className="ml-2">😟 You need more practice!</span>
            )}
          </p>

          {/* Review Section */}
          <div className="mt-6 text-left">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              Review
            </h2>
            <div className="space-y-4">
              {result.results.map((r, idx) => {
                const q = mapById(r.questionId);
                const ua = userAnswers.find(
                  (a) => a.questionId === r.questionId
                );
                const selectedText =
                  ua && ua.selected >= 0 && q
                    ? q.options[ua.selected]
                    : 'Not answered';

                return (
                  <div
                    key={r.questionId}
                    className={`p-5 rounded-2xl shadow-sm border transition-all duration-200 transform hover:scale-105
                  ${
                    r.correct
                      ? 'bg-green-100 border-green-300'
                      : 'bg-red-100 border-red-300'
                  }`}
                  >
                    <div className="font-semibold mb-1 text-gray-800">
                      Q{idx + 1}: {q?.text}
                    </div>
                    <div className="text-gray-700">
                      Your answer:{' '}
                      <span className="font-medium">{selectedText}</span>
                    </div>
                    <div className="mt-2 font-semibold text-gray-800">
                      {r.correct ? '✅ Correct' : '❌ Wrong'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Retry Button */}
            <div className="mt-10 text-center">
              <button
                onClick={onRetry}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-medium shadow hover:bg-indigo-700 hover:scale-105 transition-transform duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
