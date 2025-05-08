import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#27548A]">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-6 my-3 mt-12 text-sm px-5">
        <div>
          <img src={logo} className="mb-2 w-20" alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-100 text-xs">
            Galoya Wishwa Dairy Products is committed to providing the highest
            quality dairy products to our customers. Our mission is to ensure
            freshness and nutritional value in every product we deliver. We take
            pride in our sustainable farming practices and our dedication to
            animal welfare. Join us in our journey to bring the best dairy
            products from our farms to your table.
          </p>
        </div>
        <div className="mt-3">
          <p className="text-lg font-medium mb-2 text-white">COMPANY</p>
          <ul className="flex flex-col gap-0.5 text-gray-100 text-xs">
            <li>No 23/131,</li>
            <li>Nawagampura Road,</li>
            <li>Uhana,</li>
            <li>Ampara</li>
          </ul>
        </div>
        <div className="mt-3">
          <p className="text-lg font-medium mb-2 text-white">GET IN TOUCH</p>
          <ul className="flex flex-col gap-0.5 text-gray-100 text-xs">
            <li>+94774081153</li>
            <li>Galoyavishwa@Yahoo.com</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto">
        <hr className="border-gray-300" />
        <p className="py-2 text-xs text-center text-gray-100">
          Copyright 2024@ Galoya Wishwa Products - All Right
        </p>
      </div>
    </div>
  );
};

export default Footer;
