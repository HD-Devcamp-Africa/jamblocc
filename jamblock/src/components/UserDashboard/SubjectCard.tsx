import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ImBooks } from "react-icons/im";

interface SubjectCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  contentVariants: any;
  controls: any;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  contentVariants,
  controls,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-900 p-3 border border-purple-400 rounded-lg shadow-lg hover:shadow-xl items-center h-60 text-center transition-shadow duration-300"
      variants={contentVariants}
      initial="hidden"
      animate={controls}
    >
      <h3 className="md:text-md text-sm text-white font-semibold mb-4 lg:text-lg">
        {title}
      </h3>
      <div className="flex items-center justify-center text-center">
        <ImBooks className="h-10 w-10" />
      </div>
      <p className="text-white mb-4 text-sm md:text-base lg:text-lg">
        {} Questions
      </p>
      <button
        onClick={() => navigate(buttonLink)}
        className="bg-purple-800 text-white py-1 px-2  md:py-2 md:px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-md"
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default SubjectCard;
