// src/pages/WaitlistPage.js
import React from "react";
import Navigation from "../components/Navbar";

const WaitlistPage = () => {
  return (
    <div className="h-full pt-5">
      <div className="mb-40">
        <Navigation />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-5">Join Our Waitlist</h2>
        <form className="bg-gray-900 p-5 rounded shadow-lg w-80 space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 rounded bg-gray-700 focus:ring focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 focus:ring focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-purple-500 hover:bg-purple-800 transition"
          >
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistPage;
