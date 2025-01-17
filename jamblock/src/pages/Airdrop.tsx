import React, { useState } from "react";
import { ethers } from "ethers";
import QuizPlatformABI from "./QuizPlatformABI.json";
import { FaMoneyBillAlt, FaCheckCircle } from "react-icons/fa";

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

const Airdop: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "1 + 1 = ?", options: [2, 3, 4, 5], correct: 2 },
    { question: "2 + 2 = ?", options: [3, 4, 5, 6], correct: 4 },
    // Add more questions here...
  ]);
  const [answers, setAnswers] = useState<Answers>({});
  const [message, setMessage] = useState<string>("");

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
    let correctCount = 0;

    // Check the answers
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correctCount++;
    });

    setScore(correctCount);

    if (correctCount === 20) {
      try {
        const tx = await contract.reportResults(20); // Report 20 correct answers
        await tx.wait();
        setMessage("Quiz submitted successfully! Rewards credited.");
      } catch (error) {
        console.error(error);
        setMessage(
          "Error: " + (error instanceof Error ? error.message : "Unknown error")
        );
      }
    } else {
      setMessage("You need to score 20/20 to earn rewards.");
    }
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

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        <FaCheckCircle className="inline-block text-green-500 mr-2" />
        Quiz Platform
      </h1>
      <div className="w-full max-w-3xl">
        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md"
          >
            <p className="text-xl mb-4">{q.question}</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {q.options.map((option, i) => (
                <button
                  key={i}
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
      </div>
      <p className="mt-4 text-center">{message}</p>
      <p className="mt-2 text-xl text-center">
        Your Score: {score} / {questions.length}
      </p>
    </div>
  );
};

export default Airdop;
