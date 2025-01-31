import React, { useState } from "react";
import { HiOutlineClipboard, HiOutlineCheck, HiBell } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { ConnectButton } from "thirdweb/react";
import { shortenAddress } from "@thirdweb-dev/react";
import { clientId } from "../../client";
import ThirdwebClient from "@thirdweb-dev/react"; // Add import for ThirdwebClient
import { Wallet } from "thirdweb/wallets";

interface UserProfile {
  name: string;
  image?: string; // Optional user image
}

interface Account {
  address: string;
}

interface HeaderProps {
  userProfile?: UserProfile;
  account?: Account;
  // disconnect: (address: string) => void; // Change type to string
  // wallet?: Wallet | null;
  // clientId: string;
}

const Header: React.FC<HeaderProps> = ({
  userProfile,
  account,
  // disconnect,
  // wallet,
  // clientId,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // const thirdwebClient = new ThirdwebClient({ clientId }); // Initialize the client

  return (
    <header className="border border-white flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gray-800 text-white rounded-md">
      {/* Welcome Text */}
      <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold whitespace-nowrap">
        Welcome back,
        <span className="text-purple-200">
          {userProfile ? userProfile.name : "User"}
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
        <button className="relative">
          <HiBell className="text-2xl" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Picture or Default Icon */}
        {userProfile?.image ? (
          <img
            src={userProfile.image}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-500"
          />
        ) : (
          <FaUserCircle className="text-3xl cursor-pointer" />
        )}

        {/* {account ? (
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div
              onClick={handleCopyAddress}
              className="cursor-pointer flex items-center space-x-2"
              title="Copy"
            >
              {shortenAddress(account.address)}
              {copied ? (
                <HiOutlineCheck className="text-green-500" />
              ) : (
                <HiOutlineClipboard className="text-white" />
              )}
            </div>

            <button
              onClick={() => disconnect(wallet?.address || "")} // Pass wallet address as string
              className="text-sm font-bold text-white rounded-lg bg-[#E91E63] py-2 px-6"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <ConnectButton client={thirdwebClient} />
        )} */}
      </div>
    </header>
  );
};

export default Header;
