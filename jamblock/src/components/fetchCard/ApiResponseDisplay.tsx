// import React, { useState, useEffect } from "react";
// import QuestionLayout from "../../layout/QuestionLayout";
// import QuestionCard from "./QuestionCard";

// interface ApiResponse {
//   subject: string;
//   status: number;
//   data: {
//     id: number;
//     question: string;
//     option: { [key: string]: string };
//     answer: string;
//     section: string;
//     image: string;
//     solution: string;
//     examtype: string;
//     examyear: string;
//     questionNub: number | null;
//     hasPassage: number;
//     category: string;
//   }[];
// }

// const ApiResponseDisplay: React.FC = () => {
//   const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
//   const [filteredData, setFilteredData] = useState<ApiResponse["data"] | null>(
//     null
//   );
//   const [selectedOptions, setSelectedOptions] = useState<{
//     [key: number]: string;
//   }>({});

//   useEffect(() => {
//     import("../../api/api_response.json")
//       .then((response) => {
//         setApiResponse(response);
//         setFilteredData(response.data); // Initially, show all data
//       })
//       .catch((error) => console.error("Error loading JSON data:", error));
//   }, []);

//   const handleFilterChange = (filters: {
//     search: string;
//     years: string[];
//     subjects: string[];
//   }) => {
//     if (apiResponse) {
//       const { search, years, subjects } = filters;

//       const filtered = apiResponse.data.filter((item) => {
//         const matchesSearch = item.question
//           .toLowerCase()
//           .includes(search.toLowerCase());
//         const matchesYear = years.length ? years.includes(item.examyear) : true;
//         const matchesSubject = subjects.length
//           ? subjects.includes(item.category)
//           : true;
//         return matchesSearch && matchesYear && matchesSubject;
//       });

//       setFilteredData(filtered);
//     }
//   };

//   const handleOptionClick = (questionId: number, option: string) => {
//     setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
//   };

//   if (!filteredData) return null;

//   return (
//     <QuestionLayout onFilterChange={handleFilterChange}>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//         {filteredData.map((item, index) => (
//           <div
//             key={item.id}
//             className="border p-6 rounded-lg shadow-lg bg-white"
//           >
//             <h3 className="text-lg font-semibold mb-2">
//               {index + 1}. {item.question}
//             </h3>
//             <p className="text-sm text-gray-500 mb-2">
//               <strong>Subject:</strong> {apiResponse?.subject}
//             </p>
//             <p className="text-sm text-gray-500 mb-2">
//               <strong>Exam Type:</strong> {item.examtype}
//             </p>
//             <p className="text-sm text-gray-500 mb-4">
//               <strong>Category:</strong> {item.category} - {item.examyear}
//             </p>
//             <div className="options space-y-2">
//               {Object.entries(item.option).map(([key, value]) => (
//                 <button
//                   key={key}
//                   onClick={() => handleOptionClick(item.id, key)}
//                   className={`block w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
//                     selectedOptions[item.id] === key
//                       ? key === item.answer
//                         ? "bg-green-600 text-white"
//                         : "bg-red-700 text-white"
//                       : "bg-gray-100 hover:bg-gray-200"
//                   }`}
//                 >
//                   {value}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </QuestionLayout>
//   );
// };

// export default ApiResponseDisplay;

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
    </QuestionLayout>
  );
};

export default ApiResponseDisplay;
