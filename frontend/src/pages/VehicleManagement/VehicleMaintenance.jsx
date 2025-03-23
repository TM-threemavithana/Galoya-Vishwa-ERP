import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to format dates in "DD Month YYYY" (e.g., "26 February 2025")
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"; // Handle empty or invalid dates

const VehicleMaintenance = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vehicle-maintenance/maintenance");

        console.log("API Response:", response.data); // Debugging

        if (response.data && Array.isArray(response.data.maintenance)) {
          setRepairs(response.data.maintenance);
        } else {
          setRepairs([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error("Error fetching repair reports:", error);
        setError("Failed to load repair data.");
        toast.error("Failed to fetch repair reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  if (loading) return <p className="text-center text-blue-500">Loading repair reports...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border border-gray-300">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Vehicle Maintenance Reports
        </h2>

        {repairs.length === 0 ? (
          <p className="text-center text-gray-500">No repair reports available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 border">Vehicle</th>
                  <th className="py-2 px-4 border">Model</th>
                  <th className="py-2 px-4 border">Repair Type</th>
                  <th className="py-2 px-4 border">Last Maintenance</th>
                  <th className="py-2 px-4 border">Next Maintenance</th>
                  <th className="py-2 px-4 border">Maintenance Cost</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair) => (
                  <tr key={repair._id} className="text-center border hover:bg-gray-100">
                    <td className="py-2 px-4 border">
                      <div className="flex items-center justify-center space-x-2">
                        <span>{repair.vehicleName}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border">{repair.model}</td>
                    <td className="py-2 px-4 border">{repair.type}</td>
                    <td className="py-2 px-4 border">{formatDate(repair.lastRepairDate)}</td>
                    <td className="py-2 px-4 border">{formatDate(repair.nextRepairDate)}</td>
                    <td className="py-2 px-4 border">LKR.{repair.cost || "0.00"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default VehicleMaintenance;
