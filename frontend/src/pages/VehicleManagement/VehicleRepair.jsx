import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const repairTypes = [
  "Engine Repair",
  "Body and Paint Repair",
  "Tire Repair",
  "Brake Repair",
  "Electric Repair",
  "Lights Repair",
  "Others",
];

const VehicleRepair = () => {
  const [repair, setRepair] = useState({
    vehicleV: "",
    vehicleId: "",
    lastMaintenance: "",
    nextMaintenance: "",
    repairType: "",
    mileage: "",
    partReplace: "",
    serviseDoneBy: "",
    totalCost: "",
    status: "Active", 
    notes: "",
  });

  const [vehicleNames, setVehicleNames] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicleNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vehicles");
        const latestVehicles = response.data.vehicles.map((vehicle) => ({
          name: vehicle.vehicleV || "",
          id: vehicle._id || "",
          mileage: vehicle.mileage || 0, // Store mileage from the add vehicle page
        }));
        setVehicleNames(latestVehicles);
      } catch (error) {
        console.error("Error fetching vehicle names:", error);
        toast.error("Failed to fetch vehicle names");
      }
    };
    fetchVehicleNames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vehicleV") {
      const selected = vehicleNames.find((vehicle) => vehicle.name === value);
      setSelectedVehicle(selected);
      setRepair({
        ...repair,
        vehicleV: value,
        vehicleId: selected ? selected.id : "",
      });
    } else {
      setRepair({ ...repair, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!repair.vehicleId) {
      toast.error("Please select a valid vehicle.");
      return;
    }
  
    // Get selected vehicle mileage
    const selectedVehicle = vehicleNames.find((vehicle) => vehicle.id === repair.vehicleId);
    const storedMileage = selectedVehicle ? selectedVehicle.mileage : 0;
    const enteredMileage = parseInt(repair.mileage);
  
    // Check the three conditions
    if (enteredMileage === 0 || enteredMileage >= storedMileage) {
      try {
        const url = `http://localhost:5000/api/vehicle-maintenance/${repair.vehicleId}`;
        console.log("API URL:", url);
  
        await axios.put(url, { ...repair, mileage: enteredMileage });
        toast.success("Vehicle repair added successfully!");
  
        setRepair({
          vehicleV: "",
          vehicleId: "",
          lastMaintenance: "",
          nextMaintenance: "",
          repairType: "",
          mileage: "",
          partReplace: "",
          serviseDoneBy: "",
          totalCost: "",
          status: "Active",
          notes: "",
        });
      } catch (error) {
        toast.error("Error adding vehicle repair");
        console.error("Error adding vehicle repair:", error);
      }
    } else {
      toast.error(`Mileage must be greater than/equal to ${storedMileage}.`);
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 mb-6 text-center">
          Vehicle Repair
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Vehicle Name</label>
              <select
                name="vehicleV"
                value={repair.vehicleV || ""}
                onChange={handleChange}
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select a Vehicle</option>
                {vehicleNames.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.name}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>

             {/* Status Dropdown */}
             <div>
              <label className="block font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={repair.status} // Correctly referencing repair.status
                onChange={handleChange}
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
              </select>
            </div>

            {/* Last Maintenance */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Last Maintenance</label>
              <input
                type="date"
                name="lastMaintenance"
                value={repair.lastMaintenance || ""}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Next Maintenance */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Next Maintenance</label>
              <input
                type="date"
                name="nextMaintenance"
                value={repair.nextMaintenance || ""}
                onChange={handleChange}
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Repair Type Dropdown */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Repair Type</label>
              <select
                name="repairType"
                value={repair.repairType || ""}
                onChange={handleChange}
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select Repair Type</option>
                {repairTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

             {/* Parts Replaced */}
             <div>
              <label className="block font-medium text-gray-700 mb-1">Parts Replaced</label>
              <input
                type="text"
                name="partReplace"
                value={repair.partReplace || ""}
                onChange={handleChange}
                placeholder="Parts Replaced"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

             {/* Total Cost */}
             <div>
              <label className="block font-medium text-gray-700 mb-1">Total Cost</label>
              <input
                type="number"
                name="totalCost"
                value={repair.totalCost || ""}
                onChange={handleChange}
                placeholder="Total Cost"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          
          {/* Service Done By */}
          <div>
              <label className="block font-medium text-gray-700 mb-1">Service Done By</label>
              <input
                type="text"
                name="serviseDoneBy"
                value={repair.serviseDoneBy || ""}
                onChange={handleChange}
                placeholder="Service Done By"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
           {/* Mileage */}
           <div>
              <label className="block font-medium text-gray-700 mb-1">Mileage</label>
              <input
                type="number"
                name="mileage"
                value={repair.mileage || ""}
                onChange={handleChange}
                placeholder="Enter mileage"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {selectedVehicle && (
                <p className="text-sm text-red-600 mt-1">
                  Last recorded mileage: {selectedVehicle.mileage} km
                </p>
              )}
            </div>

           
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={repair.notes || ""}
              onChange={handleChange}
              placeholder="Notes"
              className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
          >
            Add Repair Report
          </button>
        </form>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default VehicleRepair;