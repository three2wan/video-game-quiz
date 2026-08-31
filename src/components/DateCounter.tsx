import { useReducer } from "react";

const initState = { count: 0, step: 1 };

type State = typeof initState;
type Action =
  | { type: "inc" }
  | { type: "dec" }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number }
  | { type: "reset" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initState;
    default:
      throw new Error("Unknown action");
  }
}

export default function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { count, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleReset() {
    dispatch({ type: "reset" });
  }

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) =>
            dispatch({ type: "setCount", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <div>
        <span>
          {count === 0
            ? "Today is a "
            : count > 0
              ? `${count} days from today is `
              : `${Math.abs(count)} days ago is `}
        </span>
        {date.toDateString()}
      </div>
      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
