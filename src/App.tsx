import { useEffect, useReducer } from "react";
import type { State, Action } from "./types/types";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

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

function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
