import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold text-purple-800 ">JAMBlock</div>
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <li className="hover:text-purple-500 cursor-pointer">Home</li>
          <li className="hover:text-purple-500 cursor-pointer">Features</li>
          <li className="hover:text-purple-500 cursor-pointer">About</li>
          <li className="hover:text-purple-500 cursor-pointer">Contact</li>
        </ul>
        <button
          onClick={toggleMenu}
          className="md:hidden px-4 py-2 bg-purple-600 text-white rounded"
        >
          {isOpen ? <FaTimes /> : <FaBarsStaggered />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            className="md:hidden flex flex-col space-y-4 text-gray-700 px-6 py-4"
          >
            <li className="hover:text-purple-500 cursor-pointer hover:underline ">
              Home
            </li>
            <li className="hover:text-purple-500 cursor-pointer hover:underline ">
              Features
            </li>
            <li className="hover:text-purple-500 cursor-pointer hover:underline ">
              About
            </li>
            <li className="hover:text-purple-500 cursor-pointer hover:underline ">
              Contact
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
