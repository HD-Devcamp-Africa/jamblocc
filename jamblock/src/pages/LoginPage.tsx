// src/LoginPage.tsx
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      } else if (prev.length < 4) {
        return [...prev, subject];
      }
      return prev; // Do not add if already 4 selected
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      selectedSubjects,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Redirect or handle successful login here
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80 px-4">
      <div
        className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg animate-slide-up"
        style={{
          animation: "slide-up 0.5s ease-out",
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm md:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-green-500 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm md:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-green-500 text-sm md:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 transition duration-200 rounded text-white font-semibold text-sm md:text-base"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm md:text-base">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
