// Header.tsx
import React from "react";
import { FaPlus } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded flex items-center">
        <FaPlus className="mr-2" /> Add New Question
      </button>
    </header>
  );
};

export default Header;
