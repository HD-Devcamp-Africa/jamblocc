import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

type TypewriterProps = {
    onComplete: () => void; // Callback function to call when typing is complete
};

const Typewriter: React.FC<TypewriterProps> = ({ onComplete }) => {
    const [text, setText] = useState(""); // State for the current text
    const fullText = "Hey Welcome to Jamblock"; // Full text to display
    const typingSpeed = 20; // Speed of typing in milliseconds
    const navigate = useNavigate();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (text.length < fullText.length) {
            timeout = setTimeout(() => {
                setText((prev) => prev + fullText[prev.length]);
            }, typingSpeed);
        } 
        // else {
            // Call the callback function after a short delay
            setTimeout(() => {
                onComplete();
                navigate("/");
            }, 1000);
        // }
        return () => clearTimeout(timeout);
    }, [text, fullText, onComplete, navigate]);

    return (
        <Modal
            isOpen={true}
            contentLabel="Typewriter Modal"
            className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-800 text-white"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <h1 className="md:text-4xl text-md font-bold">{text}</h1>
        </Modal>
    );
};

export default Typewriter;