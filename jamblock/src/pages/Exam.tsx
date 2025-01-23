import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import QuizPlatformABI from "./QuizPlatformABI.json";
import { FaMoneyBillAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Define the types for the quiz questions and answers
interface Question {
  question: string;
  options: number[];
  correct: number;
}

interface Answers {
  [key: number]: number;
}

const contractAddress = "0x3131645cB713f1D5e5E7C36CF7AeDEc09DEa63bc";

const Exam: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "1 + 1 = ?", options: [2, 3, 4, 5], correct: 2 },
    { question: "2 + 2 = ?", options: [3, 4, 5, 6], correct: 4 },
    // Add more questions here...
  ]);
  const [answers, setAnswers] = useState<Answers>({});
  const [message, setMessage] = useState<string>("");

  // Timer states
  const [timer, setTimer] = useState<number>(60);
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false); // New state for result modal
  const [userName, setUserName] = useState<string>("John Doe"); // Example user name
  const [userImage, setUserImage] = useState<string>(
    "https://via.placeholder.com/150"
  ); // Example user image

  // Initialize provider and contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    QuizPlatformABI,
    signer
  );

  // Handle answer selection
  const handleAnswer = (index: number, selected: number): void => {
    setAnswers({ ...answers, [index]: selected });
  };

  // Submit quiz results to smart contract
  const submitQuiz = async (): Promise<void> => {
    if (intervalId) clearInterval(intervalId); // Stop the timer

    let correctCount = 0;

    // Check the answers
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correctCount++;
    });

    setScore(correctCount);

    if (correctCount === questions.length) {
      try {
        const tx = await contract.reportResults(correctCount); // Report correct answers
        await tx.wait();
        setMessage("Quiz submitted successfully! Rewards credited.");
      } catch (error) {
        console.error(error);
        setMessage(
          "Error: " + (error instanceof Error ? error.message : "Unknown error")
        );
      }
    } else {
      setMessage("You need to score all questions correctly to earn rewards.");
    }

    // Show result modal after submission
    setIsTestStarted(false);
    setIsResultModalOpen(true); // Open result modal
    setTimer(60); // Reset timer for next test
  };

  // Withdraw funds from the contract
  const withdrawFunds = async (): Promise<void> => {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setMessage("Withdrawal successful!");
    } catch (error) {
      console.error(error);
      setMessage(
        "Error: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  // Start the quiz and timer
  const startQuiz = () => {
    setIsModalOpen(false);
    setIsTestStarted(true);

    let countdown = timer;

    // Clear any existing interval before starting a new one
    if (intervalId) clearInterval(intervalId);

    const newIntervalId = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        setTimer(countdown);
      } else {
        clearInterval(newIntervalId);
        submitQuiz(); // Automatically submit when time is up
      }
    }, 1000);

    setIntervalId(newIntervalId); // Save interval ID for cleanup later
  };

  // Reset all states for a new test
  const resetTest = () => {
    if (intervalId) clearInterval(intervalId); // Stop any running timer

    setScore(0);
    setAnswers({});
    setMessage("");
    setTimer(60); // Reset timer to initial value
    setIsTestStarted(false);
    setIsModalOpen(true); // Show modal again for user info before starting a new test
  };

  // Handle return to dashboard logic (placeholder function)
  const returnToDashboard = () => {
    console.log("Returning to dashboard...");
    navigate("/dashboard");
    // Implement your navigation logic here (e.g., using React Router)
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        <FaCheckCircle className="inline-block text-green-500 mr-2" />
        Quiz Platform
      </h1>

      {/* Modal for User Info */}
      {isModalOpen && (
        <div className="fixed text-center inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">User Information</h2>
            {/* <img src={userImage} alt="User" className="rounded-full mb-4" /> */}
            <img
              src="https://pbs.twimg.com/profile_images/1878416738628280320/ZvpJSk-__400x400.jpg"
              alt="User"
              className="rounded-full mb-4 h-40 w-auto"
            />
            <p className="text-lg">{userName}</p>
            <button
              onClick={startQuiz}
              className="bg-purple-800 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
            >
              Start Test
            </button>
          </div>
        </div>
      )}

      {/* Result Modal after Test Submission */}
      {isResultModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Test Results</h2>
            <p className="text-lg">
              Your Score: {score} / {questions.length}
            </p>
            <p className="mt-4 text-center">{message}</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={resetTest}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Restart Test
              </button>
              <button
                onClick={returnToDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {isTestStarted && (
        <div className="w-full max-w-3xl">
          <p className="mt-2 text-lg text-center">Time Left: {timer} seconds</p>
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md"
            >
              <p className="text-xl mb-4">{q.question}</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(index, option)}
                    disabled={answers[index] !== undefined}
                    className={`${
                      answers[index] === option
                        ? "bg-green-500"
                        : "bg-gray-600 hover:bg-gray-500"
                    } text-white font-bold py-2 px-4 rounded-md transition-colors duration-300`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center mt-6">
            <button
              onClick={submitQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-4 w-full md:w-auto"
            >
              Submit Quiz
            </button>
            <button
              onClick={withdrawFunds}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md w-full md:w-auto"
            >
              <FaMoneyBillAlt className="inline-block mr-2" />
              Withdraw Funds
            </button>
          </div>
          <p className="mt-4 text-center">{message}</p>
          <p className="mt-2 text-xl text-center">
            Your Score: {score} / {questions.length}
          </p>

          {/* Restart Test Button */}
          {!isTestStarted && (
            <button
              onClick={resetTest}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mt-4"
            >
              Restart Test
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Exam;
