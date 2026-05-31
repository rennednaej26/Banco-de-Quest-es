export type QuestionAttemptHistory = {
  id: string;
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  answeredAt: string;
};
