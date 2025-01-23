import React, { useState } from "react";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

const FetchQuestionsForm: React.FC = () => {
  const [apiSubject, setApiSubject] = useState("");
  const [apiRandom, setApiRandom] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  const handleApiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    setLoading(true); // Start loading spinner

    try {
      const response = await axios.get(
        `https://jamblock.onrender.com/api/questions/fetch-and-store`,
        {
          params: { subject: apiSubject, random: apiRandom },
          headers: {
            AccessToken: ACCESS_TOKEN,
          },
        }
      );
      setApiResponse(response.data);
      setIsSubmitted(true); // Show success tick
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Fetch Questions</h2>
      <form onSubmit={handleApiSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={apiSubject}
            onChange={(e) => setApiSubject(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
            placeholder="e.g., English"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={apiRandom}
            onChange={(e) => setApiRandom(e.target.checked)}
            className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
          />
          <label className="text-sm">Random</label>
        </div>
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow flex items-center justify-center`}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ImSpinner8 className="animate-spin h-5 w-5" />
          ) : (
            <>Fetch Data {isSubmitted && <FiCheck className="ml-2" />}</>
          )}
        </button>
      </form>

      {apiResponse && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold">API Response:</h3>
          <pre className="text-sm bg-gray-900 p-4 rounded-lg overflow-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FetchQuestionsForm;
