import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Jambly. All rights reserved.
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
