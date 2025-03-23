import React, { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotificationList = [
  {
    id: 1,
    name: "Sheila.....",
    info: "User logged in from Recent location",
    // subjects: ["Agric", " English", "Biology", "Maths"],
  },
  {
    id: 2,
    name: "Sheila.....",
    info: "User not verified yet",
    // subjects: ["Agric", " English", "Biology", "Hausa"],
  },
  {
    id: 3,
    name: "Sheila.....",
    info: "User score high score",
    // subjects: ["Agric", " English", "Biology", "Igbo"],
  },
];
// Define the types for the quiz questions and answers

const Notifications: React.FC = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  // Start the quiz and timer
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle return to dashboard logic (placeholder function)
  const returnToDashboard = () => {
    console.log("Returning to dashboard...");
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
        <div className="fixed text-center inset-0 flex w-full items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg ">
            <div className="flex items-center text-right gap-5 w-full mb-10 border-b border-1 mx-auto pb-5">
              <h2 className="text-xl text-md md:text-lg lg:text-xl xl:text-3xl  text-center mx-auto text-purple-300 font-bold">
                Notifications
              </h2>
              <button
                onClick={handleCloseModal}
                className="bg-red-900 font-bold hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4"
              >
                X
              </button>
            </div>
            <div className="h-[400] max-w-4xl w-[80%] mx-auto">
              <p className="text-gray-700">
                repudiandae rem inventore necessitatibus, quia eum omnis harum
                saepe itaque, facilis, corporis distinctio cupiditate. Mollitia.
              </p>
              <div className="my-5">
                <table className="w-full border-collapse bg-gray-700 rounded-lg shadow-md text-xs md:text-sm">
                  <tbody>
                    {NotificationList.map((information) => (
                      <tr
                        key={information.id}
                        className="border-t border-gray-300"
                      >
                        {/* <td className="p-2 md:p-3 text-black font-bold"></td>
                        <td className="p-2 md:p-3 flex items-center"></td>
                        <td className="p-2 md:p-3 text-black font-bold"></td>
                        <td className="p-2 md:p-3 text-center">{}</td> */}
                        <td className="p-2 md:p-3">
                          <div className=" text-left text-lg md:text-lg lg:text-xl xl:text-3xl">
                            {information.info}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <img src={userImage} alt="User" className="rounded-full mb-4" /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
