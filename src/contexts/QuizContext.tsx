import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { State, Action, QuizContextType } from "../types/types";

interface QuizProviderProps {
  children: ReactNode;
}

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: "",
  points: 0,
  highscore: 0,
  remainingSeconds: null,
};

const difficultyPoints = {
  easy: 10,
  medium: 20,
  hard: 30,
} as const;

const SECS_PER_QUESTION = 30;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correct_answer
            ? state.points + difficultyPoints[question.difficulty]
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: "" };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      return { ...initialState, highscore: state.highscore, status: "loading" };

    case "tick":
      return {
        ...state,
        remainingSeconds:
          state.remainingSeconds === null ? null : state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

// 1) Create a context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

function QuizProvider({ children }: QuizProviderProps) {
  const [
    { questions, status, index, answer, points, highscore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (sum, question) => sum + difficultyPoints[question.difficulty],
    0,
  );

  useEffect(() => {
    if (status !== "loading") return;

    fetch("https://opentdb.com/api.php?amount=15&type=multiple&category=15")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data.results }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, [status]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingSeconds,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");

  return context;
}

export { QuizProvider, useQuiz };
