import React from "react";
import { useMediaQuery } from "react-responsive";

const Footer: React.FC = () => {
  // Check if the screen is not mobile (min-width: 768px)
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  // Render the Footer only on larger screens (desktop/tablet)
  if (!isDesktopOrTablet) return null;

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} JAMBlock. All rights reserved.
        </p>
        <p className="text-lg mt-2">
          Built with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-400">
            Passion
          </span>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
