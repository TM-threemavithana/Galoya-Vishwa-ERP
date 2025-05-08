import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, User, Calendar, Settings } from 'lucide-react';

const VehicleDetails = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('https://galoya-vishwa-erp-backend.onrender.com/api/vehicles');
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const removeVehicle = async (id) => {
    try {
      await axios.delete(`https://galoya-vishwa-erp-backend.onrender.com/api/vehicles/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error('Error removing vehicle:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vehicles.map(vehicle => (
          <div
            key={vehicle._id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 relative"
          >
            {/* Status Badge */}
            <div className="absolute top-6 right-6 bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
              {vehicle.status}
            </div>

            {/* Vehicle Image and ID */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-blue-50 shadow-md">
                <img
                  src={vehicle.image}
                  alt={vehicle.vehicleId}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{vehicle.vehicleV}</h2>
              <p className="text-lg text-blue-700">{vehicle.model}</p>
            </div>

            {/* Vehicle Details Grid */}
            <div className="grid grid-cols-2 gap-5">
              {/* Type */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Type</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{vehicle.type}</p>
              </div>

              {/* Maintenance Schedule */}
              <div className="bg-blue-50 rounded-lg p-4 col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Maintenance Schedule</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Last Maintenance</p>
                    <p className="text-sm font-medium text-blue-900">
                      {vehicle.lastMaintenance?.slice(0, 10) || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Next Maintenance</p>
                    <p className="text-sm font-medium text-blue-900">
                      {vehicle.nextMaintenance?.slice(0, 10) || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mileage */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Mileage</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{vehicle.mileage} km</p>
              </div>

              {/* Capacity */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Capacity</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{vehicle.capacity}</p>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeVehicle(vehicle._id)}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleDetails;
