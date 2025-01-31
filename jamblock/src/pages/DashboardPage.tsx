import React, { useState, useEffect } from "react";
import {
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import CalendarComponent from "../components/UserDashboard/Calendar";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  useActiveAccount,
  useDisconnect,
  useActiveWallet,
} from "thirdweb/react";
import Header from "../components/UserDashboard/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubjectCard from "../components/UserDashboard/SubjectCard";
import BottomNav from "../components/BottomNav";
import { PiExamFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { clientId } from "../client";
import NoticeBoard from "../components/UserDashboard/NoticeContainer";
import Statistics from "../components/UserDashboard/Statistics";
import Performance from "../components/UserDashboard/Performance";
import Leaderboard from "../components/UserDashboard/Leaderboard";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { width: "16rem", transition: { duration: 0.5 } },
    closed: { width: "5rem", transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardData = [
    {
      id: "account-settings",
      title: "Account Settings",
      description:
        "Manage your account settings, update your profile information, and adjust security settings.",
      buttonText: "Go to Settings",
      buttonLink: "/account-setting",
    },
    {
      id: "analytics",
      title: "Analytics",
      description:
        "View your recent activity, insights, and track your performance.",
      buttonText: "View Analytics",
      buttonLink: "*",
    },
    {
      id: "notifications",
      title: "Notifications",
      description:
        "Stay updated with the latest notifications from your activities.",
      buttonText: "View Notifications",
      buttonLink: "/notifications",
    },
    {
      id: "wallet",
      title: "Wallet",
      description: "See your balance and see your transaction so far.",
      buttonText: "See All Transactions",
      buttonLink: "*",
    },
  ];

  // Fetch user profile data
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (token) {
  //     axios
  //       .get(`${VITE_API_URL}/api/user/profile`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         console.log("User profile fetched:", response.data);
  //         setUserProfile(response.data); // Set the user profile data
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user profile:", error);
  //       });
  //   } else {
  //     console.log("User not logged in");
  //     // Redirect to login page or handle this situation appropriately
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="min-h-screen h-full bg-gray-800 text-white flex overflow-hidden">
      {/* Sidebar */}
      <motion.div
        className="bg-gray-900 p-6 space-y-6 fixed top-0 left-0 h-full z-0"
        variants={sidebarVariants}
        initial={isSidebarOpen ? "open" : "closed"}
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <div className="text-2xl font-bold mb-8 flex items-center justify-between">
          <button onClick={toggleSidebar} className="ml-auto">
            {isSidebarOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
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
        <Header
          userProfile={userProfile}
          wallet={wallet}
          account={account}
          clientId={clientId}
          disconnect={(address) => disconnect(address)}
        />

        <div className="  grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
          {/* Dashboard Section */}
          <div className="sub-dashboard grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">
            {cardData.map((card) => (
              <SubjectCard
                key={card.id}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
                contentVariants={contentVariants}
                controls="visible"
              />
            ))}

            {/* Statistics, Performance, and Leaderboard component */}

            <div className="w-full col-span-full overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-1 w-full max-w-full">
                <div className="lg:basis-[60%] flex-shrink-0 min-h-[200px] max-w-full">
                  <Statistics />
                </div>
                <div className="lg:basis-[39%] flex-shrink-0 min-h-[200px] max-w-full">
                  <Performance />
                </div>
              </div>

              <div className="w-full  max-w-full">
                <Leaderboard />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="border-l border-gray-300 mt-10 border-red-300 overflow-y-auto max-h-[calc(100vh-10rem)] w-full">
            <motion.div className="p-4">
              <h3 className="text-white text-md text-center mb-4">Calendar</h3>
              <div className="overflow-auto">
                <CalendarComponent />
              </div>
            </motion.div>
            <div className="flex flex-col items-center justify-center text-center overflow-auto p-4 w-full">
              <h4 className="text-white font-bold mb-4">Notice Board</h4>
              <div className="w-full space-y-4">
                {cardData.map((card) => (
                  <NoticeBoard
                    key={card.id}
                    description={card.description}
                    buttonText="Read more"
                    buttonLink={card.buttonLink}
                    contentVariants={contentVariants}
                    controls="visible"
                    src="public/images/jamblock.png"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
