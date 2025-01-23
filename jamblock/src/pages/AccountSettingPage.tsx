// AccountSettings.tsx
import React, { useState } from "react";
// import { useAddress } from "@thirdweb-dev/react";
import { ConnectButton } from "thirdweb/react";
import { clientId } from "../client";
import BottomNav from "../components/BottomNav";
const AccountSettings: React.FC = () => {
  //   const address = useAddress(); // Fetch user's wallet address
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    subject: "",
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
    <div className="max-w-[600px] mx-auto p-5 font-sans bg-gray-900 border rounded-lg shadow-md bg-white">
      <h1 className="text-center mb-5 text-gray-800">Account Settings</h1>

      {/* Wallet Connection */}
      <div className="mb-5 p-3 border border-gray-200 rounded-lg bg-gray-200">
        <h3 className="text-center font-bold mb-3">Wallet</h3>
        <div className="flex justify-center">
          <ConnectButton client={clientId} />
        </div>
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
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Enter your subject"
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

      <div>
        <BottomNav />
      </div>
    </div>
  );
};

export default AccountSettings;
