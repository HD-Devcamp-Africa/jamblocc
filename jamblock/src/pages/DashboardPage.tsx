import React, { useState, useEffect } from "react";
import { HiOutlineCog, HiOutlineBell, HiOutlineChartBar, HiOutlineUser, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarVariants = {
        open: { width: "16rem", transition: { duration: 1 } },
        closed: { width: "5rem", transition: { duration: 1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return (
        <div className="min-h-screen h-full bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 text-white flex">
            <motion.div
                className="bg-purple-900 p-6 space-y-6 flex-shrink-0"
                variants={sidebarVariants}
                initial={isSidebarOpen ? "open" : "closed"}
                animate={isSidebarOpen ? "open" : "closed"}
            >
                <div className="text-2xl font-bold mb-8 flex items-center justify-between">
                    <FaUserCircle className="inline mr-2" />
                    {isSidebarOpen}
                    <button onClick={toggleSidebar} className="ml-auto">
                        {isSidebarOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                </div>
                <nav className="space-y-4">
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineUser className="text-xl" />
                                        {isSidebarOpen && <span>Profile</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineChartBar className="text-xl" />
                                        {isSidebarOpen && <span>Analytics</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineBell className="text-xl" />
                                        {isSidebarOpen && <span>Notifications</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineMenu className="text-xl" />
                                        {isSidebarOpen && <span>Messages</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineBell className="text-xl" />
                                        {isSidebarOpen && <span>Tasks</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineCog className="text-xl" />
                                        {isSidebarOpen && <span>Settings</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineChartBar className="text-xl" />
                                        {isSidebarOpen && <span>Exams</span>}
                                    </motion.a>
                                    <motion.a href="#" className="flex items-center space-x-2 hover:bg-purple-700 p-2 rounded-md" variants={itemVariants} initial="hidden" animate="visible">
                                        <HiOutlineUser className="text-xl" />
                                        {isSidebarOpen && <span>Education</span>}
                                    </motion.a>
                </nav>
            </motion.div>

            {/* Main Content */}
            <motion.div className="flex-1 p-6" variants={contentVariants} initial="hidden" animate="visible">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-lg md:text-2xl lg:text-3xl">Welcome back, User!</h1>
                    <div className="flex items-center space-x-4">
                        <button className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300 text-sm md:text-base lg:text-lg">
                            View Profile
                        </button>
                        {/* <button className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300">
                            Logout
                        </button> */}
                        <ConnectButton client={client} />
                    </div>
                </header>

                {/* Dashboard Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Settings Card */}
                    <motion.div ref={ref} className="bg-purple-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" variants={contentVariants} initial="hidden" animate={controls}>
                        <h3 className="text-xl font-semibold mb-4 text-lg md:text-xl lg:text-2xl">Account Settings</h3>
                        <p className="text-gray-300 mb-4 text-sm md:text-base lg:text-lg">Manage your account settings, update your profile information, and adjust security settings.</p>
                        <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-lg">Go to Settings</button>
                    </motion.div>

                    {/* Analytics Card */}
                    <motion.div ref={ref} className="bg-purple-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" variants={contentVariants} initial="hidden" animate={controls}>
                        <h3 className="text-xl font-semibold mb-4 text-lg md:text-xl lg:text-2xl">Analytics</h3>
                        <p className="text-gray-300 mb-4 text-sm md:text-base lg:text-lg">View your recent activity, insights, and track your performance.</p>
                        <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-lg">View Analytics</button>
                    </motion.div>

                    {/* Notifications Card */}
                    <motion.div ref={ref} className="bg-purple-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" variants={contentVariants} initial="hidden" animate={controls}>
                        <h3 className="text-xl font-semibold mb-4 text-lg md:text-xl lg:text-2xl">Notifications</h3>
                        <p className="text-gray-300 mb-4 text-sm md:text-base lg:text-lg">Stay up to date with the latest updates, messages, and alerts related to your account.</p>
                        <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-lg">Check Notifications</button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
