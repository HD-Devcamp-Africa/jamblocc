import React, { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  // Function to toggle visibility of the button
  const toggleVisible = () => {
    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop;
    setVisible(scrolled > 300); // Show the button if scrolled down more than 300px
  };

  // Function to scroll back to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  // Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible); // Cleanup on unmount
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 z-50 bg-purple-900 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <FaAngleDoubleUp />
    </button>
  );
};

export default ScrollToTopButton;
