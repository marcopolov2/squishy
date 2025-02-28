import React, { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  intent?: string;
  disabled?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  intent = "primary",
  disabled,
  isLoading,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "shadow-md select-none items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all hover:cursor-pointer disabled:opacity-50 disabled:hover:cursor-not-allowed",
        intent === "primary"
          ? "border-none bg-gray-500 text-white text-xs hover:bg-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-400 disabled:hover:bg-blue-400"
          : "",
        intent === "secondary"
          ? "bg-[#f35c0b] text-white text-lg hover:bg-[#e68f60] disabled:hover:bg-[#e68f60] px-4 py-2 "
          : "",

        isLoading ? "pointer-events-none relative inline-flex" : "",
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className="left-2.5 h-3 w-3 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="white"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
