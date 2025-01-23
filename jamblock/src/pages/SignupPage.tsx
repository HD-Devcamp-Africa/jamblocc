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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      alert("Passwords do not match");
      return;
    }

    if (!name || !email || !password || subjects.length === 0) {
      alert(
        "Please fill in all required fields and select at least one subject."
      );
      return;
    }

    const formData = {
      name,
      email,
      password,
      subjects,
    };

    setLoading(true); // Start the spinner

    try {
      const BACKEND_API_URL = import.meta.env.VITE_API_URL;
      console.log(BACKEND_API_URL);
      const response = await axios.post(
        `${BACKEND_API_URL}/api/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup successful:", response.data);
      const token = response.data.token;
      if (token) {
        // save the token to local storage
        localStorage.setItem("authToken", token);
      }
      // Redirect or handle successful signup here
      // const { redirectUrl } = response.data;
      navigate("/welcome");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("API Error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected Error:", err.message);
      }
    } finally {
      setLoading(false); // Stop the spinner after the request
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg animate-slide-up">
        <h2 className="text-xl md:text-2xl font-bold text-purple-300 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm md:text-base">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 text-white block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-green-500 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm md:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block text-white w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-green-500 text-sm md:text-base"
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
              className="mt-1 block text-white w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-green-500 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm md:text-base">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 text-white block w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-green-500 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm md:text-base">
              Select Subjects (max 4)
            </label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {subjectsList.map(({ value, label }) => (
                <div key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={value}
                    checked={subjects.includes(value)}
                    onChange={() => handleSubjectChange(value)}
                    className="mr-2 text-green-500 focus:ring-green-500"
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
          {/* <a href="/login" className="text-green-500 hover:underline">
            Log in
          </a> */}
          <Link to="/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
