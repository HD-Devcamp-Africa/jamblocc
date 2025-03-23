import React, { useState } from "react";
import { HiOutlineClipboard, HiOutlineCheck, HiBell } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { ConnectButton } from "thirdweb/react";
import { shortenAddress } from "@thirdweb-dev/react";
import { clientId } from "../../client";
import ThirdwebClient from "@thirdweb-dev/react"; // Add import for ThirdwebClient
import { Wallet } from "thirdweb/wallets";
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

interface UserProfile {
  username: string;
  balance: number;
  image?: string; // Optional user image
}

interface Account {
  address: string;
}

interface HeaderProps {
  userProfile?: UserProfile;
  account?: Account;
  name: string;
  balance: number;
  profilePicture: string;

  // disconnect: (address: string) => void; // Change type to string
  // wallet?: Wallet | null;
  // clientId: string;
}

const Header: React.FC<HeaderProps> = ({
  userProfile,
  account,
  name,
  balance,
  profilePicture,
}) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);

  const [isUserAccountModalOpen, setIsUserAccountModalOpen] =
    useState<boolean>(false);

  const handleCloseNotification = () => {
    setIsNotificationModalOpen(false);
  };

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShowNotification = () => {
    setIsNotificationModalOpen(true);
  };

  const handleShowUser = () => {
    // navigate("/notifications");
    setIsUserAccountModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserAccountModalOpen(false);
  };

  // const thirdwebClient = new ThirdwebClient({ clientId }); // Initialize the client

  return (
    <header className="border border-white flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gray-800 text-white rounded-md">
      {/* Welcome Text */}
      <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold whitespace-nowrap">
        Welcome back,
        <span className="ml-2 text-purple-200">
          {userProfile
            ? userProfile.username.charAt(0).toUpperCase() +
              userProfile.username.slice(1)
            : "User"}
        </span>
      </h1>

      {/* Search Bar */}
      <div className="w-full md:w-1/3 flex items-center mt-4 md:mt-0">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        {/* Notification Icon */}
        <button className="relative" onClick={handleShowNotification}>
          <HiBell className="text-2xl cursor-pointer" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Picture or Default Icon */}
        {userProfile?.image ? (
          <img
            src={userProfile.image}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-500 cursor-pointer"
          />
        ) : (
          <button onClick={handleShowUser}>
            <FaUserCircle className="text-3xl cursor-pointer" />
          </button>
        )}
      </div>

      {/* Modal for Notification */}
      {isNotificationModalOpen && (
        <div className="fixed text-center inset-0 flex w-full items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg ">
            <div className="flex items-center text-right gap-5 w-full mb-10 border-b border-1 mx-auto pb-5">
              <h2 className="text-xl text-md md:text-lg lg:text-xl xl:text-3xl  text-center mx-auto text-purple-300 font-bold">
                Notifications
              </h2>
              <button
                onClick={handleCloseNotification}
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

      {/* Modal for User Account Details */}

      {isUserAccountModalOpen && (
        <div className="fixed text-center inset-0 flex w-full items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg ">
            <div className="flex items-center text-right gap-5 w-full mb-10 border-b border-1 mx-auto pb-5">
              <h2 className="text-xl text-md md:text-lg lg:text-xl xl:text-3xl  text-center mx-auto text-purple-300 font-bold">
                Account
              </h2>
              <button
                onClick={handleCloseUserModal}
                className="bg-red-900 font-bold hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4"
              >
                X
              </button>
            </div>

            <div className="max-w-sm mx-auto p-6 bg-gray-900 rounded-lg shadow-md text-white">
              <div className="flex flex-col items-center">
                {/* Profile Picture */}
                <div className="w-24 h-24 text-center ">
                  {/* User Profile Picture or Default Icon */}
                  {userProfile?.image ? (
                    <div className="rounded-full overflow-hidden border-4 border-purple-500">
                      <img
                        src={userProfile.image}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-500 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="w-[90%] mx-auto text-center">
                      <FaUserCircle className="text-3xl text-center cursor-pointer" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <h2 className="mt-4 text-2xl font-semibold">
                  {userProfile
                    ? userProfile.username.charAt(0).toUpperCase() +
                      userProfile.username.slice(1)
                    : "User"}
                </h2>

                {/* Balance */}
                <div className="mt-2 bg-gradient-to-r from-purple-300 to-purple-800 px-4 py-2 rounded-lg">
                  <p className="text-lg font-medium">Balance</p>
                  {/* <p className="text-xl font-bold">${balance.toFixed(2)}</p> */}
                  <p className="text-xl font-bold">
                    {userProfile
                      ? `$ ${userProfile.balance.toFixed()}`
                      : "$ 0.00"}
                  </p>
                </div>

                {/* Is user verified */}
                {/* <div className="mt-2 bg-gradient-to-r from-purple-300 to-purple-800 px-4 py-2 rounded-lg">
                  <p className="text-lg font-medium">Verified ?</p>
                  <p className="text-xl font-bold">
                    {userProfile
                      ? `${userProfile.balance.toFixed()}`
                      : "$ 0.00"}
                    $
                  </p>
                </div> */}
              </div>
            </div>
            {/* <img src={userImage} alt="User" className="rounded-full mb-4" /> */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
