import React from 'react'
import { Link } from "react-router-dom";


const RawSidebar = () => {
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
          { <Link
            to="/raw-dashboard"
            className="flex items-center p-2 hover:bg-gray-700 mb-4"
          >
            <span className="mr-2">📊</span>
            Dashboard
          </Link> }
          <Link
            to="/raw-add-materials"
            className="flex items-center p-2 hover:bg-gray-700 mb-4"
          >
            <span className="mr-2">📦</span>
            Add Materials
          </Link>
          <Link
            to="/raw-materials-log"
            className="flex items-center p-2 hover:bg-gray-700 mb-4"
          >
            <span className="mr-2">🔧</span>
            Materials Log
          </Link>
          <Link
            to="/raw-materials-productions"
            className="flex items-center p-2 hover:bg-gray-700 mb-4"
          >
            <span className="mr-2">📄</span>
            Productions
          </Link>
           <Link
            to="/raw-production-log"
            className="flex items-center p-2 hover:bg-gray-700 mb-4"
          >
            <span className="mr-2">📊</span>
            Production Log
          </Link> 
          
        </nav>
      </div>
    );
}

export default RawSidebar