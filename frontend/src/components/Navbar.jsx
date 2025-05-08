import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiBell } from "react-icons/fi"; // Importing icons from react-icons
import logo from "../assets/logo.png"; // Importing logo

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      {/* Logo and Link to Home */}
      <Link to="/mainhomepage">
        <img
          src={logo}
          className="h-16 hover:scale-105 transition-transform duration-300"
          alt="Company Logo"
        />
      </Link>

      {/* Company Title */}
      <h1 className="text-2xl font-semibold tracking-wide hover:text-gray-200 transition-colors duration-300">
        Galoya Wishwa Dairy Products
      </h1>

      {/* Icons for Logout and Notifications */}
      <div className="flex items-center gap-6">
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

        {/* Logout Button */}
        <button className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300">
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
