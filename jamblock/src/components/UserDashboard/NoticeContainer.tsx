import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ImBooks } from "react-icons/im";

interface NoticeBoardProps {
  description: string;
  buttonText: string;
  buttonLink: string;
  contentVariants: any;
  controls: any;
  src: string;
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({
  description,
  buttonText,
  buttonLink,
  contentVariants,
  controls,
  src,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-900 p-3 my-3 mx-2 border border-purple-400 rounded-lg shadow-lg hover:shadow-xl items-center text-center transition-shadow  duration-300"
      variants={contentVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="flex items-center justify-center text-center ">
        <img
          src={src}
          alt="Notice Image"
          className="text-white h-20 w-20 rounded-lg"
        />

        <p className="md:text-sm text-sm text-center text-white ml-2 mb-4 lg:text-md">
          {description}
        </p>
      </div>

      <p className="text-white mb-4 text-sm md:text-sm lg:text-md">{}</p>
      <button
        onClick={() => navigate(buttonLink)}
        className="bg-purple-800 text-white py-1 px-2  md:py-2 md:px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-sm lg:text-md"
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default NoticeBoard;
