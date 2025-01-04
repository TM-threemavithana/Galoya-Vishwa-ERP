import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/mainhomepage");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-[#d6482b] text-3xl font-extrabold mb-6 text-center">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:border-[#d6482b] focus:ring-2 focus:ring-[#d6482b] outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#d6482b] text-white font-semibold py-3 rounded-lg hover:bg-[#b8381e] transition-all duration-300 w-full mt-4"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
