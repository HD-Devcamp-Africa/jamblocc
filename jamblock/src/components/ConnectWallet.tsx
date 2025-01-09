import React, { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, injectedProvider } from "thirdweb/wallets";

// Replace with your actual client ID
const clientId = "6151f89857874e35bb6b731f2712337c";

const WalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Create thirdweb client
  const client = createThirdwebClient({ clientId });

  // Create wallet instance
  const wallet = createWallet("io.metamask");

  const connectWallet = async () => {
    setErrorMessage(null); // Reset error message on each attempt

    try {
      // If the user has Metamask installed, connect to it
      if (injectedProvider("io.metamask")) {
        await wallet.connect({ client });
        setIsConnected(true);
        console.log("Wallet connected!");
      }
      // If Metamask is not installed, show WalletConnect modal
      else {
        await wallet.connect({
          client,
          walletConnect: { showQrModal: true },
        });
        setIsConnected(true);
        console.log("Wallet connected via WalletConnect!");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to wallet. Please try again.");
      console.error("Connection error:", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-purple-300 text-xl">Wallet Connection</h1>
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-purple-800 font-bold text-white py-3 px-9 rounded-md"
        >
          Get Started
        </button>
      ) : (
        <p>Wallet Connected!</p>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default WalletConnect;
