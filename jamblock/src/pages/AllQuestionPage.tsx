import React, { useEffect, useState } from "react";
import AllQUestionApiResponseDisplay from "../components/AllQUestionApiResponseDisplay";
import BottomNav from "../components/BottomNav";

const AllQuestionPage: React.FC = () => {
  return (
    <div>
      <AllQUestionApiResponseDisplay />

      <BottomNav />
    </div>
  );
};

export default AllQuestionPage;
