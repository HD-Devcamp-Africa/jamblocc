// InputForm.jsx
import React from "react";

const InputForm = ({ formData, handleInputChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="year"
        >
          Year
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Year"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="examType"
        >
          Exam Type
        </label>
        <input
          type="text"
          id="examType"
          name="examType"
          value={formData.examType}
          onChange={handleInputChange}
          className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter Exam Type"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? "Fetching..." : "Fetch Data"}
      </button>
    </form>
  );
};

export default InputForm;
