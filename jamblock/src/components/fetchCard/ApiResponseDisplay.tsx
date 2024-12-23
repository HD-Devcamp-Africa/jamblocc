
import React, { useState, useEffect } from 'react';
import QuestionLayout from '../../layout/QuestionLayout';
import QuestionCard from './QuestionCard';

interface ApiResponse {
  subject: string;
  status: number;
  data: {
    id: number;
    question: string;
    option: { [key: string]: string };
    answer: string;
    section: string;
    image: string;
    solution: string;
    examtype: string;
    examyear: string;
    questionNub: number | null;
    hasPassage: number;
    category: string;
  }[];
}

const ApiResponseDisplay: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [filteredData, setFilteredData] = useState<ApiResponse['data'] | null>(null);

  useEffect(() => {
    import('../../api/api_response.json')
      .then((response) => {
        setApiResponse(response);
        setFilteredData(response.data); // Initially, show all data
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  // const handleFilterChange = (filterValue: string) => {
  //   if (apiResponse) {
  //     const filtered = apiResponse.data.filter((item) =>
  //       item.question.toLowerCase().includes(filterValue.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   }
  // };

  const handleFilterChange = (filters: { search: string; years: string[]; subjects: string[] }) => {
    if (apiResponse) {
      const { search, years, subjects } = filters;
  
      const filtered = apiResponse.data.filter((item) => {
        const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase());
        const matchesYear = years.length ? years.includes(item.examyear) : true;
        const matchesSubject = subjects.length ? subjects.includes(item.category) : true;
        return matchesSearch && matchesYear && matchesSubject;
      });
  
      setFilteredData(filtered);
    }
  };
  

  if (!filteredData) return null;

  return (
    <QuestionLayout onFilterChange={handleFilterChange}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((item) => (
          <QuestionCard key={item.id} item={item} subject={apiResponse?.subject || ''} />
        ))}
      </div>
    </QuestionLayout>
  );
};

export default ApiResponseDisplay;

