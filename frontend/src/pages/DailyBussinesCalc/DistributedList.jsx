import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DistributedList = () => {
  const [distributions, setDistributions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/distributions");
        const data = await response.json();
        if (data.success && Array.isArray(data.distributions)) {
          setDistributions(data.distributions);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching distributions:", error);
      }
    };

    fetchDistributions();
  }, []);

  const handleNavigate = (distribution) => {
    navigate("/calculator", { state: { distribution } });
  };

  return (
    <div className="flex">
      <div className="w-64">{/* Sidebar component can be placed here */}</div>
      <div className="flex-grow p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Daily Distributions
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Vehicle Number</th>
                <th className="border p-2 text-left">Route</th>
                <th className="border p-2 text-left">Ref Name</th>
                <th className="border p-2 text-left">Driver Name</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {distributions.map((distribution, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    {new Date(distribution.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{distribution.vehicleNumber}</td>
                  <td className="border p-2">{distribution.route}</td>
                  <td className="border p-2">{distribution.refName}</td>
                  <td className="border p-2">{distribution.driverName}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleNavigate(distribution)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Go to Calculator
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistributedList;
