import React, { useState } from "react";
import axios from "axios";
import { ConnectButton } from "thirdweb/react";
import { clientId } from "../client";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

const AccountSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-dashboard",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mt-20 max-w-[600px] mx-auto p-5 font-sans bg-gray-900 border rounded-lg shadow-md bg-white">
      <h1 className="text-center mb-5 text-gray-800">Account Settings</h1>

      <div className="mb-5 p-3 border border-gray-200 rounded-lg bg-gray-200">
        <h3 className="text-center font-bold mb-3">Wallet</h3>
        <div className="flex justify-center">
          <ConnectButton client={clientId} />
        </div>
      </div>

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
          <label htmlFor="profileImage">Profile Picture</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2.5 text-base border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className={`w-full p-2.5 text-base text-white rounded cursor-pointer ${
              loading ? "bg-gray-500" : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full p-2.5 text-base text-white bg-gray-500 rounded cursor-pointer hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      <div>
        <BottomNav />
      </div>
    </div>
  );
};

export default AccountSettings;
