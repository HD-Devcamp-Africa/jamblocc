// Sidebar.tsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 w-64 py-6 px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <FaUserCircle size={30} />
        <span className="text-lg font-semibold">Admin Profile</span>
      </div>
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center space-x-3 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          <FaClipboardList />
          <span>Manage Questions</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          <BiStats />
          <span>Statistics</span>
        </a>
        <ol>
          <li className="font-bold">Supported Subjects</li>
          <li>biology</li>
          <li> physics</li>
          <li> chemistry</li>
          <li> englishlit</li>
          <li> government</li>
          <li> crk</li>
          <li> geography</li>
          <li> economics</li>
          <li> irk</li>
          <li> civiledu</li>
          <li> insurance</li>
          <li> currentaffairs</li>
          <li>history</li>
          <li>mathematics</li>
          <li>commerce</li>
          <li>english</li>
          <li>accounting</li>
        </ol>
      </nav>
    </aside>
  );
};

export default Sidebar;
