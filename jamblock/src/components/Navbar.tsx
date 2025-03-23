import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
// import { FaClipboardQuestion } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// import { CiHome } from "react-icons/ci";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { SiHomebridge } from "react-icons/si";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { GiBookshelf } from "react-icons/gi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLogged] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      // perfom logout action
      localStorage.removeItem("authToken");
      setIsLogged(true);

      navigate("/");
    } else {
      setIsLogged(false);
      navigate("/login");
    }
  };

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 md:block hidden shadow-md sticky top-0 z-10 font-roboto">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/">
          <img
            src="/images/logo.jpg"
            alt="JAMBlock Logo"
            className="h-20 rounded-md"
          />
        </Link>
        <div className="hidden lg:flex space-x-8 font-bold text-gray-200">
          <Link to="/" className="hover:text-purple-500 cursor-pointer">
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-purple-500 cursor-pointer"
          >
            Dashboard
          </Link>
          <Link
            to={isLoggedIn ? "/questions" : "/all-past-question"}
            className="hover:text-purple-500 cursor-pointer"
          >
            Past Questions
          </Link>
          <Link to="/about" className="hover:text-purple-500 cursor-pointer">
            About
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-2xl px-4 py-2 bg-purple-800 text-white rounded"
        >
          {isOpen ? <FaTimes /> : <FaBarsStaggered />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            exit={{ y: -300 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.3 }} // Faster closing
            className="fixed pt-20 inset-0 bg-white z-20 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-gray-800 bg-gray-200 rounded-full p-2 shadow-md z-30"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex-1 px-6 py-4 overflow-y-auto">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }, // Faster stagger effect
                  },
                }}
              >
                {[
                  {
                    path: "/",
                    label: "Home",
                    icon: <SiHomebridge className="text-2xl" />,
                  },

                  {
                    path: "/about",
                    label: "About",
                    icon: <VscWorkspaceUnknown className="text-2xl" />,
                  },
                  {
                    path: "/dashboard",
                    label: "Dashboard",
                    icon: <MdSpaceDashboard className="text-2xl" />,
                  },
                  {
                    path: isLoggedIn ? "/questions" : "/all-past-question",
                    label: "Past Questions",
                    icon: <GiBookshelf className="text-2xl" />,
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="mb-4 border-b pb-2 last:border-b-0"
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-4 text-gray-800 font-semibold text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div className="px-6 py-4 bg-gray-100 border-t">
              <button
                className="w-full bg-purple-800 text-white font-bold py-3 rounded"
                // onClick={() => setIsOpen(false)} // Replace with actual login logic
                onClick={handleButtonClick}
              >
                {isLoggedIn ? "Logout" : "Log in"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
