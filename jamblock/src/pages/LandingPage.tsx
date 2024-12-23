import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
const LandingPage = () => {
  return (
    <div className=" min-h-screen font-sans">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <Features />
      {/* Footer section */}
       <Footer />
    </div>
  );
};

export default LandingPage;
