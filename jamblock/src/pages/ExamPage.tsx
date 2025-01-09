import ApiResponseDisplay from "../components/fetchCard/ApiResponseDisplay";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import SearchFilterWithSidebar from '../components/SearchFilter';
import BottomNav from "../components/BottomNav";
import PrizeModal from "../components/PrizeModal";
import WalletConnect from "../components/ConnectWallet";
const ExampPage = () => {
  // For claiming prizes
  const [showPrize, setShowPrize] = useState(true);
  const [prizeClaimed, setPrizeClaimed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(100);

  const claimPrize = () => {
    setPrizeClaimed(true);
    setShowModal(true);
  };

  const [formData, setFormData] = useState({
    year: "",
    examType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("Submitted Data:", formData);
      setLoading(false);
    }, 2000);

    return (
      <div>
        <Navbar />
        <div className="text-center  mt-40">
          <WalletConnect />
          <PrizeModal
            showPrize={showPrize}
            prizeClaimed={prizeClaimed}
            showModal={showModal}
            score={score}
            claimPrize={claimPrize}
          />
        </div>
        {/* <QuestionCard/> */}
        <BottomNav />
      </div>
    );
  };
};

export default ExampPage;
