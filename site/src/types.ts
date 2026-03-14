export interface TheorySection {
  title: string;
  body: string;      // plain text explanation
  code: string;      // TypeScript code example
}

export interface QuizOption {
  text: string;
  code?: string;
}

export interface QuizQuestion {
  question: string;
  code?: string;              // optional code snippet in the question
  options: QuizOption[];
  correctIndex: number;
  explanation: string;
}

export interface Challenge {
  title: string;
  description: string;
  starterCode: string;
  hints: string[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  theory: TheorySection[];
  quiz: QuizQuestion[];
  challenge: Challenge;
}

export interface Progress {
  quizBestScore: Record<string, number>;  // topicId -> best score out of 5
  practiceComplete: string[];             // topicId[]
  theoryRead: string[];                   // topicId[]
  streak: number;
  lastPracticed: string;                  // ISO date YYYY-MM-DD
}

export type TabId = 'theory' | 'quiz' | 'practice';
