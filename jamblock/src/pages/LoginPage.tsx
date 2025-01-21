// src/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const VITE_API_URL = import.meta.env.VITE_API_URL || " http://localhost:5000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(null); // Clear any previous error messages
    setIsLoading(true); // Start loading indicator

    const formData = {
      email,
      password,
      selectedSubjects, // Optional, depending on your backend needs
    };

    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", response.data);
      // Handle successful login, e.g., save token or redirect
      localStorage.setItem("authToken", response.data.token);
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error: any) {
      console.error("Error during login:", error);
      // Handle error: show a message to the user
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false); // Stop loading indicator
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
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
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
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
