import React, { useState, useEffect } from "react";
import createThirdwebClient from "@thirdweb-dev/sdk";
// import InjectedWallet from "@thirdweb-dev/sdk/wallets";

// Replace with your actual client ID
const clientId = "6151f89857874e35bb6b731f2712337c";

const WalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Create thirdweb client
  //   const client = createThirdwebClient({ clientId });

  // Initialize wallet instance for injected wallet (e.g., MetaMask)
  //   const wallet = new InjectedWallet();

  useEffect(() => {
    // Check if MetaMask is already connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0]);
          }
        })
        .catch((err) =>
          console.error("Error checking MetaMask accounts:", err)
        );
    }
  }, []);

  const connectWallet = async () => {
    setErrorMessage(null); // Reset error message on each attempt

    try {
      // Check if MetaMask is available
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request account access
        const address = await wallet.getAddress(); // Get the connected wallet address
        setWalletAddress(address); // Store the address
        setIsConnected(true);
        console.log("Wallet connected!");
      } else {
        setErrorMessage(
          "MetaMask is not installed. Please install MetaMask to connect."
        );
      }
    } catch (error) {
      setErrorMessage("Failed to connect to wallet. Please try again.");
      console.error("Connection error:", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-purple-300 bg-white text-white text-xl">
        Wallet Connection
      </h1>
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-purple-800 font-bold text-white py-3 px-9 rounded-md"
        >
          Get Started
        </button>
      ) : (
        <div>
          <p>Wallet Connected!</p>
          <p>Your wallet address: {walletAddress}</p>
        </div>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default WalletConnect;
