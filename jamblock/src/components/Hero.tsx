import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import TrustedBrands from "./TrustedBrands";
import { useActiveAccount } from "thirdweb/react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const account = useActiveAccount();
    const [isConnected, setIsConnected] = useState<boolean>(false);

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

    return (
        <section className="min-h-screen w-full flex items-center justify-center py-20 text-center">
            <div className="container mx-auto px-6">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}
                >
                    Ace Your Exams with{" "}
                    <span className="bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
                        JAMBlock
                    </span>
                </motion.h1>
                <motion.p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mt-4"
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
                        <div className="bg-gradient-to-r from-purple-800 to-purple-500 text-white py-2 px-4 rounded-lg shadow-lg">
                            <ConnectButton
                                client={client}
                                appMetadata={{
                                    name: "Example app",
                                    url: "https://example.com",
                                }}
                            />
                        </div>
                    </motion.div>
                ) : null}
                <div>
                    <TrustedBrands />
                </div>
            </div>
        </section>
    );
};

export default Hero;
