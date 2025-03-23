import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTruck,
  FaTools,
  FaClipboardList,
  FaFileAlt,
  FaPlusSquare, // Added for Add Vehicle icon
} from "react-icons/fa";

const VehicleSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-green-900 to-green-700 text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-green-800">
        Vehicle Management
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
          to="/vehicle-details"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/vehicle-details"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/vehicle-details")}
        >
          <FaTruck className="text-yellow-400 text-lg mr-3" />
          <span className="text-base">Vehicle Details</span>
        </Link>
        <Link
          to="/vehicle-repair"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/vehicle-repair"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/vehicle-repair")}
        >
          <FaTools className="text-green-400 text-lg mr-3" />
          <span className="text-base">Vehicle Repair</span>
        </Link>
        <Link
          to="/vehicle-maintenance"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/vehicle-maintenance"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/vehicle-maintenance")}
        >
          <FaClipboardList className="text-blue-400 text-lg mr-3" />
          <span className="text-base">Maintenance Log</span>
        </Link>
        <Link
          to="/vehicle-add"
          className={`flex items-center p-3 mb-4 rounded-lg transition-all duration-300 ${
            activeLink === "/vehicle-add"
              ? "bg-gray-800 scale-105 shadow-lg"
              : "hover:bg-gray-800 hover:scale-105"
          }`}
          onClick={() => handleLinkClick("/vehicle-add")}
        >
          <FaPlusSquare className="text-purple-400 text-lg mr-3" /> {/* Updated icon */}
          <span className="text-base">Add Vehicle</span>
        </Link>
      </nav>
    </div>
  );
};

export default VehicleSidebar;
