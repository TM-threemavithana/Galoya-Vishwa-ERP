import React, { useEffect, useState } from 'react';

const MachineRepairReport = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch repair data from the API
    fetch('http://localhost:5000/api/repairs')
      .then((response) => response.json())
      .then((data) => {
        setRepairs(data.repairs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching repair data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (repairs.length === 0) {
    return <div className="text-center py-4">No repair data available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Machine Repair Report</h2>
      
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Machine Name</th>
            <th className="px-4 py-2 border-b text-left">Description</th>
            <th className="px-4 py-2 border-b text-left">Cost</th>
            <th className="px-4 py-2 border-b text-left">Repair Date</th>
            <th className="px-4 py-2 border-b text-left">Next Repairing Date</th>
            <th className="px-4 py-2 border-b text-left">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((repair) => (
            <tr key={repair._id}>
              <td className="px-4 py-2 border-b">{repair.machineName}</td>
              <td className="px-4 py-2 border-b">{repair.description}</td>
              <td className="px-4 py-2 border-b">{repair.cost}</td>
              <td className="px-4 py-2 border-b">{repair.repairDate}</td>
              <td className="px-4 py-2 border-b">{repair.nextrepairDate}</td>
              <td className="px-4 py-2 border-b">
                <a href={repair.receiptPhoto} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Receipt
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineRepairReport;
