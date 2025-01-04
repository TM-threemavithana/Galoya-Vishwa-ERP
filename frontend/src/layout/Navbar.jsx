import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import notification_icon from "../assets/notification.jpg"
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between py-5 px-10 bg-[#4A628A] text-white">
      {/* Logo and Link to Home */}
      <Link to="/">
        <img src={logo} className="h-20" alt="Company Logo" /> {/* Increased height to 20 */}
      </Link>

      {/* Company Title */}
      <h1 className="text-3xl font-bold">Galoya Wishwa Dairy Products</h1> {/* Increased font size to 3xl */}

      {/* Auth Section */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex items-center gap-4 mt-4 md:mt-0`}
      >
        {!isAuthenticated ? (
          <>
            <Link
              to={"/sign-up"}
              className="bg-[#D6482B] text-white font-semibold hover:bg-[#b8381e] text-lg md:text-xl py-1 px-4 rounded-md transition duration-200"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="text-[#DECCBE] border-2 border-[#DECCBE] hover:bg-[#fffefd] hover:text-[#fdba88] font-bold text-lg md:text-xl py-1 px-4 rounded-md transition duration-200"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-[#D6482B] text-white font-semibold hover:bg-[#b8381e] text-lg md:text-xl py-1 px-4 rounded-md transition duration-200"
            >
              Logout
            </button>
            <img src={notification_icon} className="h-6 cursor-pointer" alt="Notification Icon" />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;