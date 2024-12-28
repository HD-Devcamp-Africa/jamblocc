// import React from "react";

// const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
// import { getContract, createThirdwebClient } from "thirdweb";
// import { useState } from "react";
// import { defineChain } from "thirdweb/chains";
// import { TransactionButton } from "thirdweb/react";
// import { claimTo, getBalance } from "thirdweb/extensions/erc20";
// import {
//   useActiveAccount,
//   useActiveWallet,
//   useDisconnect,
// } from "thirdweb/react";
// const [showPrize, setShowPrize] = useState<boolean>(false);
// const [showModal, setShowModal] = useState<boolean>(false);
// const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);

// interface PrizeModalProps {
//   showPrize: boolean;
//   prizeClaimed: boolean;
//   showModal: boolean;
//   score: number;
//   claimPrize: () => void;
// }

// const PrizeModal: React.FC<PrizeModalProps> = ({
//   showPrize,
//   prizeClaimed,
//   showModal,
//   score,
//   claimPrize,
// }) => {
//   // create the client with your clientId, or secretKey if in a server environment
//   const client = createThirdwebClient({
//     clientId: clientId,
//   });

//   const account = useActiveAccount();
//   const { disconnect } = useDisconnect();
//   const wallet = useActiveWallet();

//   // Interact with the contract over here
//   const contract = getContract({
//     client: client,
//     chain: defineChain(11155111),
//     address: "0x277eeC03624ACF9dCFaC9f417c535eAc2c5db0F4",
//   });
//   return (
//     <div>
//       {/* <div> */}
//       <h2>Quiz Complete! Your score: {score}</h2>
//       {showPrize && !prizeClaimed && (
//         // biome-ignore lint/a11y/useButtonType: <explanation>
//         <button
//           onClick={claimPrize}
//           style={{
//             padding: "0.5rem 1rem",
//             background: "#fff",
//             color: "black",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             marginRight: "10px",
//           }}
//         >
//           Claim Prize
//         </button>
//       )}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               background: "black",
//               padding: "2rem",
//               borderRadius: "8px",
//               maxWidth: "300px",
//               textAlign: "center",
//               border: "2px solid white",
//             }}
//           >
//             <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
//               Claim {score} Tokens!
//             </h2>

//             {/* Make sure the claimTo transaction is executed */}
//             <TransactionButton
//               transaction={() =>
//                 claimTo({
//                   contract: contract, // The contract instance to send the tokens from
//                   to: account.address, // The recipient's wallet address
//                   quantity: score.toString(), // The number of tokens to transfer
//                 })
//               }
//               onTransactionConfirmed={() => {
//                 alert("Prize claimed!");
//                 setShowModal(false);
//                 setPrizeClaimed(true);
//               }}
//               style={{
//                 padding: "0.5rem 1rem",
//                 background: "#28a745",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Claim Prize
//             </TransactionButton>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrizeModal;

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
    <div>
      <h2>Quiz Complete! Your score: {score}</h2>
      {showPrize && !prizeClaimedState && (
        <button
          onClick={claimPrize}
          style={{
            padding: "0.5rem 1rem",
            background: "#fff",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
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
                padding: "0.5rem 1rem",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
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
