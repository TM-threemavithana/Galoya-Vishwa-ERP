import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const VehicleAdd = () => {
  const [image, setImage] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleV: "",
    type: "",
    model: "",
    status: "Active",
    capacity: "",
    mileage:"",
    image: "",
    lastMaintenance: '',
    nextMaintenance: '',
    repairType: '',
    partReplace: '',
    serviseDoneBy: '', 
    totalCost: '',
    notes: ''
   
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

    await fetch("http://localhost:5000/upload", {
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
      await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Vehicle Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700 mb-6 text-center">
          Add Vehicle
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Vehicle ID</label>
              <input
                value={vehicleDetails.vehicleV}
                onChange={changeHandler}
                type="text"
                name="vehicleV"
                placeholder="Enter vehicle "
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Type</label>
              <input
                value={vehicleDetails.type}
                onChange={changeHandler}
                type="text"
                name="type"
                placeholder="Enter vehicle type"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Model</label>
              <input
                value={vehicleDetails.model}
                onChange={changeHandler}
                type="text"
                name="model"
                placeholder="Enter model"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Mileage(km)</label>
              <input
                value={vehicleDetails.mileage}
                onChange={changeHandler}
                type="text"
                name="mileage"
                placeholder="Enter mileage"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Capacity(kg)</label>
              <input
                value={vehicleDetails.capacity}
                onChange={changeHandler}
                type="text"
                name="capacity"
                placeholder="Enter capacity"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Status</label>
              <select
                value={vehicleDetails.status}
                onChange={changeHandler}
                name="status"
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">Upload Image</label>
            <label htmlFor="file-input" className="block">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="Upload"
                className="w-32 h-32 object-cover border border-gray-300 rounded-md cursor-pointer"
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>

          <button
            type="button"
            onClick={addVehicle}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-md shadow-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleAdd;