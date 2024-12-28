import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TrustedBrands from "../components/TrustedBrands";
import Typewriter from "../components/TypeWriter";
import BottomNav from "../components/BottomNav";
import PrizeModal from "../components/PrizeModal";
import { useState } from "react";

const LandingPage = () => {
  // For claiming token
  const [showPrize, setShowPrize] = useState(true);
  const [prizeClaimed, setPrizeClaimed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(100);

  const claimPrize = () => {
    setPrizeClaimed(true);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      {/* <Features /> */}
      {/* Trusted Brands Section */}
      {/* <Dashboard/> */}
      {/* <TrustedBrands /> */}
      <PrizeModal
        showPrize={showPrize}
        prizeClaimed={prizeClaimed}
        showModal={showModal}
        score={score}
        claimPrize={claimPrize}
      />
      {/* Footer section */}

      {/* <Typewriter onComplete={handleTypingComplete}/> */}
      {/* <Footer /> */}
      <BottomNav />
    </div>
  );
};

export default LandingPage;
