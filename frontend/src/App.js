import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "@lottiefiles/lottie-player"/;
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WaitlistPage from "./pages/WaitlistPage";
import LandingPage from "./pages/LandingPage";
import "./index.css";
import "./App.css";
import ComingSoonPage from "./pages/ComingSoonPage";
function App() {
  return (
    <Router>
      {/* <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 to-gray-800 text-white"> */}
      {/* Routes */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
