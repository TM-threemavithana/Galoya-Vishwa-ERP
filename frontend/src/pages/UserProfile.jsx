import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "@/custom-components/Spinner";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/profile");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-lg w-full max-w-4xl p-8 mt-10 shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={user.profileImage?.url}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg"
            />
            <h2 className="text-3xl font-bold mt-4">{user.userName}</h2>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Email" value={user.email} />
              <InputField label="Phone" value={user.phone} type="number" />
              <InputField label="Address" value={user.address} />
              <InputField label="Joined On" value={user.createdAt?.substring(0, 10)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const InputField = ({ label, value, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        disabled
      />
    </div>
  );
};

export default UserProfile;