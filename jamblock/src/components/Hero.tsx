import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "thirdweb/react";
import { clientId } from "../client";
// import TrustedBrands from "./TrustedBrands";
import { useActiveAccount } from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import { VerifyLoginPayloadParams } from "thirdweb/dist/types/auth/core/verify-login-payload";
// import { sepolia } from "thirdweb/chains";

import { createWallet, inAppWallet, injectedProvider } from "thirdweb/wallets";
import TrustedBrands from "./TrustedBrands";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // const client = createThirdwebClient({ clientId });

  const showPopup = (message: string, timeout: number = 3000): void => {
    const popup = document.createElement("div");
    popup.textContent = message;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(36, 4, 21, 0.86)";
    overlay.style.zIndex = "999";

    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px 40px";
    popup.style.backgroundColor = "white";
    popup.style.color = "#000";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "1000";

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    setTimeout(() => {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
    }, timeout);
  };

  useEffect(() => {
    const storedConnectionState = localStorage.getItem("isConnected");
    if (storedConnectionState) {
      setIsConnected(JSON.parse(storedConnectionState));
    }
  }, []);

  useEffect(() => {
    if (account) {
      localStorage.setItem("isConnected", JSON.stringify(true));
      // handleNextStep();
      showPopup("Taking you to your dashboard", 4000);
      setTimeout(() => {
        navigate("/dashboard");
      }, 4500);
    } else {
      localStorage.setItem("isConnected", JSON.stringify(false));
    }
  }, [account]);

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
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          Ace Your Exams with{" "}
          <span className="bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-transparent">
            JAMBlock
          </span>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-lg font-bold lg:text-xl text-white mt-4"
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
              {/* The button to connect account */}
              <ConnectButton
                client={clientId}
                wallets={[
                  inAppWallet({
                    auth: {
                      // isLoggedIn: async (address) => {
                      //   console.log("checking if logged in !", { address });
                      //   return await isLoggedIn();
                      // },
                      // doLogin: async (params) => {
                      //   console.log("doing login!", { params });
                      //   await doLogin(params);
                      // },
                      // getLoginPayLoad: async ({ address }) => {
                      //   generatePayload({ address });
                      // },
                      // doLogout: async () => {
                      //   console.log("doing logout!");
                      //   await doLogout();
                      // },
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
                  createWallet("io.metamask"),
                  createWallet("com.coinbase.wallet"),
                  createWallet("me.rainbow"),
                ]}
                // appMetadata={{
                //   name: "Example app",
                //   url: "https://example.com",
                // }}
                connectButton={{
                  label: "Sign in",
                }}
                // accountAbstraction={{
                //   chain: sepolia,
                //   sponsorGas: true,
                // }}
              />
            </div>
          </motion.div>
        ) : (
          <button> Welcome</button>
        )}
      </div>
    </section>
  );
};

export default Hero;
