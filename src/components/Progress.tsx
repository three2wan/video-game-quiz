interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: string;
}

function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== "")} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
