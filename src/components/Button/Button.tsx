import { FC, FormEvent } from "react";

type ButtonType = "button" | "submit" | "reset";

interface ButtonPropType {
  type: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonPropType> = ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      className="w-full h-16 font-bold text-xl rounded bg-teal-500 active:bg-teal-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
