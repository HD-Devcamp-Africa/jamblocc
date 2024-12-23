// FetchCard.jsx
import React, { useState } from "react";
import InputForm from "./InputForm";
import ErrorDisplay from "./ErrorDisplay";
import ApiResponseDisplay from "./ApiResponseDisplay";

const FetchCard = () => {
  const [formData, setFormData] = useState({ year: "", examType: "" });
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!formData.year || isNaN(Number(formData.year))) {
      setError("Please enter a valid numeric year.");
      return false;
    }
    if (!formData.examType) {
      setError("Please enter the exam type.");
      return false;
    }
    setError(null);
    return true;
  };

  const fetchData = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Fetch Question Data</h2>
        <InputForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <ErrorDisplay error={error} />
        <ApiResponseDisplay apiResponse={apiResponse} />
      </div>
    </div>
  );
};

export default FetchCard;
