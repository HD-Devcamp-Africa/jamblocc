import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
// import "./App.css";

function ComingSoonPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1
          className={`text-4xl font-bold text-gray-800 transition-opacity duration-1000 ease-in-out transform ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } animate-bounce`}
        >
          COMING SOON
        </h1>
      </div>
      <BottomNav/>
    </div>
  );
}

export default ComingSoonPage;
