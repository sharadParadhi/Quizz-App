export interface Questions {
  id: number;
  text: string;
  options: string[];
}

export interface Answer {
  questionId: number;
  selected: number;
}

export interface QuizResult {
  score: number;
  total: number;
  results: { questionId: number; correct: boolean }[];
}
