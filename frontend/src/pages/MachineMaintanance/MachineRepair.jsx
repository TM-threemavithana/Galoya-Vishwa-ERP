import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MachineRepair = () => {
  const [repair, setRepair] = useState({
    machineName: '',
    description: '',
    cost: '',
    billNo: '',
    repairDate: '',
    nextRepairDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepair({ ...repair, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repair.machineName || !repair.description || !repair.cost || !repair.billNo || !repair.repairDate || !repair.nextRepairDate) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/machinerepairs', repair);
      toast.success('Machine repair added successfully!');
      setRepair({
        machineName: '',
        description: '',
        cost: '',
        billNo: '',
        repairDate: '',
        nextRepairDate: '',
      });
    } catch (error) {
      toast.error('Error adding machine repair');
      console.error('Error adding machine repair:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD MACHINE REPAIR</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Machine Name</label>
            <input type="text" name="machineName" value={repair.machineName} onChange={handleChange} placeholder="Machine Name" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={repair.description} onChange={handleChange} placeholder="Description" className="form-textarea mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Cost</label>
            <input type="number" name="cost" value={repair.cost} onChange={handleChange} placeholder="Cost" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Bill No</label>
            <input type="text" name="billNo" value={repair.billNo} onChange={handleChange} placeholder="Bill No" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Repair Date</label>
            <input type="date" name="repairDate" value={repair.repairDate} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Next Repair Date</label>
            <input type="date" name="nextRepairDate" value={repair.nextRepairDate} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            ADD REPAIR
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MachineRepair;