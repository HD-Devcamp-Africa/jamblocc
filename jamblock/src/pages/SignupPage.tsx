import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const subjectsList = [
  { value: "english", label: "English" },
  { value: "mathematics", label: "Mathematics" },
  { value: "commerce", label: "Commerce" },
  { value: "accounting", label: "Accounting" },
  { value: "biology", label: "Biology" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "englishlit", label: "English Literature" },
  { value: "government", label: "Government" },
  { value: "crk", label: "CRK" },
  { value: "geography", label: "Geography" },
  { value: "economics", label: "Economics" },
  { value: "irk", label: "IRK" },
  { value: "civiledu", label: "Civic Education" },
  { value: "insurance", label: "Insurance" },
  { value: "currentaffairs", label: "Current Affairs" },
  { value: "history", label: "History" },
];

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubjectChange = (value: string) => {
    setSubjects((prev) => {
      if (prev.includes(value)) {
        return prev.filter((s) => s !== value);
      } else if (prev.length < 4) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!username || !email || !password || subjects.length === 0) {
      setError(
        "Please fill in all required fields and select at least one subject."
      );
      return;
    }

    const formData = {
      username,
      email,
      password,
      subjects,
    };

    setLoading(true);

    try {
      const BACKEND_API_URL =
        import.meta.env.VITE_API_URL_LOCAL || "http://localhost:5000";
      const response = await axios.post(
        `${BACKEND_API_URL}/api/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      navigate("/welcome");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An error occurred during signup"
        );
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg animate-slide-up">
        <h2 className="text-xl md:text-2xl font-bold text-purple-300 text-center mb-6">
          Sign Up
        </h2>

        {error && (
          <div className="bg-red-500 text-white text-sm md:text-base rounded p-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm md:text-base"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 text-white block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500 text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm md:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block text-white w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500 text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm md:text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block text-white w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500 text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 text-sm md:text-base"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 text-white block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-500 text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 text-center text-sm md:text-base">
              Select Jamb Subjects (max 4)
            </label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {subjectsList.map(({ value, label }) => (
                <div key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={value}
                    checked={subjects.includes(value)}
                    onChange={() => handleSubjectChange(value)}
                    className="mr-2 text-purple-500 focus:ring-purple-500"
                  />
                  <label
                    htmlFor={value}
                    className="text-gray-300 text-sm md:text-base"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-500 hover:bg-purple-600 transition duration-200 rounded text-white font-semibold text-sm md:text-base flex justify-center items-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M4 12a8 8 0 1 1 8 8"
                />
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm md:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
