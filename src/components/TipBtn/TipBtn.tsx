import { FC, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { amountActions, RootState } from "../../store/index";

interface ButtonProp {
  text: string;
  value: number;
  isCustomed: boolean;
}

const TipBtn: FC<ButtonProp> = ({ text, value, isCustomed }) => {
  const dispatch = useDispatch();
  const amount = useSelector((state: RootState) => state.amount);

  const handleValue = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(amountActions.handleTipSelector(value));
  };

  return (
    <>
      {isCustomed ? (
        <button
          className="w-32 h-16 rounded bg-sky-200 active:bg-teal-500"
          onClick={handleValue}
        >
          <p className="text-cyan-900 font-bold text-xl active:text-cyan-900">
            {text}
          </p>
        </button>
      ) : (
        <button
          className={`w-32 h-16 rounded ${
            amount.selectTipAmount === value ? "bg-teal-500 " : "bg-cyan-900"
          }`}
          onClick={handleValue}
        >
          <p
            className={`font-bold text-xl ${
              amount.selectTipAmount === value ? "text-cyan-900 " : "text-white"
            } `}
          >
            {text}
          </p>
        </button>
      )}
    </>
  );
};

export default TipBtn;
