import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const VITE_API_URL =
    // import.meta.env.VITE_API_URL || "https://jamblock.onrender.com";
    import.meta.env.VITE_API_URL_LOCAL || "http://localhost:4000/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login successful:", response.data);
      localStorage.setItem("authToken", response.data.token);
      // window.location.href = "/dashboard";
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error);
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold text-purple-300 text-center mb-6">
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring text-white text-sm md:text-base"
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
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring text-white text-sm md:text-base"
              required
            />
          </div>
          {/* <button
            type="submit"
            className={`w-full py-2 rounded font-semibold text-sm md:text-base transition duration-200 ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-800 hover:bg-purple-600"
            }`}
            disabled={!email || !password || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button> */}
          <button
            type="submit"
            className={`w-full py-2 text-white rounded font-semibold text-sm md:text-base transition duration-200 ${
              isLoading || !email || !password
                ? "bg-gray-300 cursor-not-allowed" // Disabled state
                : "bg-purple-800 hover:bg-purple-600" // Active state
            }`}
            disabled={!email || !password || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm md:text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
