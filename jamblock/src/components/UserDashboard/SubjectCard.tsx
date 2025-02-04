import React from "react";
import { motion } from "framer-motion";
import { ImBooks } from "react-icons/im";

interface SubjectCardProps {
  title: string;
  contentVariants: any; // Define contentVariants prop
  controls: any; // Define controls prop
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  contentVariants,
  controls,
}) => {
  return (
    <motion.div
      className="bg-gray-900 p-3 border border-purple-400 rounded-lg shadow-lg hover:shadow-xl items-center h-60 text-center transition-shadow duration-300"
      variants={contentVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="flex flex-col items-center space-y-3">
        <ImBooks className="h-10 w-10 text-white" />
        <h3 className="text-white text-sm md:text-lg font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
};

export default SubjectCard;
