import React from "react";
import { Link } from "react-router-dom";

const VehicleSidebar = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Vehicle Management</div>
      <nav className="mt-6 flex-grow">
        <Link
          to="/mainhomepage"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">🏠</span>
          Home
        </Link>
        <Link
          to="/vehicledashboard"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📊</span>
          Dashboard
        </Link>
        <Link
          to="/vehicle-details"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📦</span>
          Vehicle Details
        </Link>
        <Link
          to="/vehicle-repair"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">🔧</span>
          Vehicle Repair
        </Link>
        <Link
          to="/vehicle-reports"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📄</span>
          Vehicle Reports
        </Link>
      </nav>
    </div>
  );
};

export default VehicleSidebar;