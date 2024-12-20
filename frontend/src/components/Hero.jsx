import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 text-center">
      <div className="container mx-auto px-6">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          Ace Your Exams with{" "}
          <span className="bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
            JAMBlock
          </span>
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 text-lg md:text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Get access to curated past questions and study resources tailored for
          JAMB students.
        </motion.p>
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="/waitlist"
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded shadow-md hover:bg-purple-700"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
