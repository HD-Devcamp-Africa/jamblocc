import React, { useState, useEffect } from "react";
import QuestionLayout from "../layout/QuestionLayout";
import QuestionCard from "./fetchCard/QuestionCard";
import ScrollToTopButton from "./ScrollToTop";
import axios from "axios";

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

const AllQUestionApiResponseDisplay: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [filteredData, setFilteredData] = useState<
    ApiResponse["data"][keyof ApiResponse["data"]] | null
  >(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [selectedSubject, setSelectedSubject] = useState<string>("english");
  const apiUrl = import.meta.env.REACT_APP_API;
  useEffect(() => {
    // Fetch the questions from your endpoint
    fetch("https://jamblock.onrender.com/api/questions/all-questions")
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
    if (apiResponse) {
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

  if (!filteredData) return null;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredData.map((item, index) => (
          <QuestionCard key={item._id} question={item.data} index={index + 1} />
        ))}
      </div>
      <ScrollToTopButton />
    </QuestionLayout>
  );
};

export default AllQUestionApiResponseDisplay;
