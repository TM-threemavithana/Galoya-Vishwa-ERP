import React, { useEffect, useState } from "react";

const MachineDashboard = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/machines");
      const data = await response.json();
      if (data.success && data.machines) {
        const sortedMachines = data.machines.sort((a, b) => {
          const dateA = new Date(a.nextRepairDate);
          const dateB = new Date(b.nextRepairDate);
          return dateA - dateB; // Sort in ascending order of dates
        });
        setMachines(sortedMachines);
      } else {
        console.error("Failed to fetch machine data.");
        setMachines([]); // Set empty array to avoid rendering errors.
      }
    } catch (error) {
      console.error("Error fetching machines:", error);
      setMachines([]); // Handle fetch errors gracefully.
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Machine Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.length > 0 ? (
          machines.map((machine, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              {machine.image ? (
                <div className="flex justify-center mb-3">
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">No Image Available</div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{machine.name}</h2>
              <p className="text-gray-600 mb-3">{machine.description}</p>
              <p className="text-gray-800 font-medium text-sm mb-2">
                Next Repair Date:{" "}
                <span className="text-blue-600">
                  {machine.nextRepairDate
                    ? new Date(machine.nextRepairDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
              <p className="text-gray-800 font-medium text-sm mb-3">
                Cost: <span className="text-green-600">RS.{machine.price}.00</span>
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">No machines available.</div>
        )}
      </div>
    </div>
  );
};

export default MachineDashboard;
