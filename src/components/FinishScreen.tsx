import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const percentagePoints = (points / maxPossiblePoints) * 100;
  const { width, height } = useWindowSize();

  let emoji;
  if (percentagePoints === 100) emoji = "🥇";
  if (percentagePoints >= 80 && percentagePoints < 100) emoji = "🎉";
  if (percentagePoints >= 50 && percentagePoints < 80) emoji = "🙃";
  if (percentagePoints > 0 && percentagePoints < 50) emoji = "🫣";
  if (percentagePoints === 0) emoji = "🤦‍♂️";

  return (
    <>
      {points === maxPossiblePoints && (
        <Confetti width={width} height={height} />
      )}
      <div className="screen">
        <div className="screen-content">
          <p className="result">
            <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
            {maxPossiblePoints} ({Math.ceil(percentagePoints)}%)
          </p>
          <p className="highscore">(Highscore: {highscore} points)</p>
        </div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restartQuiz" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
