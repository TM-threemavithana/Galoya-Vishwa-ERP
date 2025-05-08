import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUserPlus, FiLogIn, FiUser } from "react-icons/fi"; // Removed FiBell
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
    <div className="flex items-center justify-between py-4 px-8 bg-[#27548A] text-white shadow-md relative">
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
        className={`${menuOpen ? "flex" : "hidden"} md:flex items-center gap-6`}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
