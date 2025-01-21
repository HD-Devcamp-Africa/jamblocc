import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FeaturesCard() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    const cardElements = document.querySelectorAll(".card");
    cardElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      cardElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Postgres Database Card */}
          <motion.div
            className={`card border border-red-100 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              isHovered ? "shadow-md" : ""
            }`}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="p-6 rounded-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 0 1-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM4 21a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"
                  />
                </svg>
                <h2 className="ml-4 text-xl font-bold">Postgres Database</h2>
              </div>
              <p className="mt-2 text-gray-400">
                A powerful, open-source object-relational database system.
              </p>
            </div>
          </motion.div>
          {/* Node.js Server Card */}
          <motion.div
            className={`card border border-red-100 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              isHovered ? "shadow-md" : ""
            }`}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="p-6 rounded-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18"
                  />
                </svg>
                <h2 className="ml-4 text-xl font-bold">Node.js Server</h2>
              </div>
              <p className="mt-2 text-gray-400">
                A JavaScript runtime built on Chrome's V8 JavaScript engine.
              </p>
            </div>
          </motion.div>
          {/* React Frontend Card */}
          <motion.div
            className={`card border border-red-100 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              isHovered ? "shadow-md" : ""
            }`}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="p-6 rounded-lg">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <h2 className="ml-4 text-xl font-bold">React Frontend</h2>
              </div>
              <p className="mt-2 text-gray-400">
                A JavaScript library for building user interfaces.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default FeaturesCard;
