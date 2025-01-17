// AdminDashboard.tsx
import React from "react";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import FetchQuestionsForm from "../../components/Admin/FetchQuestionForm";
import CreateQuestionForm from "../../components/Admin/CreateQuestionForm";
import ApiResponse from "../../components/Admin/ApiResponse";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="p-6 flex-1">
          <FetchQuestionsForm />
          <CreateQuestionForm />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

// import React, { useState } from "react";
// import { FiSave, FiEdit, FiTrash } from "react-icons/fi";
// import { FaPlus, FaUserCircle, FaClipboardList } from "react-icons/fa";
// import { BiStats } from "react-icons/bi";
// import axios from "axios";

// const AdminDashboard: React.FC = () => {
//   const [questionData, setQuestionData] = useState({
//     subject: "",
//     question: "",
//     option: { a: "", b: "", c: "", d: "", e: "" },
//     answer: "",
//     solution: "",
//     examtype: "",
//     examyear: "",
//   });

//   const [apiSubject, setApiSubject] = useState("");
//   const [apiRandom, setApiRandom] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: string
//   ) => {
//     if (field.startsWith("option.")) {
//       const key = field.split(".")[1];
//       setQuestionData((prev) => ({
//         ...prev,
//         option: { ...prev.option, [key]: e.target.value },
//       }));
//     } else {
//       setQuestionData((prev) => ({ ...prev, [field]: e.target.value }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitting Data:", questionData);
//   };

//   const handleApiSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(
//         `https://questions.aloc.com.ng/api/v2/q`,
//         {
//           params: { subject: apiSubject, random: apiRandom },
//           headers: {
//             AccessToken: "ALOC-ccc913cc887c0d2e4c2d",
//           },
//         }
//       );
//       setApiResponse(response.data);
//     } catch (error) {
//       console.error("Error fetching API data:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 text-gray-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
//         <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded flex items-center">
//           <FaPlus className="mr-2" /> Add New Question
//         </button>
//       </header>

//       {/* Sidebar and Content Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="bg-gray-900 w-64 py-6 px-4 flex flex-col space-y-6">
//           <div className="flex items-center space-x-3">
//             <FaUserCircle size={30} />
//             <span className="text-lg font-semibold">Admin Profile</span>
//           </div>
//           <nav className="space-y-4">
//             <a
//               href="#"
//               className="flex items-center space-x-3 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
//             >
//               <FaClipboardList />
//               <span>Manage Questions</span>
//             </a>
//             <a
//               href="#"
//               className="flex items-center space-x-3 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
//             >
//               <BiStats />
//               <span>Statistics</span>
//             </a>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="p-6 flex-1">
//           <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
//             <h2 className="text-xl font-semibold mb-4">Fetch Questions</h2>
//             <form onSubmit={handleApiSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={apiSubject}
//                   onChange={(e) => setApiSubject(e.target.value)}
//                   className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                   placeholder="e.g., English"
//                   required
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={apiRandom}
//                   onChange={(e) => setApiRandom(e.target.checked)}
//                   className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
//                 />
//                 <label className="text-sm">Random</label>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
//               >
//                 Fetch Data
//               </button>
//             </form>

//             {apiResponse && (
//               <div className="mt-4 p-4 bg-gray-800 rounded-lg">
//                 <h3 className="text-lg font-semibold">API Response:</h3>
//                 <pre className="text-sm bg-gray-900 p-4 rounded-lg overflow-auto">
//                   {JSON.stringify(apiResponse, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Create Question</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={questionData.subject}
//                   onChange={(e) => handleChange(e, "subject")}
//                   className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                   placeholder="e.g., Mathematics"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Question
//                 </label>
//                 <textarea
//                   value={questionData.question}
//                   onChange={(e) => handleChange(e, "question")}
//                   className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                   placeholder="Enter the question here"
//                   required
//                 ></textarea>
//               </div>

//               {Object.entries(questionData.option).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium mb-1">
//                     Option {key.toUpperCase()}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleChange(e, `option.${key}`)}
//                     className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                     placeholder={`Enter option ${key.toUpperCase()}`}
//                   />
//                 </div>
//               ))}

//               <div>
//                 <label className="block text-sm font-medium mb-1">Answer</label>
//                 <input
//                   type="text"
//                   value={questionData.answer}
//                   onChange={(e) => handleChange(e, "answer")}
//                   className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                   placeholder="e.g., c"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Solution
//                 </label>
//                 <textarea
//                   value={questionData.solution}
//                   onChange={(e) => handleChange(e, "solution")}
//                   className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                   placeholder="Explain the solution"
//                   required
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Exam Type
//                   </label>
//                   <input
//                     type="text"
//                     value={questionData.examtype}
//                     onChange={(e) => handleChange(e, "examtype")}
//                     className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                     placeholder="e.g., UTME"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Exam Year
//                   </label>
//                   <input
//                     type="text"
//                     value={questionData.examyear}
//                     onChange={(e) => handleChange(e, "examyear")}
//                     className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                     placeholder="e.g., 2014"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow flex items-center"
//                 >
//                   <FiSave className="mr-2" /> Save Question
//                 </button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
