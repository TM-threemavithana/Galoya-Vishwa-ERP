import React from "react";
import { Link } from "react-router-dom";

const MachineSidebar = () => {
  return (
    <div className="w-64 h-100% bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Machine Maintenance</div>


      <Link
          to="/mainhomepage"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">🏠</span>
          Home
        </Link>



      <nav className="mt-6">
        <Link
          to="/machine-dashboard"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📊</span>
          Dashboard
        </Link>
        <Link
          to="/machine-repair"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">🧮</span>
          Machine Repair
        </Link>



        {/* passe add krnn photo deka machine  */}
        <Link
          to="/machine-details"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📈</span>
          Add New Machines
        </Link>
       
        <Link
          to="/machine-reports"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📊</span>
          Machine Repair Details
        </Link>
       
      </nav>
    </div>
  );
};

export default MachineSidebar;
