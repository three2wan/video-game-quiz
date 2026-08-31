import { type Dispatch } from "react";
import type { Action } from "../types/types";

interface NextButtonProps {
  dispatch: Dispatch<Action>;
  answer: string;
  index: number;
  numQuestions: number;
}

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
  if (answer === "") return "";

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish Quiz
      </button>
    );
}

export default NextButton;
