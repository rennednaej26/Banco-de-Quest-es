export type Difficulty = "facil" | "media" | "dificil";
export type StudyMode = "estudo" | "simulado" | "revisao" | "flash";

export type Question = {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  board: string;
  role: string;
  year: number;
  difficulty: Difficulty;
  statement: string;
  alternatives: string[];
  answerIndex: number;
  explanation: string;
  tags: string[];
  imageUrl?: string;
  stats: {
    attempts: number;
    accuracy: number;
    avgTimeSeconds: number;
  };
};

export type Flashcard = {
  id: string;
  deck: string;
  subject: string;
  front: string;
  back: string;
  type: "basic" | "cloze";
  tags: string[];
  media?: {
    imageUrl?: string;
    audioUrl?: string;
  };
};

export type ReviewState = {
  itemId: string;
  itemType: "question" | "flashcard";
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
  dueAt: string;
  history: Array<{
    reviewedAt: string;
    quality: number;
    intervalDays: number;
    easeFactor: number;
  }>;
  accuracy: number;
};

export type Attempt = {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  elapsedSeconds: number;
  createdAt: string;
};
