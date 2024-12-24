import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookReader } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import {ConnectButton} from "thirdweb/react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useActiveAccount } from "thirdweb/react";
import Popup from "./Popup";
import { client } from "../client";



const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const navigate = useNavigate();
const account = useActiveAccount();

    useEffect(() => {
        if (account) {
            handleNextStep();
        } else {
            showPopup("Sign in to continue", 6000);
            navigate("/")
        }
    }, [account]);

    const handleNextStep = () => {
        navigate("/test");
    };

    // popup.ts
const showPopup = (message: string, timeout: number = 3000): void => {
    // Create a popup element
    const popup = document.createElement('div');
    popup.textContent = message;

    // Create a shadow overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';

    // Style the popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px 40px';
    popup.style.backgroundColor = 'white';
    popup.style.color = '#000';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';

    // Append to the body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Remove after timeout
    setTimeout(() => {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    }, timeout);
}



    const toggleMenu = (): void => {
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
                        <Link to="*">Dashboard</Link>
                    </li>

                    <li className="hover:text-purple-500 cursor-pointer">
                        <Link to="/test">Past Questions</Link>
                    </li>
                    <li className="hover:text-purple-500 cursor-pointer">
                        <Link to="*">About</Link>
                    </li>
                    {/* <li className="hover:text-purple-500 cursor-pointer">
                        <Link to="*">Contact</Link>
                    </li> */}
                </ul>
                <div>
                <ConnectButton client={client}/>
            </div>
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
                        <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
                            <CiHome className="mr-2 text-2xl" /> <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
                            <MdOutlineSpaceDashboard className="mr-2  text-2xl" /> <Link to="/test">Dashboard</Link>
                        </li>
                        <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
                            <FaBookReader className="mr-2  text-2xl" /> <Link to="*">About</Link>
                        </li>

                        <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
                            <FaClipboardQuestion className="mr-2  text-2xl"/>
                            <Link to="/test">Past Questions</Link>
                        </li>

                        {/* <li className="hover:text-purple-500 font-bold cursor-pointer hover:underline border-b py-2 flex items-center">
                            <FaPhone className="mr-2  text-2xl" /> <Link to="*">Contact</Link>
                        </li> */}
                    </motion.ul>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
