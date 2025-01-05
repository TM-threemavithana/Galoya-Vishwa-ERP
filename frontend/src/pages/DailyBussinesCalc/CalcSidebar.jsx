import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
          className={`flex items-center p-2 mb-4 ${activeLink === "/calc-dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleLinkClick("/calc-dashboard")}
        >
          <span className="mr-2">📊</span>
          Dashboard
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
          className={`flex items-center p-2 mb-4 ${activeLink === "/calc-records" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleLinkClick("/calc-records")}
        >
          <span className="mr-2">📈</span>
          Business Records
        </Link>
        <Link
          to="/credit-sales"
          className={`flex items-center p-2 mb-4 ${activeLink === "/credit-sales" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleLinkClick("/credit-sales")}
        >
          <span className="mr-2">💰</span>
          Sale of goods on credit
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
          className={`flex items-center p-2 mb-4 ${activeLink === "/mainhomepage" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleLinkClick("/mainhomepage")}
        >
          <span className="mr-2">🏠</span>
          Home
        </Link>
      </nav>
    </div>
  );
};

export default CalcSidebar;