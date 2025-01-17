// // Login.tsx
// import React, { useState } from "react";
// import { useAuth } from "../../../services/Admin/AuthContext";

// const Login: React.FC = () => {
//   const { login } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(username, password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-900 p-8 rounded shadow-lg space-y-4"
//       >
//         <h2 className="text-xl font-semibold">Admin Login</h2>
//         <div>
//           <label className="block text-sm font-medium mb-1">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-4 py-2 rounded bg-gray-800 border focus:outline-none focus:ring focus:ring-blue-300"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 rounded bg-gray-800 border focus:outline-none focus:ring focus:ring-blue-300"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
