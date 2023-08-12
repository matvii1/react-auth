import { FC } from "react";
import {
  decrement,
  increment,
  incrementByAmount,
  useSelectValue,
} from "~/app/slices/counter";
import { useAppDispatch } from "./app/hooks";

const App: FC = () => {
  const counter = useSelectValue();
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-3 text-2xl font-bold">
        <h2 className="">Counter</h2>

        <p>{counter}</p>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-slate-400 p-3">
        <button
          className="rouneded-sm rounded-md border border-slate-500 bg-slate-100 p-4"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="rouneded-sm rounded-md border border-slate-500 bg-slate-100 p-4"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className="rouneded-sm rounded-md border border-slate-500 bg-slate-100 p-4"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          + 5
        </button>
      </div>
    </div>
  );
};

export default App;
