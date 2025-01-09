import React from "react";
import { Link } from "react-router-dom";

const VehicleSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-green-900 to-green-700 text-white min-h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold text-center border-b border-green-800">
        Vehicle Management
      </div>
      <nav className="mt-6">
        <Link
          to="/mainhomepage"
          className="flex items-center p-3 mb-4 rounded-lg transition-all duration-300 hover:bg-green-800 hover:scale-105"
        >
          <span className="mr-3">🏠</span>
          <span className="text-base">Home</span>
        </Link>
        <Link
          to="/vehicle-details"
          className="flex items-center p-3 mb-4 rounded-lg transition-all duration-300 hover:bg-green-800 hover:scale-105"
        >
          <span className="mr-3">📦</span>
          <span className="text-base">Vehicle Details</span>
        </Link>
        <Link
          to="/vehicle-repair"
          className="flex items-center p-3 mb-4 rounded-lg transition-all duration-300 hover:bg-green-800 hover:scale-105"
        >
          <span className="mr-3">🔧</span>
          <span className="text-base">Vehicle Repair</span>
        </Link>
        <Link
          to="/vehicle-maintenance"
          className="flex items-center p-3 mb-4 rounded-lg transition-all duration-300 hover:bg-green-800 hover:scale-105"
        >
          <span className="mr-3">📊</span>
          <span className="text-base">Maintenance Log</span>
        </Link>
        <Link
          to="/vehicle-reports"
          className="flex items-center p-3 mb-4 rounded-lg transition-all duration-300 hover:bg-green-800 hover:scale-105"
        >
          <span className="mr-3">📄</span>
          <span className="text-base">Vehicle Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default VehicleSidebar;