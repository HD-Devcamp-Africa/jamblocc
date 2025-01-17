import React from "react";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    option: { [key: string]: string };
    answer: string;
    section: string;
    image: string;
    solution: string | JSX.Element;
    examtype: string;
    examyear: string;
    questionNub: number | null;
    hasPassage: number;
    category: string;
  };
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const [showSolution, setShowSolution] = React.useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const toggleSolution = () => {
    setShowSolution((prev) => !prev);
  };

  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white">
      <h3 className="text-lg font-semibold mb-2">
        {index}. {question.question}
      </h3>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Subject:</strong> {question.examtype}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Category:</strong> {question.category} - {question.examyear}
      </p>
      {question.image && (
        <img
          src={question.image}
          alt="question illustration"
          className="mb-4"
        />
      )}
      <div className="options space-y-2">
        {Object.entries(question.option).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleOptionClick(key)}
            className={`block w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
              selectedOption === key
                ? key === question.answer
                  ? "bg-green-600 text-white"
                  : "bg-red-700 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={toggleSolution}
          className="text-sm bg-blue-500 text-white py-2 px-4 rounded"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
            className="mt-2"
          >
            <p className="text-sm text-gray-500">
              <strong>Solution:</strong> {question.solution}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
