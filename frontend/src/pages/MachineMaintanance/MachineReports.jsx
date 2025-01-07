import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MachineReports = () => {
  const [machineRepairs, setMachineRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null); // Holds the data of the item being edited

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

  // Handle edit button click
  const handleEdit = (repair) => {
    setEditData(repair);
  };

  // Handle form submission for edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/machinerepairs/${editData._id}`, editData);
      if (response.status === 200) {
        // Update the record in state
        setMachineRepairs((prevRepairs) =>
          prevRepairs.map((repair) =>
            repair._id === editData._id ? { ...repair, ...editData } : repair
          )
        );
        setEditData(null); // Close the edit form
      }
    } catch (error) {
      console.error('Error updating machine repair:', error);
    }
  };

  // Handle input change in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
                  <th className="py-3 px-6 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
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
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <button
                        onClick={() => handleEdit(repair)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Form */}
      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Edit Machine Repair</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Machine Name</label>
                <input
                  type="text"
                  name="machineName"
                  value={editData.machineName}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={editData.cost}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Next Repair Date</label>
                <input
                  type="date"
                  name="nextRepairDate"
                  value={editData.nextRepairDate}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineReports;
