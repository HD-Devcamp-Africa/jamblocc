// import React from "react";
// import { motion } from "framer-motion";

// interface QuestionCardProps {
//   question: {
//     id: number;
//     question: string;
//     option: { [key: string]: string };
//     answer: string;
//     examtype: string;
//     category: string;
//     image?: string; // Made optional for better handling
//     solution: string | JSX.Element;
//   };
//   index: number;
// }

// const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
//   const [selectedOption, setSelectedOption] = React.useState<string | null>(
//     null
//   );
//   const [showSolution, setShowSolution] = React.useState<boolean>(false);

//   const handleOptionClick = (option: string) => {
//     setSelectedOption(option);
//   };

//   const toggleSolution = () => {
//     setShowSolution((prev) => !prev);
//   };

//   return (
//     <div className="border p-3 md:p-5 rounded-lg shadow-lg bg-white">
//       <h3 className="text-sm md:text-lg font-semibold mb-1">
//         {index}. {question.question}
//       </h3>
//       <p className="text-xs md:text-sm text-gray-500 mb-1">
//         <strong>Subject:</strong> {question.examtype}
//       </p>
//       <p className="text-xs md:text-sm text-gray-500 mb-2">
//         <strong>Category:</strong> {question.category}
//       </p>
//       {question.image && (
//         <img
//           src={question.image}
//           alt="illustration"
//           className="mb-2 w-full h-auto"
//         />
//       )}
//       <div className="options space-y-1">
//         {Object.entries(question.option).map(([key, value]) => (
//           <button
//             key={key}
//             onClick={() => handleOptionClick(key)}
//             className={`block w-full text-left p-1.5 rounded-lg border transition-colors duration-200 ${
//               selectedOption === key
//                 ? key === question.answer
//                   ? "bg-green-600 text-white"
//                   : "bg-red-700 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {value}
//           </button>
//         ))}
//       </div>
//       <div className="mt-2">
//         <button
//           onClick={toggleSolution}
//           className="text-xs md:text-sm bg-blue-500 text-white py-1 px-2 rounded"
//         >
//           {showSolution ? "Hide Solution" : "Show Solution"}
//         </button>
//         {showSolution && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             transition={{ duration: 0.5 }}
//             className="mt-2"
//           >
//             <p className="text-xs md:text-sm text-gray-500">
//               <strong>Solution:</strong> {question.solution}
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;
import React from "react";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    option: { [key: string]: string };
    answer: string;
    examtype: string;
    category: string;
    image?: string; // Made optional for better handling
    solution: string | JSX.Element;
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

  // Helper function to format text (for solution and options)
  const formatText = (text: string) => {
    // Replace exponents (e.g., x^2) with <sup> tags for superscripting
    return text.replace(/(\d+)\^(\d+)/g, "$1<sup>$2</sup>");
  };

  return (
    <div className="border p-3 md:p-5 rounded-lg shadow-lg bg-white">
      <h3 className="text-sm md:text-lg font-semibold mb-1">
        {index}. {question.question}
      </h3>
      <p className="text-xs md:text-sm text-gray-500 mb-1">
        <strong>Subject:</strong> {question.examtype}
      </p>
      <p className="text-xs md:text-sm text-gray-500 mb-2">
        <strong>Category:</strong> {question.category}
      </p>
      {question.image && (
        <img
          src={question.image}
          alt="illustration"
          className="mb-2 w-full h-auto"
        />
      )}
      <div className="options space-y-1">
        {Object.entries(question.option).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleOptionClick(key)}
            className={`block w-full text-left p-1.5 rounded-lg border transition-colors duration-200 ${
              selectedOption === key
                ? key === question.answer
                  ? "bg-green-600 text-white"
                  : "bg-red-700 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span

            // dangerouslySetInnerHTML={{
            //   __html: formatText(value), // Apply formatting to options
            // }}
            >
              {value}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2">
        <button
          onClick={toggleSolution}
          className="text-xs md:text-sm bg-blue-500 text-white py-1 px-2 rounded"
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
            <p className="text-xs md:text-sm text-gray-500">
              <strong>Solution:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: formatText(question.solution as string),
                }}
              />
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
