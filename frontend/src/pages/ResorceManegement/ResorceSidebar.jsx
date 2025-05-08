import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaDollarSign,
  FaUserPlus,
  FaChartPie,
  FaUserEdit,
  FaHome,
} from "react-icons/fa";

const ResourceSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#27548A] to-[#1A365D] text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-[#1E4976]">
        Human Resource Management
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
          to="/resource-dashboard"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/resource-dashboard"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/resource-dashboard")}
        >
          <FaChartPie className="text-yellow-400 text-lg mr-3" />
          <span className="text-base">Dashboard</span>
        </Link>
        <Link
          to="/resource-sallery"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/resource-sallery"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/resource-sallery")}
        >
          <FaDollarSign className="text-green-400 text-lg mr-3" />
          <span className="text-base">Salaries</span>
        </Link>
        <Link
          to="/resource-add"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/resource-add"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/resource-add")}
        >
          <FaUserPlus className="text-pink-400 text-lg mr-3" />
          <span className="text-base">Add New Employee</span>
        </Link>
        <Link
          to="/resource-edit"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/resource-edit"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/resource-edit")}
        >
          <FaUserEdit className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Edit Employee</span>
        </Link>
      </nav>
    </div>
  );
};

export default ResourceSidebar;
