import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChartBar, FaBoxOpen, FaClipboardList } from "react-icons/fa";

const RawSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#27548A] to-[#1A365D] text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-[#1E4976]">
        Raw Materials Management
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
          to="/raw-dashboard"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/raw-dashboard"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/raw-dashboard")}
        >
          <FaChartBar className="text-yellow-400 text-lg mr-3" />
          <span className="text-base">Dashboard</span>
        </Link>
        <Link
          to="/raw-add-materials"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/raw-add-materials"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/raw-add-materials")}
        >
          <FaBoxOpen className="text-green-400 text-lg mr-3" />
          <span className="text-base">Add Materials</span>
        </Link>
        <Link
          to="/raw-materials-log"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/raw-materials-log"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/raw-materials-log")}
        >
          <FaClipboardList className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Materials Log</span>
        </Link>
      </nav>
    </div>
  );
};

export default RawSidebar;
