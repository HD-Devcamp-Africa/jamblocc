import React, { useState } from "react";
import { getContract, createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { TransactionButton } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc20";
import { useActiveAccount } from "thirdweb/react";

const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

interface PrizeModalProps {
  showPrize: boolean;
  prizeClaimed: boolean;
  showModal: boolean;
  score: number;
  claimPrize: () => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({
  showPrize,
  prizeClaimed,
  showModal,
  score,
  claimPrize,
}) => {
  const [showModalState, setShowModalState] = useState(showModal);
  const [prizeClaimedState, setPrizeClaimedState] = useState(prizeClaimed);

  const client = createThirdwebClient({
    clientId: clientId,
  });

  const account = useActiveAccount();
  if (!account) {
    return <div>Please connect your wallet to claim your prize!</div>;
  }

  const contract = getContract({
    client: client,
    chain: defineChain(11155111), // Replace with your chain
    address: "0x277eeC03624ACF9dCFaC9f417c535eAc2c5db0F4", // Replace with your contract address
  });

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Quiz Complete! Your score: {score}</h2>
      {showPrize && !prizeClaimedState && (
        <button
          onClick={claimPrize}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "1rem",
          }}
        >
          Claim Prize
        </button>
      )}
      {showModalState && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "black",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "300px",
              textAlign: "center",
              border: "2px solid white",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              Claim {score} Tokens!
            </h2>
            <TransactionButton
              transaction={() =>
                claimTo({
                  contract: contract, // The contract instance to send the tokens from
                  to: account.address, // The recipient's wallet address
                  quantity: score.toString(), // The number of tokens to transfer
                })
              }
              onTransactionConfirmed={() => {
                alert("Prize claimed!");
                setShowModalState(false);
                setPrizeClaimedState(true);
              }}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Claim Prize
            </TransactionButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrizeModal;
