// AccountSettings.tsx
import React, { useState } from "react";
// import { useAddress } from "@thirdweb-dev/react";
import { ConnectButton } from "thirdweb/react";
import { clientId } from "../client";
const AccountSettings: React.FC = () => {
  //   const address = useAddress(); // Fetch user's wallet address
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    course: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here, you can add logic to save the form data, such as sending it to a backend server
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="max-w-[600px] mx-auto p-5 font-sans border border-gray-200 rounded-lg shadow-md bg-white">
      <h1 className="text-center mb-5 text-gray-800">Account Settings</h1>

      {/* Wallet Connection */}
      <div className="mb-5 p-3 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-center mb-3">Wallet Connection</h3>
        <div className="flex justify-center">
          <ConnectButton client={clientId} />
        </div>
        {/* <div className="flex flex-col mb-4">
          <label htmlFor="walletAddress">Wallet Address</label>
          <input
            type="text"
            id="walletAddress"
            disabled
            className="p-2.5 text-base border border-gray-300 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div> */}
      </div>

      {/* Account Settings Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3>Personal Information</h3>
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="p-2.5 text-base border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="school">School</label>
          <input
            type="text"
            id="school"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            placeholder="Enter your school"
            className="p-2.5 text-base border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            placeholder="Enter your course"
            className="p-2.5 text-base border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="p-2.5 px-5 text-base text-white bg-purple-600 border-none rounded cursor-pointer hover:bg-purple-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
