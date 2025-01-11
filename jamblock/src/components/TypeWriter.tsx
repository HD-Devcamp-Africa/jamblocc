import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

type TypewriterProps = {
  onComplete: () => void;
  isConnected: boolean;
};

const Typewriter: React.FC<TypewriterProps> = ({ onComplete, isConnected }) => {
  const [text, setText] = useState("");
  const fullText = "Hey Welcome to Jamblock";
  const typingSpeed = 5;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) return;

    let timeout: NodeJS.Timeout;
    if (text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + fullText[prev.length]);
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        onComplete();
        navigate("/dashboard");
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [text, fullText, onComplete, navigate, isConnected]);

  if (!isConnected) return null;

  return (
    <Modal
      isOpen={true}
      contentLabel="Typewriter Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          background: "transparent",
          border: "none",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <h1 className="md:text-4xl text-md font-bold text-white">{text}</h1>
    </Modal>
  );
};

export default Typewriter;
