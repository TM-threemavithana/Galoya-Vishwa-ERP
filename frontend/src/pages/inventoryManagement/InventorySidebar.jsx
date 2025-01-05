import React from 'react';
import { Link } from 'react-router-dom';

const InventorySidebar = () => {
  return (
    <div className="w-64 left-0 inset-y-0 overflow-y-auto bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">Inventory Management</div>
      <nav className="mt-6 flex-grow">
        <Link to="/mainhomepage" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">🏠</span>
          Home
        </Link>
        <Link to="/inventory-dashboard" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📊</span>
          Dashboard
        </Link>
        <Link to="/inventories" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">🛠️</span>
          Daily Production
        </Link>
        <Link to="/daily-distribution" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">🚚</span>
          Daily Distribution
        </Link>
        <Link to="/daily-reduce" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">➖</span>
          Daily Stock Reduce
        </Link>
        <Link to="/inventory-record" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📜</span>
          Stock Record
        </Link>
      </nav>
    </div>
  );
};

export default InventorySidebar;

