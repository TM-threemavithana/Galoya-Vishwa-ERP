import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiBell, FiUserPlus, FiLogIn, FiUser } from "react-icons/fi"; // Modern icons from react-icons
import logo from "@/assets/logo.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div
      className="flex items-center justify-between py-4 px-8 bg-gradient-to-r from-green-800 via-green-600 to-green-800 text-white shadow-md relative"
      style={{
        boxShadow: "0 0 15px rgba(34, 139, 34, 0.7)", // Glowing green shadow effect
      }}
    >
      {/* Glowing effect around the navbar */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-600 to-green-800 blur-md opacity-20 pointer-events-none"></div>

      {/* Logo and Link to Home */}
      <Link to="/mainhomepage">
        <img
          src={logo}
          className="h-20 ml-8 hover:scale-105 transition-transform duration-300"
          alt="Company Logo"
        />
      </Link>

      {/* Company Title */}
      <h1 className="text-2xl font-semibold tracking-wide hover:text-gray-200 transition-colors duration-300">
        Galoya Wishwa Dairy Products
      </h1>

      {/* Auth Section */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex items-center gap-6`}
      >
        {!isAuthenticated ? (
          <>
            {/* Sign Up Button */}
            <Link
              to={"/sign-up"}
              className="flex items-center gap-2 bg-yellow-500 text-black font-semibold hover:bg-yellow-400 hover:text-gray-900 text-lg py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
            >
              <FiUserPlus size={18} />
              Sign Up
            </Link>

            {/* Login Button */}
            <Link
              to={"/login"}
              className="flex items-center gap-2 text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
            >
              <FiLogIn size={18} />
              Login
            </Link>
          </>
        ) : (
          <>
            {/* Profile Link */}
            <Link
              to="/profile"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FiUser size={24} />
              <span>Profile</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white font-semibold hover:bg-red-600 text-lg py-2 px-4 rounded-lg transition-all duration-300 shadow-lg"
            >
              <FiLogOut size={18} />
              Logout
            </button>

            {/* Notification Icon */}
            <div className="relative group">
              <FiBell
                size={24}
                className="cursor-pointer hover:text-yellow-300 transition-colors duration-300"
              />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;