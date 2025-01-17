// ApiResponse.tsx
import React from "react";

const ApiResponse: React.FC<{ apiResponse: any }> = ({ apiResponse }) => {
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold">API Response:</h3>
      <pre className="text-sm bg-gray-900 p-4 rounded-lg overflow-auto">
        {JSON.stringify(apiResponse, null, 2)}
      </pre>
    </div>
  );
};

export default ApiResponse;
