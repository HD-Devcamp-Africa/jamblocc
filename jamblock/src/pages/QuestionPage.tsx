// import ApiResponseDisplay from '../components/fetchCard/ApiResponseDisplay'; // Ensure this path is correct
import ApiResponseDisplay from '../components/fetchCard/ApiResponseDisplay';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
// import SearchFilterWithSidebar from '../components/SearchFilter';
import QuestionCard from '../components/fetchCard/QuestionCard';
import BottomNav from '../components/BottomNav';

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
          {/* <Navbar/> */}
        
            {/* <ApiResponseDisplay/> */}
            {/* <ErrorDisplay error={"Unable to move"}/> */}
            {/* <InputForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      loading={loading}
    /> */}

    {/* This is the dashboard */}
    {/* <Dashboard /> */}

    {/* This is the apiResponse component */}
    <ApiResponseDisplay/>


    {/* Search filter component */}
    {/* <SearchFilterWithSidebar/> */}

    {/* <QuestionCard/> */}
    <BottomNav/>
        </div>
    )}
    
export default QuestionPage;
