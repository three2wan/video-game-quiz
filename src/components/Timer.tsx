import { useEffect } from "react";
import type { Dispatch } from "react";
import type { Action } from "../types/types";

interface TimerProps {
  dispatch: Dispatch<Action>;
  remainingSeconds: number | null;
}

function Timer({ dispatch, remainingSeconds }: TimerProps) {
  if (remainingSeconds === null) return null;

  const mins = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
