export type QuestionType = {
  type: "multiple";
  difficulty: "easy" | "medium" | "hard";
  category: "Entertainment: Video Games";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type State = {
  questions: QuestionType[];
  status: "loading" | "ready" | "error" | "active" | "finished";
  index: number;
  answer: string;
  points: number;
  highscore: number;
  remainingSeconds: null | number;
};

export type Action =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "newAnswer"; payload: string }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restartQuiz" }
  | { type: "tick" };
