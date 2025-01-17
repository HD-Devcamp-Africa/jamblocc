import React, { useState, useEffect } from "react";
import QuestionLayout from "../../layout/QuestionLayout";
import QuestionCard from "./QuestionCard";

// The expected shape of the API response
interface ApiResponse {
  message: string;
  data: {
    [key: string]: {
      _id: string;
      subject: string;
      status: number;
      data: {
        id: number;
        question: string;
        option: { [key: string]: string };
        answer: string;
        section: string;
        image: string;
        solution: string;
        examtype: string;
        examyear: string;
        questionNub: number | null;
        hasPassage: number;
        category: string;
      };
      __v: number;
    }[];
  };
}

const ApiResponseDisplay: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [filteredData, setFilteredData] = useState<
    ApiResponse["data"][keyof ApiResponse["data"]] | null
  >(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [selectedSubject, setSelectedSubject] = useState<string>("english");

  useEffect(() => {
    // Fetch the questions from your endpoint
    fetch("http://localhost:5000/api/questions/all-questions")
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
        setFilteredData(data.data[selectedSubject]); // Initially, show data from the 'english' subject
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedSubject]); // Re-fetch when the selected subject changes

  const handleFilterChange = (filters: {
    search: string;
    years: string[];
    subjects: string[];
  }) => {
    if (apiResponse && selectedSubject) {
      const { search, years, subjects } = filters;

      const filtered = apiResponse.data[selectedSubject].filter((item) => {
        const matchesSearch = item.data.question
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesYear = years.length
          ? years.includes(item.data.examyear)
          : true;
        const matchesSubject = subjects.length
          ? subjects.includes(item.data.category)
          : true;
        return matchesSearch && matchesYear && matchesSubject;
      });

      setFilteredData(filtered);
    }
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleOptionClick = (questionId: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <QuestionLayout onFilterChange={handleFilterChange}>
      {/* Subject Selector */}
      <div className="mb-4">
        <select
          value={selectedSubject}
          onChange={(e) => handleSubjectChange(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(apiResponse?.data || {}).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Data Display */}
      {filteredData && filteredData.length > 0 ? (
        <div className="grid bg-gradient-to-r from-gray-700 to-purple-900 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredData.map((item, index) => (
            <QuestionCard
              key={item._id}
              question={item.data}
              index={index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-200 rounded-md border border-gray-400 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M9 6v12m6-12v12m-6 0h6m-6 0V6m6 0H9"
            />
          </svg>
          <p className="text-lg">No questions available at the moment</p>
        </div>
      )}
    </QuestionLayout>
  );
};

export default ApiResponseDisplay;
