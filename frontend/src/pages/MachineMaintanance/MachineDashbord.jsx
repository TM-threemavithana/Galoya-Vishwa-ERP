import React, { useEffect, useState } from "react";
import axios from "axios";
import machineData from "../../assets/machineDetails"; // Static machine details

const MachineDashboard = () => {
  const [nextRepairDates, setNextRepairDates] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch only nextRepairDate from backend
  useEffect(() => {
    const fetchNextRepairDates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/machinerepairs");
        const repairDates = response.data.machineRepairs.reduce((acc, repair) => {
          acc[repair.machineName] = repair.nextRepairDate;
          return acc;
        }, {});
        setNextRepairDates(repairDates);
      } catch (error) {
        console.error("Error fetching next repair dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextRepairDates();
  }, []);

  // Format date
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  // Combine machine data with next repair dates and sort by next repair date
  const sortedMachines = machineData
    .map((machine) => ({
      ...machine,
      nextRepairDate: nextRepairDates[machine.name] || null,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.nextRepairDate || 0);
      const dateB = new Date(b.nextRepairDate || 0);
      return dateA - dateB;
    });

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Machine Details
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMachines.map((machine) => (
          <div
            key={machine.id} // Use `id` from static data as the unique key
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-center mb-3">
              <img
                src={machine.image || "/placeholder-image.png"} // Use placeholder if no image is available
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
              <span className="text-blue-600">
                {formatDate(machine.nextRepairDate)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineDashboard;

