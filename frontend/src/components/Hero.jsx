import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Ace Your Exams with{" "}
          <span className="bg-gradient-to-r from-purple-800 to-purple-500 bg-clip-text text-transparent">
            JAMBlock
          </span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Get access to curated past questions and study resources tailored for
          JAMB students.
        </p>
        <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-bold rounded shadow-md hover:bg-purple-700">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
