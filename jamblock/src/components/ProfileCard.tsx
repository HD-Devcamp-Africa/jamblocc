import React from "react";

interface ProfileCardProps {
  name: string;
  balance: number;
  profilePicture: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  balance,
  profilePicture,
}) => {
  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-900 rounded-lg shadow-md text-white">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500">
          <img
            src={profilePicture}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="mt-4 text-2xl font-semibold">{name}</h2>

        {/* Balance */}
        <div className="mt-2 bg-gradient-to-r from-purple-300 to-purple-800 px-4 py-2 rounded-lg">
          <p className="text-lg font-medium">Balance</p>
          <p className="text-xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
