import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically show the modal when the component mounts
    setIsOpen(true);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleProceed = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      {/* Background overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}

      {/* Modal */}
      <div
        className={`${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } transform transition-all duration-500 ease-in-out z-20 bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md`}
      >
        <div className="text-center text-white">
          <h1 className="md:text-2xl text-blue-300 text-md font-bold mb-4 animate__animated animate__fadeIn">
            Welcome to JAMBlock!
          </h1>
          <p className="text-justify pb-2">
            JamBlock is a platform designed to assist students in preparing for
            their WAEC, UTME, and JAMB exams. It offers access to past questions
            and answers, as well as potential future questions with timed
            practice sessions. This allows students to not only study but also
            practice answering questions under time constraints, enhancing their
            exam readiness.
          </p>
          <p className="text-sm text-blue-300 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            We’ve sent a verification link to your email. Please verify your
            email to proceed.
          </p>
          <button
            className="px-6 py-3 border border-2 bg-navy-600 hover:bg-blue-700 text-white rounded-md text-lg transition duration-200"
            onClick={handleProceed}
          >
            Visit Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
