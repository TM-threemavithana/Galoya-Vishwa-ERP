import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Importing logo from assets folder
import notification_icon from '../assets/notification.png'; // Importing notification icon from assets folder

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 px-10 bg-[#4A628A] text-white ">
      {/* Logo and Link to Home */}
      <Link to="/">
        <img src={logo} className="h-20" alt="Company Logo" /> {/* Increased height to 20 */}
      </Link>

      {/* Company Title */}
      <h1 className="text-3xl font-bold">Galoya Wishwa Dairy Products</h1> {/* Increased font size to 3xl */}

      {/* Icons for Logout and Notifications */}
      <div className="flex items-center gap-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
        <img src={notification_icon} className="h-6 cursor-pointer" alt="Notification Icon" />
      </div>
    </div>
  );
};

export default Navbar;