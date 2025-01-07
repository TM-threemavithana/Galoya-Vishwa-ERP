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
    <div className="w-64 bg-gradient-to-b from-green-900 to-green-700 text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-green-800">
        Business Cal
      </div>
      <nav classNme="mt-6">
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
          to="/pending-cal"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/pending-cal"
              ? "bg-green-800 scale-105 shadow-lg"
              : "hover:bg-green-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/pending-cal")}
        >
          <FaCalculator className="text-green-400 text-lg mr-3" />
          <span className="text-base">Calculator</span>
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
          <span className="text-base">Sale of Goods on Credit</span>
        </Link>
        <Link
          to="/calc-reports"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/calc-reports"
              ? "bg-green-800 scale-105 shadow-lg"
              : "hover:bg-green-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/calc-reports")}
        >
          <FaRegFileAlt className="text-orange-400 text-lg mr-3" />
          <span className="text-base">Reports</span>
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
