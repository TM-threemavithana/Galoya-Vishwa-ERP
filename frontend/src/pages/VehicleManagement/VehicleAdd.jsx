import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
import { FaCar, FaBox, FaCogs, FaClipboard, FaTachometerAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehicleAdd = () => {
  const [image, setImage] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleV: "",
    type: "",
    model: "",
    status: "Active",
    capacity: "",
    mileage: "",
    image: "",
    lastMaintenance: "",
    nextMaintenance: "",
    repairType: "",
    partReplace: "",
    serviceDoneBy: "",
    totalCost: "",
    notes: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setVehicleDetails({
      ...vehicleDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addVehicle = async () => {
    console.log(vehicleDetails);
    let responseData;
    let vehicle = vehicleDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("https://galoya-vishwa-erp-backend.onrender.com/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      vehicle.image = responseData.image_url;
      console.log(vehicle);
      await fetch("https://galoya-vishwa-erp-backend.onrender.com/api/vehicles", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            toast.success("Vehicle Added Successfully!");
          } else {
            toast.error("Failed to Add Vehicle!");
          }
        });
    } else {
      toast.error("Image Upload Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-3xl border border-gray-300 hover:shadow-xl transition-shadow duration-500">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 mb-8 text-center">
          Add New Vehicle
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vehicle ID */}
            <div className="flex items-center space-x-3">
              <FaCar className="text-blue-500 text-2xl mt-9" /> {/* Changed color to blue */}
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Vehicle ID</label>
                <input
                  value={vehicleDetails.vehicleV}
                  onChange={changeHandler}
                  type="text"
                  name="vehicleV"
                  placeholder="Enter vehicle ID"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Type */}
            <div className="flex items-center space-x-3">
              <FaBox className="text-blue-500 text-2xl mt-9" /> {/* Changed color to blue */}
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Type</label>
                <input
                  value={vehicleDetails.type}
                  onChange={changeHandler}
                  type="text"
                  name="type"
                  placeholder="Enter vehicle type"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Model */}
            <div className="flex items-center space-x-3">
              <FaClipboard className="text-blue-500 text-2xl mt-9" /> {/* Changed color to blue */}
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Model</label>
                <input
                  value={vehicleDetails.model}
                  onChange={changeHandler}
                  type="text"
                  name="model"
                  placeholder="Enter model"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Mileage */}
            <div className="flex items-center space-x-3">
              <FaTachometerAlt className="text-blue-500 text-2xl mt-9" /> {/* Changed color to blue */}
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Mileage (km)</label>
                <input
                  value={vehicleDetails.mileage}
                  onChange={changeHandler}
                  type="text"
                  name="mileage"
                  placeholder="Enter mileage"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Capacity */}
            <div className="flex items-center space-x-3">
              <FaCogs className="text-blue-500 text-2xl mt-9" /> {/* Changed color to blue */}
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Capacity (kg)</label>
                <input
                  value={vehicleDetails.capacity}
                  onChange={changeHandler}
                  type="text"
                  name="capacity"
                  placeholder="Enter capacity"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={vehicleDetails.status}
                  onChange={changeHandler}
                  name="status"
                  className="form-select w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-500 transition-all duration-300"
                >
                  <option value="Active">Active</option>
                  <option value="Not Active">Not Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
            <label htmlFor="file-input" className="block cursor-pointer mb-4">
            <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="Upload"
                className="w-[125px] h-[125px] object-cover border-2 border-gray-300 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
          </div>

          {/* Add Vehicle Button */}
          <button
            type="button"
            onClick={addVehicle}
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleAdd;
