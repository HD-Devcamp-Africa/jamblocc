import React, { useState, useEffect } from "react";
import QuestionLayout from "../../layout/QuestionLayout";
import QuestionCard from "./QuestionCard";
import axios from "axios";

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
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [registeredSubjects, setRegisteredSubjects] = useState<string[]>([]);

  // Fetch user profile and question data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const profileData = response.data;
        if (profileData.subjects && Array.isArray(profileData.subjects)) {
          setRegisteredSubjects(profileData.subjects);
          setSelectedSubject(profileData.subjects[0] || ""); // Default to the first subject
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/questions/all-questions"
        );
        const data = response.data;

        setApiResponse(data);

        if (registeredSubjects.length > 0) {
          const initialSubject = registeredSubjects[0];
          setSelectedSubject(initialSubject);

          if (data.data[initialSubject]) {
            setFilteredData(data.data[initialSubject]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (registeredSubjects.length > 0) {
      fetchQuestions();
    }
  }, [registeredSubjects]);

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
    if (apiResponse && apiResponse.data[subject]) {
      setFilteredData(apiResponse.data[subject]);
    } else {
      setFilteredData([]);
    }
  };

  const handleOptionClick = (questionId: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <QuestionLayout onFilterChange={handleFilterChange}>
      {/* Subject Selector */}
      <div className="mb-4">
        <select
          value={selectedSubject} // Bind the selectedSubject state
          onChange={(e) => handleSubjectChange(e.target.value)} // Call the handler on change
          className="p-2 border rounded"
        >
          {registeredSubjects.map((subject) => (
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
