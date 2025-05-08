import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaTools,
  FaWrench,
  FaPlus,
  FaFileAlt,
} from "react-icons/fa";

const MachineSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#27548A] to-[#1A365D] text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-[#1E4976]">
        Machine Maintenance
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
          to="/machine-dashboard"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/machine-dashboard"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/machine-dashboard")}
        >
          <FaChartBar className="text-yellow-400 text-lg mr-3" />
          <span className="text-base">Dashboard</span>
        </Link>
        <Link
          to="/machine-repair"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/machine-repair"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/machine-repair")}
        >
          <FaWrench className="text-green-400 text-lg mr-3" />
          <span className="text-base">Machine Repair</span>
        </Link>
        <Link
          to="/machine-details"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/machine-details"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/machine-details")}
        >
          <FaPlus className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Add New Machines</span>
        </Link>
        <Link
          to="/machine-reports"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/machine-reports"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/machine-reports")}
        >
          <FaFileAlt className="text-orange-400 text-lg mr-3" />
          <span className="text-base">Machine Repair Details</span>
        </Link>
      </nav>
    </div>
  );
};

export default MachineSidebar;
