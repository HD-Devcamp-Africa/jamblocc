import React, { useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";

const Hero: React.FC = () => {
    const [clickCount, setClickCount] = useState<number>(0);

    const handleButtonClick = () => {
        setClickCount((prevCount) => {
            const newCount = prevCount + 1;
            console.log(`Button clicked ${newCount} times`);
            return newCount;
        });
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center py-20 text-center">
            <div className="container mx-auto px-6">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
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
                    className="text-gray-600 mt-4 text-lg md:text-xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    Get access to curated past questions and study resources tailored for
                    JAMB students.
                </motion.p>
                <motion.p
                    className="text-gray-600 mt-4 text-lg md:text-xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    Button clicked {clickCount} times
                </motion.p>
                <motion.div
                    className="flex justify-center mb-20 mt-10"
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
            </div>
        </section>
    );
};

export default Hero;
