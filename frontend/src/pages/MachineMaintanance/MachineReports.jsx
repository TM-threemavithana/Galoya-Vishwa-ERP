import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MachineReports = () => {
  const [machineRepairs, setMachineRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch machine repair data
  useEffect(() => {
    const fetchMachineRepairs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/machinerepairs');
        setMachineRepairs(response.data.machineRepairs);
      } catch (error) {
        console.error('Error fetching machine repairs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineRepairs();
  }, []);

  // Format currency in Sri Lankan Rupees
  const formatCurrency = (amount) => `Rs. ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  // Format date
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col w-full max-w-4xl border border-gray-200 mt-10 mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
          Machine Repair Reports
        </h2>
        {machineRepairs.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No machine repairs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Machine Name
                  </th>
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cost (Rs.)
                  </th>
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Bill Number
                  </th>
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Repair Date
                  </th>
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Next Repair Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {machineRepairs.map((repair) => (
                  <tr key={repair._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{repair.machineName}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{repair.description}</td>
                    <td className="py-4 px-6 text-sm text-right font-semibold text-gray-800">
                      {formatCurrency(repair.cost)}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{repair.billNo}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{formatDate(repair.repairDate)}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{formatDate(repair.nextRepairDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineReports;
