import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("profileImage", profileImage);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/MainHomePage");
    }
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };
  

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full max-w-lg mx-auto flex flex-col items-center">
        <h1 className="text-[#d6482b] text-3xl font-extrabold mb-4 md:mb-6 text-center">Create Your Account</h1>
        <form className="w-full flex flex-col gap-6" onSubmit={handleRegister}>
          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-semibold">Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-semibold">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-semibold">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-semibold">Profile Image</label>
            <div className="flex items-center gap-4">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="profileImagePreview"
                className="w-16 h-16 rounded-full border border-gray-200 object-cover"
              />
              <input type="file" onChange={imageHandler} className="text-gray-600" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#d6482b] text-white font-semibold py-3 rounded-lg hover:bg-[#b8381e] transition-all duration-300 w-full mt-4"
            
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
