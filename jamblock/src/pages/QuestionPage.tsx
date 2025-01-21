import React, { useEffect, useState } from "react";
import ApiResponseDisplay from "../components/fetchCard/ApiResponseDisplay";
import BottomNav from "../components/BottomNav";

const QuestionPage: React.FC = () => {
  return (
    <div>
      <ApiResponseDisplay />

      <BottomNav />
    </div>
  );
};

export default QuestionPage;
