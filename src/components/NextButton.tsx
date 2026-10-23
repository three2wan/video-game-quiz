import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { index, answer, numQuestions, dispatch } = useQuiz();

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
