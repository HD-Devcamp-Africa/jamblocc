import React, { useState } from "react";
import { HiOutlineClipboard, HiOutlineCheck } from "react-icons/hi";
import { ConnectButton } from "thirdweb/react"; // Replace with actual path to your ConnectButton component
import { shortenAddress } from "@thirdweb-dev/react";
import { clientId } from "../../client";
import { Wallet } from "thirdweb/wallets";
interface UserProfile {
  name: string;
}

interface Account {
  address: string;
}

interface HeaderProps {
  userProfile?: any;
  account?: Account;
  disconnect: (wallet: string) => void;
  wallet?: Wallet | null;
  clientId: string;
}

const Header: React.FC<HeaderProps> = ({
  userProfile,
  account,
  disconnect,
  wallet,
  clientId,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-semibold text-lg md:text-2xl lg:text-3xl">
        Welcome back, {userProfile ? userProfile.name : "User"}
      </h1>

      <div className="flex items-center space-x-4">
        {account ? (
          <div className="flex flex-col md:flex-row items-center mr-6 space-y-4 md:space-y-0 md:space-x-6">
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
              onClick={() => disconnect(wallet!)}
              className="text-sm font-bold text-white rounded-lg bg-[#E91E63] py-3 px-10"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <ConnectButton client={clientId} />
        )}
      </div>
    </header>
  );
};

export default Header;
