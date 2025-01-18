// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WaitlistPage from "./pages/WaitlistPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import QuestionPage from "./pages/QuestionPage";
import Dashboard from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import AccountSettings from "./pages/AccountSettingPage";
import Airdop from "./pages/Airdrop";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// import Login from "./pages/Admin/Login";
import ProtectedRoute from "./middlewares/ProtectedRoute";

export function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<LandingPage />} /> */}

        {/* <Route path="/" element={<LandingPage />} /> */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/about/" element={<AboutPage />} />

        {/* User Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/account-setting"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/airdrop" element={<Airdop />} />

        {/* Catch-All Routes */}
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </Router>
  );
}
