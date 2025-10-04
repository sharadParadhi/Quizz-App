// File: src/App.tsx
import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import API from './services/api';
import type { Answer, Questions, QuizResult } from './types/quiz';

const App: React.FC = () => {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const handleStart = async () => {
    try {
      const res = await API.get('/quiz');
      setQuestions(res.data.questions);
      setDuration(res.data.quizDuration);
      setUserAnswers(
        res.data.questions.map((q: Questions) => ({
          questionId: q.id,
          selected: -1,
        }))
      );
      setStep('quiz');
    } catch (err) {
      console.error(err);
      alert('Failed to load quiz');
    }
  };

  const handleSubmit = async (answers: Answer[]) => {
    try {
      const res = await API.post('/quiz/submit', { answers });
      setResult(res.data);
      setUserAnswers(answers);
      setStep('result');
    } catch (err) {
      console.error(err);
      alert('Failed to submit quiz');
    }
  };

  const handleRetry = () => {
    setResult(null);
    setUserAnswers(questions.map((q) => ({ questionId: q.id, selected: -1 })));
    setStep('quiz');
  };

  return (
    <>
      {step === 'start' && <StartPage onStart={handleStart} />}
      {step === 'quiz' && (
        <QuizPage
          questions={questions}
          initialAnswers={userAnswers}
          duration={duration}
          onSubmit={handleSubmit}
        />
      )}
      {step === 'result' && result && (
        <ResultPage
          result={result}
          questions={questions}
          userAnswers={userAnswers}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default App;
