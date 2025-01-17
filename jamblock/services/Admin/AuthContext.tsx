// // AuthContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const login = async (username: string, password: string) => {
//     // Replace this mock API call with a real one
//     if (username === "admin" && password === "password123") {
//       setIsAuthenticated(true);
//       navigate("/admin-dashboard");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
