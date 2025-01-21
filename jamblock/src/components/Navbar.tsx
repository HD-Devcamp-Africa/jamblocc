import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookReader } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { ConnectButton } from "thirdweb/react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useActiveAccount } from "thirdweb/react";
// import Popup from "./Popup";
import { clientId } from "../client";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isConnected, setIsConnected] = useState<boolean>(false);
  const navigate = useNavigate();
  const account = useActiveAccount();

  const showPopup = (message: string, timeout: number = 3000): void => {
    const popup = document.createElement("div");
    popup.textContent = message;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";

    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px 40px";
    popup.style.backgroundColor = "white";
    popup.style.color = "#000";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    setTimeout(() => {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
    }, timeout);
  };

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-10 font-roboto md:block lg:block hidden  border-b">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* <div className="text-xl font-bold text-purple-800">JAMBlock</div> */}
        <Link to="/">
          <img
            src="/public/images/logo.jpg"
            alt="JAMBlock Logo"
            className="h-20 rounded-md"
          />
        </Link>
        <ul className="hidden lg:flex space-x-8 font-bold text-gray-200">
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            {account ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <span onClick={() => showPopup("Kindly sign in", 2000)}>
                Dashboard
              </span>
            )}
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/questions">Past Questions</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="hidden lg:block">
          {/* <ConnectButton
            client={clientId}
            connectButton={{
              label: "Sign in",
            }}
          /> */}
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden px-4 py-4 bg-purple-800 text-white rounded"
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
            className="lg:hidden flex flex-col space-y-4 text-gray-700 px-6 py-4 bg-white shadow-lg rounded-lg"
          >
            <li className="group hover:bg-purple-100 transition duration-300 ease-in-out rounded-lg">
              <Link
                to="/"
                className="flex items-center space-x-3 py-2 px-4 text-gray-800 font-semibold rounded-lg group-hover:bg-purple-200 transition-all"
              >
                <CiHome className="text-2xl text-gray-600 group-hover:text-purple-500 transition-all" />
                <span className="group-hover:text-purple-500">Home</span>
              </Link>
            </li>
            <li className="group hover:bg-purple-100 transition duration-300 ease-in-out rounded-lg">
              <div
                className="flex items-center space-x-3 py-2 px-4 text-gray-800 font-semibold rounded-lg group-hover:bg-purple-200 transition-all cursor-pointer"
                onClick={() => {
                  if (!account) {
                    showPopup("Kindly sign in", 2000);
                  }
                }}
              >
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-purple-500 transition-all" />
                <span className="group-hover:text-purple-500">
                  {account ? "Dashboard" : "Please Sign In"}
                </span>
              </div>
            </li>
            <li className="group hover:bg-purple-100 transition duration-300 ease-in-out rounded-lg">
              <Link
                to="/about"
                className="flex items-center space-x-3 py-2 px-4 text-gray-800 font-semibold rounded-lg group-hover:bg-purple-200 transition-all"
              >
                <FaBookReader className="text-2xl text-gray-600 group-hover:text-purple-500 transition-all" />
                <span className="group-hover:text-purple-500">About</span>
              </Link>
            </li>
            <li className="group hover:bg-purple-100 transition duration-300 ease-in-out rounded-lg">
              <Link
                to="/questions"
                className="flex items-center space-x-3 py-2 px-4 text-gray-800 font-semibold rounded-lg group-hover:bg-purple-200 transition-all"
              >
                <FaClipboardQuestion className="text-2xl text-gray-600 group-hover:text-purple-500 transition-all" />
                <span className="group-hover:text-purple-500">
                  Past Questions
                </span>
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
