import React from 'react';
import { Link } from 'react-router-dom';

const InventorySidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Inventory Management</div>
      <nav className="mt-6">
        <Link to="/mainhomepage" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">🏠</span>
          Home
        </Link>
        <Link to="/inventory-dashboard" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📊</span>
          Dashboard
        </Link>
        <Link to="/products" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📦</span>
          Products
        </Link>
        <Link to="/inventory-management" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📈</span>
          Inventory Management
        </Link>
        <Link to="/categories" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📂</span>
          Categories
        </Link>
        <Link to="/adjustments" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">⚙️</span>
          Inventory Adjustments
        </Link>
        <Link to="/reports" className="flex items-center p-2 hover:bg-gray-700 mb-4">
          <span className="mr-2">📊</span>
          Reports
        </Link>
        
      </nav>
    </div>
  );
};

export default InventorySidebar;
