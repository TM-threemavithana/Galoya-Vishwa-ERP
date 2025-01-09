import React, { useState, useEffect } from 'react';
import { Truck, User, Calendar, Settings } from 'lucide-react';
import vehicleImage1 from "../VehicleManagement/VehicleAssets/images.jpg";
import vehicleImage2 from "../VehicleManagement/VehicleAssets/image2.jpeg";
import vehicleImage3 from "../VehicleManagement/VehicleAssets/images3.jpg";
import vehicleImage4 from "../VehicleManagement/VehicleAssets/image4.jpg";

const VehicleDetails = () => {
  const initialVehicles = [
    {
      id: 'CBM-2148',
      image: vehicleImage1,
      model: 'Volvo FH16(2022)',
      type: 'Refrigerated Truck',
      driver: 'Kamesh',
      lastMaintenance: '2025-06-10',
      nextMaintenance: '2027-12-15',
      mileage: '48,000km',
      capacity: '26000kg',
      status: 'Active'
    },
    {
      id: 'CBM-2149',
      image: vehicleImage2,
      model: 'Volvo FH13(2023)',
      type: 'Refrigerated Truck',
      driver: 'Suresh',
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2027-11-30',
      mileage: '32,000km',
      capacity: '24000kg',
      status: 'Active'
    },
    {
      id: 'CBM-2150',
      image: vehicleImage3,
      model: 'Mercedes Actros(2022)',
      type: 'Refrigerated Truck',
      driver: 'Ramesh',
      lastMaintenance: '2025-05-20',
      nextMaintenance: '2027-10-15',
      mileage: '52,000km',
      capacity: '28000kg',
      status: 'Active'
    },
    {
      id: 'CBM-2151',
      image: vehicleImage4,
      model: 'Scania R500(2023)',
      type: 'Refrigerated Truck',
      driver: 'Mahesh',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2027-09-25',
      mileage: '28,000km',
      capacity: '25000kg',
      status: 'Active'
    }
  ];

  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem('vehicles');
    return savedVehicles ? JSON.parse(savedVehicles) : initialVehicles;
  });

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const handleChange = (id, field, value) => {
    setVehicles(prevVehicles =>
      prevVehicles.map(vehicle =>
        vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 relative">
            {/* Status Badge */}
            <div className="absolute top-6 right-6 bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
              {vehicle.status}
            </div>

            {/* Vehicle Image and ID */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-blue-50 shadow-md">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{vehicle.id}</h2>
              <p className="text-lg text-blue-700">{vehicle.model}</p>
            </div>

            {/* Vehicle Details Grid */}
            <div className="grid grid-cols-2 gap-5">
              {/* Type */}
              <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Type</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{vehicle.type}</p>
              </div>

              {/* Driver */}
              <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Driver</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{vehicle.driver}</p>
              </div>

              {/* Maintenance */}
              <div className="bg-blue-50 rounded-lg p-4 col-span-2 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Maintenance Schedule</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Last Maintenance</p>
                    <input
                      type="date"
                      value={vehicle.lastMaintenance}
                      onChange={(e) => handleChange(vehicle.id, 'lastMaintenance', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Next Maintenance</p>
                    <input
                      type="date"
                      value={vehicle.nextMaintenance}
                      onChange={(e) => handleChange(vehicle.id, 'nextMaintenance', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Mileage */}
              <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Mileage</span>
                </div>
                <input
                  type="text"
                  value={vehicle.mileage}
                  onChange={(e) => handleChange(vehicle.id, 'mileage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Capacity */}
              <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Capacity</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{vehicle.capacity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleDetails;