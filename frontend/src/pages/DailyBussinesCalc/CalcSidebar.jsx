import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaCalculator,
  FaFileAlt,
  FaMoneyBillWave,
  FaHome,
  FaRegFileAlt,
} from "react-icons/fa";

const CalcSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#27548A] to-[#1A365D] text-white min-h-screen shadow-lg">
      <div className="p-4 text-lg font-bold border-b border-[#1E4976]">
        Daily Business Calculator
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
          to="/distributed-list"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/distributed-list"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/distributed-list")}
        >
          <FaCalculator className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Daily Calculator</span>
        </Link>
        <Link
          to="/calc-records"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/calc-records"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/calc-records")}
        >
          <FaFileAlt className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Business Records</span>
        </Link>
        {/* <Link
          to="/credit-sales"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/credit-sales"
              ? "bg-green-800 scale-105 shadow-lg"
              : "hover:bg-green-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/credit-sales")}
        >
          <FaMoneyBillWave className="text-red-400 text-lg mr-3" />
          <span className="text-base">Credit Sales</span>
        </Link> */}
        <Link
          to="/calc-reports"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/calc-report"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/calc-reports")}
        >
          <span className="mr-2">🛒</span>
          Shop Details
        </Link>
        
      </nav>
    </div>
  );
};

export default CalcSidebar;
