import React from "react";
import machineData from "../../assets/machineDetails"; // Adjust the path as needed

const MachineDashbord = () => {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Machine Details
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machineData.map((machine) => (
          <div
            key={machine.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={machine.image}
              alt={machine.name}
              className="w-full h-90 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {machine.name}
            </h2>
            <p className="text-gray-600 mb-4">{machine.description}</p>
            <p className="text-gray-800 font-medium">
              Next Repair Date:{" "}
              <span className="text-blue-600">{machine.nextRepairDate}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineDashbord;
