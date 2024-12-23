// ErrorDisplay.jsx
import React from "react";

const ErrorDisplay = ({ error }) => {
  return error ? (
    <p className="text-red-500 mt-4" aria-live="polite">
      {error}
    </p>
  ) : null;
};

export default ErrorDisplay;
