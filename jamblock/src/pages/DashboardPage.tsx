import React, { useState, useEffect } from "react";
import {
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
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

  const VITE_API_URL =
    // import.meta.env.VITE_API_URL_LOCAL || "http://localhost:5000";
    import.meta.env.VITE_API_URL || "https://jamblock.onrender.com";

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
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
      title: "Subject 1",
      description:
        "Manage your account settings, update your profile information, and adjust security settings.",
      buttonText: "Go to Settings",
      buttonLink: "/account-setting",
    },
    {
      id: "analytics",
      title: "Subject 2",
      description:
        "View your recent activity, insights, and track your performance.",
      buttonText: "View Analytics",
      buttonLink: "*",
    },
    {
      id: "notifications",
      title: "Subject 3",
      description:
        "Stay updated with the latest notifications from your activities.",
      buttonText: "View Notifications",
      buttonLink: "/notifications",
    },
    {
      id: "wallet",
      title: "Subject 4",
      description: "See your balance and see your transaction so far.",
      buttonText: "See All Transactions",
      buttonLink: "*",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get(`${VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } else {
      navigate("/login");
    }
  }, []);

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
          <motion.div
            className="flex bg-gray-200 mb-40 bg-gray-900 space-x-2"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/dashboard" className="flex">
              {isSidebarOpen && (
                <img
                  src="https://pbs.twimg.com/profile_images/1878416738628280320/ZvpJSk-__400x400.jpg"
                  alt="Logo"
                  className="rounded-full"
                />
              )}
            </Link>
          </motion.div>

          <motion.div
            className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/exam" className="flex items-center space-x-2 w-full">
              <PiExamFill className="text-xl" />
              {isSidebarOpen && <span>Exams</span>}
            </Link>
          </motion.div>

          <motion.div
            className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/wallet" className="flex items-center space-x-2 w-full">
              <FaWallet className="text-xl" />
              {isSidebarOpen && <span>Wallet</span>}
            </Link>
          </motion.div>

          <motion.div
            className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/account-setting"
              className="flex items-center space-x-2 w-full"
            >
              <HiOutlineCog className="text-xl" />
              {isSidebarOpen && <span>Settings</span>}
            </Link>
          </motion.div>

          <motion.div
            className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/notifications"
              className="flex items-center space-x-2 w-full"
            >
              <HiOutlineBell className="text-xl" />
              {isSidebarOpen && <span>Notifications</span>}
            </Link>
          </motion.div>

          <motion.div
            className="flex bg-gray-200 text-black items-center space-x-2 hover:bg-purple-700 p-2 rounded-md"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/questions"
              className="flex items-center space-x-2 w-full"
            >
              <MdLibraryBooks className="text-xl" />
              {isSidebarOpen && <span>Past Questions</span>}
            </Link>
          </motion.div>

          <motion.div
            onClick={handleLogout}
            className="absolute bottom-28 transform -translate-x-1/2 flex bg-red-700 font-bold text-white items-center space-x-2 hover:bg-purple-700 p-2 rounded-md cursor-pointer"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <IoIosLogOut className="text-xl" />
            {isSidebarOpen && <span>Logout</span>}
          </motion.div>
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
        {!userProfile ? (
          <p>Loading...</p>
        ) : (
          <Header userProfile={userProfile} account={account} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 mt-20">
          {/* Left Section (70% width on large screens) */}
          <div className="sub-dashboard grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">
            {userProfile?.subjects?.map((subject: string, index: number) => (
              <SubjectCard
                key={index}
                title={subject.charAt(0).toUpperCase() + subject.slice(1)}
                contentVariants={contentVariants} // Pass contentVariants prop
                controls="visible" // Pass controls prop
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

              <div className="w-full max-w-full">
                <Leaderboard />
              </div>
            </div>
          </div>

          {/* Right Section (30% width on large screens) */}
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
                  // <NoticeBoard
                  //   key={card.id}
                  //   description={card.description}
                  //   buttonText="Read more"
                  //   buttonLink={card.buttonLink}
                  //   title={card.title}
                  // />
                  <NoticeBoard
                    key={card.id}
                    description={card.description}
                    buttonText="Read more"
                    buttonLink={card.buttonLink}
                    title={card.title}
                    contentVariants={contentVariants} // Pass the contentVariants prop
                    controls="visible" // Pass controls prop
                    src="someValue" // Provide a value for srct (this could be any value as per your component's requirement)
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
