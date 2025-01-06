import React, { useEffect, useState } from "react";
import axios from "axios";

const VehicleMaintenance = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/vehicle-maintenance"
        );
        setEntries(response.data.entries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Vehicle Maintenance Records
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Vehicle ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Service Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Service Done By
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Service Type
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Current Mileage
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Total Cost
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Parts Replaced
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                Additional Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.vehicleId}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {formatDate(entry.serviceDate)}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.serviceDoneBy}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.serviceType}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.mileage}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.totalCost}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.partsReplaced}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleMaintenance;
