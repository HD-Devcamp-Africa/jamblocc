import React, { useState } from "react";
import { FaTimes, FaHome, FaInfoCircle, FaPhone, FaStar } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 font-roboto">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold text-purple-800">JAMBlock</div>
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="*">Features</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="*">About</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="*">Contact</Link>
          </li>
        </ul>
        <button
          onClick={toggleMenu}
          className="md:hidden px-4 py-2 bg-purple-600 text-white rounded"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.5 }}
            className="md:hidden flex flex-col space-y-4 text-gray-700 px-6 py-4 bg-white shadow-lg"
          >
            <li className="hover:text-purple-500 cursor-pointer hover:underline border-b py-2 flex items-center">
              <CiHome className="mr-2" /> <Link to="/">Home</Link>
            </li>
            <li className="hover:text-purple-500 cursor-pointer hover:underline border-b py-2 flex items-center">
              <FaStar className="mr-2" /> <Link to="*">Features</Link>
            </li>
            <li className="hover:text-purple-500 cursor-pointer hover:underline border-b py-2 flex items-center">
              <FaInfoCircle className="mr-2" /> <Link to="*">About</Link>
            </li>
            <li className="hover:text-purple-500 cursor-pointer hover:underline border-b py-2 flex items-center">
              <FaPhone className="mr-2" /> <Link to="*">Contact</Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
