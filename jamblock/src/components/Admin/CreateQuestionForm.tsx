// CreateQuestionForm.tsx
import React, { useState } from "react";
import { FiSave } from "react-icons/fi";

const CreateQuestionForm: React.FC = () => {
  const [questionData, setQuestionData] = useState({
    subject: "",
    question: "",
    option: { a: "", b: "", c: "", d: "", e: "" },
    answer: "",
    solution: "",
    examtype: "",
    examyear: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field.startsWith("option.")) {
      const key = field.split(".")[1];
      setQuestionData((prev) => ({
        ...prev,
        option: { ...prev.option, [key]: e.target.value },
      }));
    } else {
      setQuestionData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Data:", questionData);
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={questionData.subject}
            onChange={(e) => handleChange(e, "subject")}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
            placeholder="e.g., Mathematics"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Question</label>
          <textarea
            value={questionData.question}
            onChange={(e) => handleChange(e, "question")}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
            placeholder="Enter the question here"
            required
          ></textarea>
        </div>

        {Object.entries(questionData.option).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">
              Option {key.toUpperCase()}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e, `option.${key}`)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
              placeholder={`Enter option ${key.toUpperCase()}`}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Answer</label>
          <input
            type="text"
            value={questionData.answer}
            onChange={(e) => handleChange(e, "answer")}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
            placeholder="e.g., c"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Solution</label>
          <textarea
            value={questionData.solution}
            onChange={(e) => handleChange(e, "solution")}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
            placeholder="Explain the solution"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Exam Type</label>
            <input
              type="text"
              value={questionData.examtype}
              onChange={(e) => handleChange(e, "examtype")}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
              placeholder="e.g., UTME"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Exam Year</label>
            <input
              type="text"
              value={questionData.examyear}
              onChange={(e) => handleChange(e, "examyear")}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
              placeholder="e.g., 2014"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow flex items-center"
          >
            <FiSave className="mr-2" /> Save Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
