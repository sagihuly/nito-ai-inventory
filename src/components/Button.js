import React from "react";

const Button = ({ children, onClick, selected }) => (
  <button
    className={`px-4 py-2 mr-2 mb-2 rounded ${
      selected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
