import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Truck, Settings, FileText, Wrench } from 'lucide-react';

const VehicleRepair = () => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceDate: '',
    serviceDoneBy: '',
    serviceType: '',
    mileage: '',
    partsReplaced: '',
    laborCost: '',
    partsCost: '',
    totalCost: '',
    nextServiceDue: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicleId) newErrors.vehicleId = 'Vehicle ID is required';
    if (!formData.serviceDate) newErrors.serviceDate = 'Service Date is required';
    if (!formData.serviceDoneBy) newErrors.serviceDoneBy = 'Service Done By is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service Type is required';
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';
    if (!formData.totalCost) newErrors.totalCost = 'Total Cost is required';
    if (!formData.notes) newErrors.notes = 'Notes are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5000/api/vehicle-maintenance', formData);
      navigate('/vehicle-maintenance');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-900">Vehicle Maintenance Log</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Details Section */}
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Vehicle Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Vehicle ID
                </label>
                <input
                  type="text"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.vehicleId && <p className="text-red-500 text-sm">{errors.vehicleId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Current Mileage
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage}</p>}
              </div>
            </div>
          </div>

          {/* Service Details Section */}
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Service Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Service Date
                </label>
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.serviceDate && <p className="text-red-500 text-sm">{errors.serviceDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Service Done By
                </label>
                <input
                  type="text"
                  name="serviceDoneBy"
                  value={formData.serviceDoneBy}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.serviceDoneBy && <p className="text-red-500 text-sm">{errors.serviceDoneBy}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select service type</option>
                  <option value="routine">Routine Maintenance</option>
                  <option value="repair">Repair</option>
                  <option value="inspection">Inspection</option>
                  <option value="emergency">Emergency Repair</option>
                  <option value="oil">Oil change</option>
                </select>
                {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType}</p>}
              </div>
            </div>
          </div>

          {/* Cost Details Section */}
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Cost Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Total Cost
                </label>
                <input
                  type="number"
                  name="totalCost"
                  value={formData.totalCost}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.totalCost && <p className="text-red-500 text-sm">{errors.totalCost}</p>}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Parts Replaced
              </label>
              <input
                type="text"
                name="partsReplaced"
                value={formData.partsReplaced}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter parts replaced (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter any additional notes or comments"
                required
              ></textarea>
              {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              onClick={() => setFormData({})}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleRepair;