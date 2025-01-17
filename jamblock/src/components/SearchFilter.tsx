
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaFilter, FaTimes } from "react-icons/fa";

// // Mock API response
// const mockApiResponse = [
//   { subject: "English Language", year: 2003, content: "Sample Question 1" },
//   { subject: "Mathematics", year: 2006, content: "Sample Question 2" },
//   { subject: "Biology", year: 2010, content: "Sample Question 3" },
//   { subject: "Commerce", year: 2016, content: "Sample Question 4" },
//   { subject: "Physics", year: 2009, content: "Sample Question 5" },
//   // Add more data as needed
// ];

// type ApiResponseProps = {
//   filteredData: { subject: string; year: number; content: string }[];
// };

// const ApiResponse: React.FC<ApiResponseProps> = ({ filteredData }) => {
//   return (
//     <div className="p-4">
//       <h3 className="text-lg font-semibold">Filtered API Results</h3>
//       {filteredData.length > 0 ? (
//         <ul className="mt-2 space-y-2">
//           {filteredData.map((item, index) => (
//             <li key={index} className="p-2 border rounded-lg bg-gray-800 text-white">
//               <strong>{item.subject}</strong> ({item.year}): {item.content}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="mt-2 text-gray-500">No matching results from the API.</p>
//       )}
//     </div>
//   );
// };

// const SearchFilterWithSidebar: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
//   const [selectedYears, setSelectedYears] = useState<number[]>([]);
//   const [apiData, setApiData] = useState(mockApiResponse);
//   const [filteredApiData, setFilteredApiData] = useState(mockApiResponse);

//   useEffect(() => {
//     // Filter API data based on selected subjects and years
//     const filtered = apiData.filter(
//       (item) =>
//         (selectedSubjects.length === 0 || selectedSubjects.includes(item.subject)) &&
//         (selectedYears.length === 0 || selectedYears.includes(item.year))
//     );
//     setFilteredApiData(filtered);
//   }, [selectedSubjects, selectedYears, apiData]);

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const handleSubjectChange = (subject: string) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
//     );
//   };

//   const handleYearChange = (year: number) => {
//     setSelectedYears((prev) =>
//       prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
//     );
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-900 text-white">
//       {/* Sidebar */}
//       <div className="w-16 bg-purple-800 flex flex-col items-center py-4">
//         <button
//           className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
//           onClick={toggleModal}
//         >
//           <FaFilter size={20} />
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <ApiResponse filteredData={filteredApiData} />
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <motion.div
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ duration: 0.3 }}
//           className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white text-purple-900 shadow-lg z-50"
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold">Filter Questions</h2>
//               <button
//                 className="text-purple-900 hover:text-purple-500"
//                 onClick={toggleModal}
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>

//             {/* Subjects */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold">Subjects</h3>
//               <div className="grid grid-cols-2 gap-4 mt-2">
//                 {Array.from(new Set(apiData.map((item) => item.subject))).map((subject) => (
//                   <label
//                     key={subject}
//                     className="flex items-center gap-2 cursor-pointer hover:text-purple-500"
//                   >
//                     <input
//                       type="checkbox"
//                       className="text-purple-600"
//                       onChange={() => handleSubjectChange(subject)}
//                       checked={selectedSubjects.includes(subject)}
//                     />
//                     {subject}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Years */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold">Years</h3>
//               <div className="grid grid-cols-4 gap-4 mt-2">
//                 {Array.from(new Set(apiData.map((item) => item.year))).map((year) => (
//                   <label
//                     key={year}
//                     className="flex items-center gap-2 cursor-pointer hover:text-purple-500"
//                   >
//                     <input
//                       type="checkbox"
//                       className="text-purple-600"
//                       onChange={() => handleYearChange(year)}
//                       checked={selectedYears.includes(year)}
//                     />
//                     {year}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SearchFilterWithSidebar;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

type SubjectData = {
  [key: string]: number[];
};

const subjectsData: SubjectData = {
  "English Language": [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
  Mathematics: [2006, 2007, 2008, 2009, 2013],
  Commerce: [1900, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2016],
  Accounting: [1997, 2004, 2006, 2007, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  Biology: [2003, 2004, 2005, 2006, 2008, 2009, 2010, 2011, 2012],
  Physics: [2006, 2007, 2009, 2010, 2011, 2012],
  Chemistry: [2001, 2002, 2003, 2004, 2005, 2006, 2010],
  "English Literature": [2006, 2007, 2008, 2009, 2010, 2012, 2013, 2015],
  Government: [1999, 2006, 2007, 2008, 2009, 2000, 2010, 2011, 2012, 2013, 2016],
  "Christian Religious Knowledge": [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2015],
  Geography: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
  Economics: [2001, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
  "Islamic Religious Knowledge": [2012],
  "Civic Education": [2011, 2012, 2013, 2014, 2015, 2016],
  Insurance: [1, 2, 3, 4, 5, 2014, 2015],
  "Current Affairs": [2013],
  History: [2013],
};

const SearchFilterWithSidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isApiSidebarOpen, setIsApiSidebarOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleApiSidebar = () => setIsApiSidebarOpen(!isApiSidebarOpen);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleYearChange = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const filteredResults = Object.entries(subjectsData)
    .filter(([subject]) => selectedSubjects.length === 0 || selectedSubjects.includes(subject))
    .map(([subject, years]) => ({
      subject,
      years: years.filter((year) => selectedYears.length === 0 || selectedYears.includes(year)),
    }))
    .filter(({ years }) => years.length > 0);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-16 bg-purple-800 flex flex-col items-center py-4">
        <button
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors mb-4"
          onClick={toggleModal}
        >
          <FaFilter size={20} />
        </button>
        <button
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
          onClick={toggleApiSidebar}
        >
          <FaFilter size={20} />
        </button>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white text-purple-900 shadow-lg z-50"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filter Questions</h2>
              <button
                className="text-purple-900 hover:text-purple-500"
                onClick={toggleModal}
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Subjects</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.keys(subjectsData).map((subject) => (
                  <label
                    key={subject}
                    className="flex items-center gap-2 cursor-pointer hover:text-purple-500"
                  >
                    <input
                      type="checkbox"
                      className="text-purple-600"
                      onChange={() => handleSubjectChange(subject)}
                      checked={selectedSubjects.includes(subject)}
                    />
                    {subject}
                  </label>
                ))}
              </div>
            </div>

            {/* Years */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Years</h3>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {Array.from(new Set(Object.values(subjectsData).flat())).map((year) => (
                  <label
                    key={year}
                    className="flex items-center gap-2 cursor-pointer hover:text-purple-500"
                  >
                    <input
                      type="checkbox"
                      className="text-purple-600"
                      onChange={() => handleYearChange(year)}
                      checked={selectedYears.includes(year)}
                    />
                    {year}
                  </label>
                ))}
              </div>
            </div>

            {/* Filtered Results */}
            <div>
              <h3 className="text-lg font-semibold">Filtered Results</h3>
              {filteredResults.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {filteredResults.map(({ subject, years }) => (
                    <li key={subject}>
                      <strong>{subject}</strong>: {years.join(", ")}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-500">No results match the selected filters.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* API Sidebar */}
      {isApiSidebarOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-800 text-white shadow-lg z-50"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">API Results</h2>
              <button
                className="text-white hover:text-gray-500"
                onClick={toggleApiSidebar}
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div>
              <p>Display API-related results here...</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilterWithSidebar;
