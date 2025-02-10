import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="w-full bg-black text-white text-center py-2 rounded-md transition-all hover:bg-black/90 my-2">
      {children}
    </button>
  );
};
