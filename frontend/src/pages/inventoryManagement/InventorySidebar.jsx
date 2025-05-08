import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaTools,
  FaTruck,
  FaMinus,
  FaScroll,
} from "react-icons/fa";

const InventorySidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#27548A] to-[#1A365D] text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-[#1E4976]">
        Stock Management
      </div>
      <nav className="mt-6">
        <Link
          to="/mainhomepage"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/mainhomepage"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/mainhomepage")}
        >
          <FaHome className="text-pink-400 text-lg mr-3" />
          <span className="text-base">Home</span>
        </Link>
        <Link
          to="/inventory-dashboard"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/inventory-dashboard"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/inventory-dashboard")}
        >
          <FaChartBar className="text-yellow-400 text-lg mr-3" />
          <span className="text-base">Dashboard</span>
        </Link>
        <Link
          to="/inventories"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/inventories"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/inventories")}
        >
          <FaTools className="text-green-400 text-lg mr-3" />
          <span className="text-base">Daily Production</span>
        </Link>
        <Link
          to="/daily-distribution"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/daily-distribution"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/daily-distribution")}
        >
          <FaTruck className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Daily Distribution</span>
        </Link>
        <Link
          to="/daily-reduce"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/daily-reduce"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/daily-reduce")}
        >
          <FaMinus className="text-red-400 text-lg mr-3" />
          <span className="text-base">Daily Stock Reduce</span>
        </Link>
        <Link
          to="/inventory-record"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/inventory-record"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/inventory-record")}
        >
          <FaScroll className="text-orange-400 text-lg mr-3" />
          <span className="text-base">Stock Record</span>
        </Link>
      </nav>
    </div>
  );
};

export default InventorySidebar;
