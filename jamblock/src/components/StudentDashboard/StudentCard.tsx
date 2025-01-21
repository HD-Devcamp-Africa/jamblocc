// import React from 'react';
// import { motion } from 'framer-motion';

// const StudentCard = ({ name, email, subjects, verified }) => {
//   return (
//     <motion.div
//       className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
//       whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
//     >
//       <h2 className="text-xl font-semibold">{name}</h2>
//       <p className="text-gray-600">{email}</p>
//       <div className="mt-2">
//         <h3 className="font-medium">Subjects:</h3>
//         <ul className="list-disc list-inside">
//           {subjects.map((subject, index) => (
//             <li key={index} className="text-gray-500">{subject}</li>
//           ))}
//         </ul>
//       </div>
//       <div className={`mt-4 ${verified ? 'text-green-500' : 'text-red-500'}`}>
//         {verified ? 'Verified Student' : 'Not Verified'}
//       </div>
//     </motion.div>
//   );
// };

// export default StudentCard;
