import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LeaderboardData = [
  {
    id: 1,
    name: "Sheila.....",

    subjects: ["Agric", " English", "Biology", "Maths"],
  },
  {
    id: 2,
    name: "Sheila.....",
    subjects: ["Agric", " English", "Biology", "Hausa"],
  },
  {
    id: 3,
    name: "Sheila.....",
    subjects: ["Agric", " English", "Biology", "Igbo"],
  },
  {
    id: 4,
    name: "Sheila.....",
    subjects: ["Agric", " English", "Biology", "Physics"],
  },
  {
    id: 5,
    name: "Sheila.....",
    subjects: ["Agric", " English", "Biology", "Data science"],
  },
  {
    id: 6,
    name: "Sheila.....",
    subjects: ["Agric", " English", "Biology", "Animal"],
  },
  {
    id: 7,
    name: "Sheila.....",

    subjects: ["Chemistry", "Igbo", " English", "Biology"],
  },
  {
    id: 8,
    name: "Sheila.....",

    subjects: ["Agric", " English", "Biology", "Maths"],
  },
  {
    id: 9,
    name: "Sheila.....",

    subjects: ["Chemistry", "Maths", "Physics", "Goverment"],
  },
  //   {
  //     id: 10,
  //     name: "Sheila.....",
  //     status: 100,
  //     jobs: 20,
  //     earnings: "$20,000 USD",
  //     skills: ["Smart Contract", "Fullstack"],
  //   },
  //   {
  //     id: 11,
  //     name: "Sheila.....",
  //     status: 100,
  //     jobs: 20,
  //     earnings: "$20,000 USD",
  //     skills: ["Smart Contract", "Fullstack"],
  //   },
  //   {
  //     id: 14,
  //     name: "Sheila.....",
  //     status: 100,
  //     jobs: 20,
  //     earnings: "$20,000 USD",
  //     skills: ["Smart Contract", "Fullstack"],
  //   },
  //   {
  //     id: 15,
  //     name: "Sheila.....",
  //     status: 100,
  //     jobs: 20,
  //     earnings: "$20,000 USD",
  //     skills: ["Smart Contract", "Fullstack"],
  //   },
  //   {
  //     id: 16,
  //     name: "Sheila.....",
  //     status: 100,
  //     jobs: 20,
  //     earnings: "$20,000 USD",
  //     skills: ["Smart Contract", "Fullstack"],
  //   },
];

const Leaderb: React.FC = () => {
  return (
    <motion.div
      className="bg-white p-3 my-3 mx-2 border border-purple-400 rounded-lg shadow-lg hover:shadow-xl items-center text-center transition-shadow  duration-300 h-30"
      // variants={contentVariants}
      initial="hidden"
      // animate={controls}
    >
      <div>
        <h2 className="text-black font-bold text-sm md:text-lg lg:text-xl">
          Leaderboard
        </h2>
        {/* <section className="border-b-2 my-10 mx-auto text-center md:text-left w-md md:w-3xl border-gray-300 pb-3">
          <ul className="hidden md:flex flex-wrap justify-between w-full">
            <button className="font-bold text-sm text-gray-600 bg-gray-200 border border-1 border-gray-200 p-2 rounded-full cursor-pointer">
              All Gigs
            </button>
            <button className="text-gray-500 hover:text-blue-600 border border-1 border-gray-200 p-2 rounded-full cursor-pointer">
              Development
            </button>
            <button className="text-gray-500 hover:text-blue-600 border border-1 border-gray-200 p-2 rounded-full cursor-pointer">
              Design
            </button>
            <button className="text-gray-500 hover:text-blue-600 border border-1 border-gray-200 p-2 rounded-full cursor-pointer">
              Content
            </button>
          </ul>

          <select className="md:hidden block w-full border p-2 rounded">
            <option>All Gigs</option>
            <option> Design</option>
            <option>Development</option>
            <option>Content</option>
            <option value=""> Others</option>
          </select>
        </section> */}
      </div>
      <div className="w-full overflow-x-auto p-2 mb-10">
        <div className="w-full w-4xl md:w-[90%] mx-auto bg-gray-100 rounded-lg shadow-md p-3">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-semibold text-left">
                <th className="p-2 md:p-3">Ranking</th>
                <th className="p-2 md:p-3">Profile</th>
                <th className="p-2 md:p-3">Name</th>
                <th className="p-2 md:p-3"></th>
                <th className="p-2 md:p-3">Subjects</th>
                <th className="p-2 md:p-3"></th>
              </tr>
            </thead>
            <tbody>
              {LeaderboardData.map((student) => (
                <tr key={student.id} className="border-t border-gray-300">
                  <td className="p-2 md:p-3 text-black font-bold">
                    {student.id}.
                  </td>
                  <td className="p-2 md:p-3 flex items-center">
                    <img
                      src="/images/TalentProfile.png"
                      alt="Profile"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2"
                    />
                    {/* <span className="font-bold text-black">{job.name}</span> */}
                  </td>
                  <td className="p-2 md:p-3 text-black font-bold">
                    {student.name}
                  </td>
                  <td className="p-2 md:p-3 text-center">{}</td>
                  <td className="p-2 md:p-3">
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {student.subjects.map((subject, i) => (
                        <span
                          key={i}
                          className="bg-blue-900 text-white font-bold text-[10px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded-lg"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderb;
