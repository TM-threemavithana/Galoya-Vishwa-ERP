import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MachineRepair = () => {
  const [repair, setRepair] = useState({
    machineName: "",
    machineId: "",
    description: "",
    cost: "",
    billNo: "",
    repairDate: "",
    nextRepairDate: "",
  });

  const [machineNames, setMachineNames] = useState([]);

  useEffect(() => {
    const fetchMachineNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/machines");
        const latestMachines = response.data.machines.map((machine) => ({
          name: machine.name,
          id: machine._id,
        }));
        setMachineNames(latestMachines);
      } catch (error) {
        console.error("Error fetching machine names:", error);
        toast.error("Failed to fetch machine names");
      }
    };
    fetchMachineNames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "machineName") {
      const selectedMachine = machineNames.find((machine) => machine.name === value);
      setRepair({
        ...repair,
        machineName: value,
        machineId: selectedMachine ? selectedMachine.id : "",
      });
    } else {
      setRepair({ ...repair, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!repair.machineId) {
      toast.error("Please select a valid machine.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/machinerepairs/${repair.machineId}`, repair);
      toast.success("Machine repair added successfully!");
      setRepair({
        machineName: "",
        machineId: "",
        description: "",
        cost: "",
        billNo: "",
        repairDate: "",
        nextRepairDate: "",
      });
    } catch (error) {
      toast.error("Error adding machine repair");
      console.error("Error adding machine repair:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 mb-6 text-center">
          Machine Repair
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Machine Name</label>
              <select
                name="machineName"
                value={repair.machineName}
                onChange={handleChange}
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select a Machine</option>
                {machineNames.map((machine) => (
                  <option key={machine.id} value={machine.name}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Cost</label>
              <input
                type="number"
                name="cost"
                value={repair.cost}
                onChange={handleChange}
                placeholder="Cost"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Bill No</label>
              <input
                type="text"
                name="billNo"
                value={repair.billNo}
                onChange={handleChange}
                placeholder="Bill No"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* ✅ Added Repair Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Repair Date</label>
              <input
                type="date"
                name="repairDate"
                value={repair.repairDate}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* ✅ Added Next Repair Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Next Repair Date</label>
              <input
                type="date"
                name="nextRepairDate"
                value={repair.nextRepairDate}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={repair.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          >
            Add Repair Report
          </button>
        </form>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default MachineRepair;
