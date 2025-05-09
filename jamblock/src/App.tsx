// App.tsx
import React, { useEffect } from "react";
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
import Exam from "./pages/Exam";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// import Login from "./pages/Admin/Login";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import Check from "./components/FeaturesCard";
import AllQuestionPage from "./pages/AllQuestionPage";
import ScrollToTopButton from "./components/ScrollToTop";
import { Provider, useDispatch } from "react-redux";
import store from "./reducx/store";
import { fetchQuestions } from "./reducx/questionSlice";
import ProfileCard from "./components/ProfileCard";

export function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // fetch data on app load (with default subject "english")
  //   dispatch(fetchQuestions("english"));
  // }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* protect this route later */}
        <Route path="/all-past-question" element={<AllQuestionPage />} />

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
            // <ProtectedRoute>
            <AccountSettings />
            // </ProtectedRoute>
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
        <Route path="/exam" element={<Exam />} />
        <Route
          path="/profile"
          element={
            <ProfileCard name="moses" balance={20} profilePicture="./" />
          }
        />

        {/* Catch-All Routes */}
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </Router>
  );
}
