import ApiResponseDisplay from "../components/fetchCard/ApiResponseDisplay";
import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import SearchFilterWithSidebar from '../components/SearchFilter';
import BottomNav from "../components/BottomNav";

const QuestionPage = () => {
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
  };

  return (
    <div>
      {/* This is the apiResponse component */}
      <ApiResponseDisplay />

      {/* Search filter component */}
      {/* <SearchFilterWithSidebar/> */}

      {/* <QuestionCard/> */}
      <BottomNav />
    </div>
  );
};

export default QuestionPage;
