import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { clientId } from "../client";
import TrustedBrands from "./TrustedBrands";
import { useActiveAccount } from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import { VerifyLoginPayloadParams } from "thirdweb/dist/types/auth/core/verify-login-payload";
import { sepolia } from "thirdweb/chains";

// import external wallets
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet, injectedProvider } from "thirdweb/wallets";
import WalletConnect from "./ConnectWallet";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // const client = createThirdwebClient({ clientId });

  useEffect(() => {
    const storedConnectionState = localStorage.getItem("isConnected");
    if (storedConnectionState) {
      setIsConnected(JSON.parse(storedConnectionState));
    }
  }, []);

  useEffect(() => {
    if (account) {
      localStorage.setItem("isConnected", JSON.stringify(true));
      handleNextStep();
    } else {
      localStorage.setItem("isConnected", JSON.stringify(false));
    }
  }, [account]);

  const handleNextStep = () => {
    navigate("/writer");
  };

  function login(params: VerifyLoginPayloadParams) {
    navigate("/dashboard");
  }

  function generatePayload(arg0: {
    address: string;
  }):
    | import("thirdweb/dist/types/auth/core/types").LoginPayload
    | PromiseLike<import("thirdweb/dist/types/auth/core/types").LoginPayload> {
    throw new Error("Function not implemented.");
  }

  function logout() {
    navigate("/");
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 text-center bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-200 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          Ace Your Exams with{" "}
          <span className="bg-gradient-to-r from-purple-200 to-purple-500 bg-clip-text text-transparent">
            JAMBlock
          </span>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg font-bold lg:text-xl text-purple-600 mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Get access to curated past questions and study resources tailored for
          JAMB students.
        </motion.p>

        {!isConnected ? (
          <motion.div
            className="flex justify-center mb-10 mt-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div>
              {/* The button to connect clocks */}
              <ConnectButton
                client={clientId}
                wallets={[
                  inAppWallet({
                    auth: {
                      options: [
                        "discord",
                        "email",
                        "github",
                        "google",
                        "phone",
                        "telegram",
                      ],
                    },
                  }),
                ]}
                // appMetadata={{
                //   name: "Example app",
                //   url: "https://example.com",
                // }}
                connectButton={{
                  label: "Sign in",
                }}
                accountAbstraction={{
                  chain: sepolia,
                  sponsorGas: true,
                }}
              />
            </div>
          </motion.div>
        ) : null}
        <div>
          {/* <TrustedBrands /> */}
          <WalletConnect />
        </div>
      </div>
    </section>
  );
};

export default Hero;
