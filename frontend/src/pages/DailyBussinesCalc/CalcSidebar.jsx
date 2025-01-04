import React from "react";
import { Link } from "react-router-dom";

const CalcSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Daily Business Calculator</div>
      <nav className="mt-6">
        <Link
          to="/calc-dashboard"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📊</span>
          Dashboard
        </Link>
        <Link
          to="/calculator"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">🧮</span>
          Calculator
        </Link>
        <Link
          to="/calc-records"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📈</span>
          Business Records
        </Link>
        <Link
          to="/credit-sales"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">💰</span>
          Sale of goods on credit
        </Link>
        <Link
          to="/calc-reports"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">📊</span>
          Reports
        </Link>
        <Link
          to="/mainhomepage"
          className="flex items-center p-2 hover:bg-gray-700 mb-4"
        >
          <span className="mr-2">🏠</span>
          Home
        </Link>
      </nav>
    </div>
  );
};

export default CalcSidebar;
