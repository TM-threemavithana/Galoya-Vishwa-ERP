import React from "react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
