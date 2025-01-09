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
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 overflow-y-auto">
      <div className="p-4 text-lg font-bold">Daily Business Calculator</div>
      <nav className="mt-6">
        <Link
          to="/calc-dashboard"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/calc-dashboard"
              ? "bg-green-800 scale-105 shadow-lg"
              : "hover:bg-green-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/calc-dashboard")}
        >
          <FaChartBar className="text-yellow-400 text-lg mr-3" />
          <span className="text-base">Dashboard</span>
        </Link>
        <Link
          to="/calculator"
          className={`flex items-center p-2 mb-4 ${activeLink === "/calculator" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleLinkClick("/calculator")}
        >
          <span className="mr-2">🧮</span>
          Calculator
        </Link>
        <Link
          to="/calc-records"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/calc-records"
              ? "bg-green-800 scale-105 shadow-lg"
              : "hover:bg-green-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/calc-records")}
        >
          <FaFileAlt className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Business Records</span>
        </Link>
        <Link
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
        </Link>
        <Link
          to="/calc-reports"
          className={`flex items-center p-2 mb-4 ${activeLink === "/calc-reports" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleLinkClick("/calc-reports")}
        >
          <span className="mr-2">📊</span>
          Reports
        </Link>
        <Link
          to="/mainhomepage"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/mainhomepage"
              ? "bg-green-800 scale-105 shadow-lg"
              : "hover:bg-green-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/mainhomepage")}
        >
          <FaHome className="text-pink-400 text-lg mr-3" />
          <span className="text-base">Home</span>
        </Link>
      </nav>
    </div>
  );
};

export default CalcSidebar;
