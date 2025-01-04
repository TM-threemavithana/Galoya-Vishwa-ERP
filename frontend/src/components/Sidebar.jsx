import React from "react";
import { Link } from "react-router-dom";
import dashboardIcon from "../assets/dashboard.png";
import addProductIcon from "../assets/add-to-basket.png";
import manageProductsIcon from "../assets/manager.png";
import manageSalesIcon from "../assets/seller.png"; // Assuming you meant sales icon here
import profileIcon from "../assets/user.png"; // Corrected the path if necessary
import homepageIcon from "../assets/homepage.png"; // Added homepage icon
import productionIcon from "../assets/production.png"; // Added production icon

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-[#001F3F] text-white flex flex-col justify-between fixed"> {/* Fixed position */}
      <div>
        <div className="px-5 py-4 text-xl font-semibold text-center">
          WELCOME
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link
              to="/MainHomePage"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={homepageIcon}
                alt="Homepage"
                className="h-6 w-6 mr-3"
              />
              <span>Homepage</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={dashboardIcon}
                alt="Dashboard"
                className="h-6 w-6 mr-3"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/add-product"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={addProductIcon}
                alt="Add Product"
                className="h-6 w-6 mr-3"
              />
              <span>Add Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-products"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={manageProductsIcon}
                alt="Manage Products"
                className="h-6 w-6 mr-3"
              />
              <span>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/productions"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={productionIcon}
                alt="Productions"
                className="h-6 w-6 mr-3"
              />
              <span>Productions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-sales"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={manageSalesIcon}
                alt="Manage Sales"
                className="h-6 w-6 mr-3"
              />
              <span>Manage Sales</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center p-3 hover:bg-[#3A6D8C] rounded transition-colors duration-150"
            >
              <img
                src={profileIcon}
                alt="Profile"
                className="h-6 w-6 mr-3"
              />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <button className="flex items-center justify-center w-3/4 mx-auto p-3 bg-red-600 hover:bg-red-700 rounded transition-colors duration-150">
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;