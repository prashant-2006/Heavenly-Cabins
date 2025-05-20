import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p className="text-xs text-red-600 mt-1">{message}</p>
  );
};

export default ErrorMessage;
