import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WaitlistPage from "./pages/WaitlistPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import QuestionPage from "./pages/QuestionPage";
import Dashboard from "./pages/DashboardPage";
import Typewriter from "./components/TypeWriter";
import AboutPage from "./pages/AboutPage";
import ExamPage from "./pages/ExamPage";
import AccountSettings from "./pages/AccountSettingPage";
// import ProtectedRoute from "./middlewares/ProtectedRoute";

// Testing the typewriter component
const handleTypingComplete = () => {
  console.log("Typing completed! Proceeding to the next function...");
  // Add the next function logic here
};

export function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Other routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />

        <Route path="/questions" element={<QuestionPage />} />

        <Route path="/about/" element={<AboutPage />} />

        {/* Protected Routes */}
        {/* Add protection using middleware here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-setting" element={<AccountSettings />} />

        {/* <Route path="/exams" element={<ExamPage />} /> */}

        {/* Catch-All Routes */}
        <Route path="*" element={<ComingSoonPage />} />
        <Route path="/test/*" element={<ComingSoonPage />} />
      </Routes>
    </Router>
  );
}
