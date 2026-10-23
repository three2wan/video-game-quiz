import { useMemo } from "react";
import { useQuiz } from "../contexts/QuizContext";

function decodeHtml(html: string): string {
  const document = new DOMParser().parseFromString(html, "text/html");
  return document.documentElement.textContent ?? "";
}

// Fisher-Yates algorithm
function shuffle(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Question() {
  const { questions, index, answer, dispatch } = useQuiz();
  const question = questions.at(index);

  console.log(question);

  // shuffle the options
  const options = useMemo(
    () =>
      question
        ? shuffle([question.correct_answer, ...question.incorrect_answers])
        : [],
    [question],
  );
  const hasAnswered = answer !== "";

  if (!question) return null;

  return (
    <div className="question">
      <h4>{decodeHtml(question.question)}</h4>
      <div className="options">
        {options.map((option) => (
          <button
            className={`btn btn-option ${option === answer ? "answer" : ""} ${hasAnswered ? (option === question.correct_answer ? "correct" : "wrong") : ""}`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: option })}
          >
            {decodeHtml(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
