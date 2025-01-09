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

  // useEffect(() => {
  //     if (account) {
  //         handleNextStep();
  //     } else {
  //         showPopup("Sign in to continue", 6000);
  //         // navigate("/");
  //     }
  // }, [account]);

  // const handleNextStep = () => {
  //     navigate("/test");
  // };

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
    <header className="bg-gray-800 shadow-md sticky top-0 z-10 font-roboto md:block lg:block hidden">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* <div className="text-xl font-bold text-purple-800">JAMBlock</div> */}
        <Link to="/">
          <img
            src="/public/images/logo.jpg"
            alt="JAMBlock Logo"
            className="h-20 rounded-md"
          />
        </Link>
        <ul className="hidden lg:flex space-x-8 text-gray-700">
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/questions">Past Questions</Link>
          </li>
          <li className="hover:text-purple-500 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="hidden lg:block">
          <ConnectButton
            client={clientId}
            connectButton={{
              label: "Sign in",
            }}
          />
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
            className="lg:hidden flex flex-col space-y-4 text-gray-700 px-6 py-4 bg-white shadow-lg"
          >
            <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
              <CiHome className="mr-2 text-2xl" /> <Link to="/">Home</Link>
            </li>
            <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
              <MdOutlineSpaceDashboard className="mr-2 text-2xl" />{" "}
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
              <FaBookReader className="mr-2 text-2xl" />{" "}
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
              <FaClipboardQuestion className="mr-2 text-2xl" />
              <Link to="/questions">Past Questions</Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
