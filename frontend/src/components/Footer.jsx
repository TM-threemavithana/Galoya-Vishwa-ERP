import React from "react";
import logo from "../assets/logo.png"; // Importing logo from assets folder

const Footer = () => {
  return (
    <div className="bg-[#DFF2EB]">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-10 my-5 mt-20 text-sm px-5"> {/* Reduced gap, margin, and padding */}
        <div>
          <img src={logo} className="mb-3 w-24" alt="Company Logo" /> {/* Reduced margin-bottom and width */}
          <p className="w-full md:w-2/3 text-gray-600">
            Galoya Wishwa Dairy Products is committed to providing the highest
            quality dairy products to our customers. Our mission is to ensure
            freshness and nutritional value in every product we deliver. We take
            pride in our sustainable farming practices and our dedication to
            animal welfare. Join us in our journey to bring the best dairy
            products from our farms to your table.
          </p>
        </div>
        <div className="mt-5">
          <p className="text-xl font-medium mb-3">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>No 23/131,</li>
            <li>Nawagampura Road,</li>
            <li>Uhana,</li>
            <li>Ampara</li>
          </ul>
        </div>
        <div className="mt-5">
          <p className="text-xl font-medium mb-3">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+94774081153</li>
            <li>wishwadairy@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto">
        <hr />
        <p className="py-3 text-sm text-center text-gray-600"> {/* Reduced padding */}
          Copyright 2024@ Galoya Wishwa Products - All Right
        </p>
      </div>
    </div>
  );
};

export default Footer;