import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaWarehouse, FaChartLine, FaShieldAlt, FaShoppingCart } from "react-icons/fa";

const Home = () => {
  const features = [
    { icon: <FaWarehouse size={24} className="text-[#d6482b]" />, title: "Inventory Management", description: "Manage stock levels efficiently." },
    { icon: <FaChartLine size={24} className="text-[#d6482b]" />, title: "Production Control", description: "Optimize production schedules." },
    { icon: <FaShieldAlt size={24} className="text-[#d6482b]" />, title: "Quality Assurance", description: "Ensure product quality." },
    { icon: <FaShoppingCart size={24} className="text-[#d6482b]" />, title: "Sales Tracking", description: "Track sales performance." },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full h-fit px-5 pt-20 flex flex-col min-h-screen py-4 justify-center items-center bg-white">
        <div className="text-center">
          <p className="text-[#DECCBE] font-bold text-xl mb-8">
            Empower Your Dairy Operations with Efficiency
          </p>
          <h1 className="text-[#111] text-3xl font-bold mb-2 sm:text-5xl lg:text-6xl xl:text-7xl">
            Dairy ERP Solution
          </h1>
          <h1 className="text-[#d6482b] text-3xl font-bold mb-6 sm:text-5xl lg:text-6xl xl:text-7xl">
            Streamline Your Business
          </h1>
          <div className="flex gap-4 my-8 justify-center">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] rounded-md px-8 py-3 text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#DECCBE] bg-transparent border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-[#fdba88] font-bold text-xl rounded-md px-8 py-3 transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-[#111] text-xl font-semibold mb-6 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h5 className="font-bold text-lg text-gray-800">{feature.title}</h5>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;