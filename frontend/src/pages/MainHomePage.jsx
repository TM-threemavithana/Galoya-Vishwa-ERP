import React from 'react';
import { Link } from 'react-router-dom';
import stockIcon from '../assets/stockIcon.png';  // Example icon path
import inventoryIcon from '../assets/inventoryIcon.png';
import deliveryIcon from '../assets/deliveryIcon.png';
import vehicleIcon from '../assets/vehicleIcon.png';
import machineIcon from '../assets/machineIcon.png';
import resourceIcon from '../assets/resourceIcon.png';

const Home = () => {
  const cards = [
    { icon: stockIcon, title: "Raw Material Management", description: "Manage stock levels effectively.", link: "/dashboard" },
    { icon: inventoryIcon, title: "Stock Management", description: "Manage inventory efficiently.", link: "/inventory-dashboard" },
    { icon: deliveryIcon, title: "Delivery Calculator", description: "Calculate optimal delivery routes.", link: "/delivery" },
    { icon: vehicleIcon, title: "Vehicle Maintenance", description: "Maintain fleet operations.", link: "/vehicle" },
    { icon: machineIcon, title: "Machine Maintenance", description: "Keep machines in peak condition.", link: "/machine" },
    { icon: resourceIcon, title: "Resource Management", description: "Optimize resource usage.", link: "/resource" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Galoya Wishwa Dairy Products</h1>
        <p className="text-lg text-gray-600">Manage your dairy operations efficiently and effectively.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-[#7AB2D3] border-4 shadow-md rounded-lg p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer h-64 flex items-center justify-center"> {/* Added motion effect */}
            <Link to={card.link} className="w-full h-full flex flex-col items-center justify-center text-center">
              <img src={card.icon} alt={card.title} className="h-16 w-16"/>
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              <p className="text-gray-200">{card.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;