import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TrustedBrands from "../components/TrustedBrands";
import BottomNav from "../components/BottomNav";

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      {/* <Features /> */}
      {/* Trusted Brands Section */}
      {/* <Dashboard/> */}
      {/* <TrustedBrands /> */}
      {/* Footer section */}
      {/* <Typewriter onComplete={handleTypingComplete}/> */}
      <Footer />
      <BottomNav />
    </div>
  );
};

export default LandingPage;
