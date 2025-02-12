import React from "react";

interface ButtonProps {
  children:  React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="w-full bg-black text-white text-center py-2 rounded-md transition-all hover:bg-black/90 my-2">
      {children}
    </button>
  );
};
