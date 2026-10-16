import type { Dispatch } from "react";
import type { Action } from "../types/types";

interface StartScreenProps {
  numQuestions: number;
  dispatch: Dispatch<Action>;
}

function StartScreen({ numQuestions, dispatch }: StartScreenProps) {
  return (
    <div className="screen">
      <div className="screen-content">
        <h2>Welcome to Video Game's Quiz</h2>
        <h3>{numQuestions} questions to test your video games's knowledge</h3>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
