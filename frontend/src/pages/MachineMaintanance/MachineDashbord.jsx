import React from "react";
import machineData from "../../assets/machineDetails"; // Adjust the path as needed

const MachineDashbord = () => {
  // Sort machine data by nextRepairDate in ascending order
  const sortedMachineData = [...machineData].sort(
    (a, b) => new Date(a.nextRepairDate) - new Date(b.nextRepairDate)
  );

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Machine Details
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMachineData.map((machine) => (
          <div
            key={machine.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center mb-3">
              <img
                src={machine.image}
                alt={machine.name}
                className="w-2/3 h-40 object-cover rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {machine.name}
            </h2>
            <p className="text-gray-600 mb-2 text-sm">{machine.description}</p>
            <p className="text-gray-800 font-medium text-sm">
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
