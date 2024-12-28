import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaQuestionCircle,
  FaCheckCircle,
  FaRegCalendarAlt,
} from "react-icons/fa";

interface QuestionCardProps {
  item: {
    id: number;
    question: string;
    option: { [key: string]: string };
    answer: string;
    section: string;
    image: string;
    solution: string;
    examtype: string;
    examyear: string;
    category: string;
  };
  subject: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ item, subject }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const childVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      className="mt-6 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full sm:w-96 h-auto sm:h-auto"
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-4"
        variants={childVariants}
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {subject} - {item.examtype} ({item.examyear})
        </h3>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaQuestionCircle />
          <span className="text-base sm:text-lg">Question #{item.id}</span>
        </div>
      </motion.div>

      {/* Question */}
      <motion.div className="text-center mb-6" variants={childVariants}>
        <p className="text-lg sm:text-xl font-semibold text-gray-800">
          {item.question}
        </p>
      </motion.div>

      {/* Options */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        variants={childVariants}
      >
        {Object.keys(item.option).map((key) => (
          <div
            key={key}
            className="p-4 bg-purple-100 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-purple-200 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-semibold text-gray-700">
                {key.toUpperCase()}.
              </span>
              <span className="text-base sm:text-lg text-gray-600">
                {item.option[key]}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Answer */}
      <motion.div className="mb-6" variants={childVariants}>
        <div className="flex items-center space-x-2">
          <span className="text-base sm:text-lg font-semibold text-gray-700">
            Correct Answer:
          </span>
          <span className="text-base sm:text-lg font-bold text-green-600">
            {item.answer.toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* Metadata */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-500"
        variants={childVariants}
      >
        <div>
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-2 text-purple-600" />
            <span className="font-semibold">Exam Year:</span> {item.examyear}
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <FaCheckCircle className="mr-2 text-purple-600" />
            <span className="font-semibold">Category:</span> {item.category}
          </div>
        </div>
      </motion.div>

      {/* Section */}
      <motion.div className="mt-4 text-xs sm:text-sm" variants={childVariants}>
        <p className="text-gray-700">
          <strong>Section:</strong> {item.section}
        </p>
      </motion.div>

      {/* Solution */}
      {item.solution && (
        <motion.div
          className="mt-4 text-xs sm:text-sm"
          variants={childVariants}
        >
          <h4 className="text-base sm:text-lg font-semibold text-gray-800">
            Solution
          </h4>
          <p className="text-gray-600">{item.solution}</p>
        </motion.div>
      )}

      {/* Image */}
      {item.image && (
        <motion.div className="mt-4" variants={childVariants}>
          <img
            src={item.image}
            alt="Question related"
            className="w-full h-auto rounded-md shadow-md"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
