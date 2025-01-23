import React, { useState, useEffect } from "react";
import {
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineClipboard,
} from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ConnectButton,
  useActiveAccount,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import { shortenAddress } from "@thirdweb-dev/react";
import { PiExamFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { clientId } from "../client";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  // import the api url from the dot env file
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Fetch user profile data
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get(`${VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("User profile fetched:", response.data);
          setUserProfile(response.data); // Set the user profile data
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } else {
      console.log("User not logged in");
      // Redirect to login page or handle this situation appropriately
      navigate("/login");
    }
  }, []);

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
    <div className="min-h-screen h-full bg-gray-800 text-white flex overflow-hidden">
      <motion.div
        className="bg-gray-900 p-6 space-y-6 fixed top-0 left-0 h-full z-0"
        variants={sidebarVariants}
        initial={isSidebarOpen ? "open" : "closed"}
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <div className="text-2xl font-bold mb-8 flex items-center justify-between">
          {isSidebarOpen}
          <button onClick={toggleSidebar} className="ml-auto">
            {isSidebarOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
        <div>
          <nav className="space-y-10 mt-10">
            <motion.a
              href="/dashboard"
              className="flex bg-gray-200 mb-40 bg-gray-900 space-x-2"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {isSidebarOpen && (
                <img
                  src="https://pbs.twimg.com/profile_images/1878416738628280320/ZvpJSk-__400x400.jpg"
                  alt="Logo"
                  className="rounded-full"
                />
              )}
            </motion.a>
            <motion.a
              href="/exam"
              className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <PiExamFill className="text-xl" />
              {isSidebarOpen && <span>Exams</span>}
            </motion.a>
            <motion.a
              href="/account-settings"
              className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <HiOutlineCog className="text-xl" />
              {isSidebarOpen && <span>Settings</span>}
            </motion.a>

            <motion.a
              href="*"
              className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <HiOutlineBell className="text-xl" />
              {isSidebarOpen && <span>Notifications</span>}
            </motion.a>
            <motion.a
              href="/questions"
              className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <MdLibraryBooks className="text-xl" />
              {isSidebarOpen && <span>Past Questions</span>}
            </motion.a>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-lg md:text-2xl lg:text-3xl">
            {/* {account ? ( */}
            <> Welcome back, {userProfile ? userProfile.name : "User"}</>
          </h1>

          <div className="flex items-center space-x-4">
            {account ? (
              <div className="flex flex-col md:flex-row items-center mr-6 space-y-4 md:space-y-0 md:space-x-6">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(account.address);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
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
                  onClick={() => {
                    disconnect(wallet!);
                    // setTimeout(() => {
                    //   // navigate("/");
                    // }, 400);
                  }}
                  className="text-sm font-bold text-white rounded-lg bg-[#E91E63] py-3 px-10"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              // <button onClick={() => {}}>Connect Wallet</button>
              <ConnectButton client={clientId} />
            )}
          </div>
        </header>

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-20">
          {/* Settings Card */}
          <motion.div
            ref={ref}
            className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={contentVariants}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-xl text-purple-900 font-semibold mb-4 text-lg md:text-xl lg:text-2xl">
              Account Settings
            </h3>
            <p className="text-black mb-4 text-sm md:text-base lg:text-lg">
              Manage your account settings, update your profile information, and
              adjust security settings.
            </p>
            <button
              onClick={() => navigate("/account-setting")}
              className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-lg"
            >
              Go to Settings
            </button>
          </motion.div>

          {/* Analytics Card */}
          <motion.div
            ref={ref}
            className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={contentVariants}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-xl text-purple-900 font-semibold mb-4 text-lg md:text-xl lg:text-2xl">
              Analytics
            </h3>
            <p className="text-black mb-4 text-sm md:text-base lg:text-lg">
              View your recent activity, insights, and track your performance.
            </p>
            <button
              onClick={() => navigate("*")}
              className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-lg"
            >
              View Analytics
            </button>
          </motion.div>

          {/* Notifications Card */}
          <motion.div
            ref={ref}
            className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={contentVariants}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-xl text-purple-900 font-semibold mb-4 text-lg md:text-xl lg:text-2xl">
              Notifications
            </h3>
            <p className="text-black mb-4 text-sm md:text-base lg:text-lg">
              Stay updated with the latest notifications from your activities.
            </p>
            <button
              onClick={() => navigate("/notifications")}
              className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-sm md:text-base lg:text-lg"
            >
              View Notifications
            </button>
          </motion.div>
        </div>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
