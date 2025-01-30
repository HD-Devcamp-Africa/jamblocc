import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white p-3 my-3 mx-2 border border-purple-400 rounded-lg shadow-lg hover:shadow-xl items-center text-center transition-shadow  duration-300 h-40"
      // variants={contentVariants}
      initial="hidden"
      // animate={controls}
    >
      <div>
        <h4 className="text-black">This is the leaderboard Component</h4>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
