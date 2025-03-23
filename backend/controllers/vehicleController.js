import Vehicle from '../models/VehicleMaintenanceEntry.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import VehicleMaintenanceEntry from '../models/VehicleMaintenanceEntry.js';
import Maintenance from '../models/Maintenance.js';

export const addVehicles = catchAsyncErrors(async (req, res, next) => {
  const { vehicleV, image, model, type, status,
    serviseDoneBy,lastMaintenance,nextMaintenance, totalCost,repairType,
    partReplace,
    mileage,
    capacity,notes } = req.body;

  if (!vehicleV || !model || !type || !image || !status || !mileage || !capacity) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const vehicle = await VehicleMaintenanceEntry.create({
    vehicleV,
    image,
    model,
    type,
    serviseDoneBy,
    lastMaintenance,
    nextMaintenance,
    mileage,
    capacity,
    repairType,
    status,
    totalCost,
    partReplace,
    notes,
  });

  res.status(201).json({
    success: true,
    vehicle,
  });
});


export const getVehicles = catchAsyncErrors(async (req, res, next) => {
  const vehicles = await Vehicle.find();
  res.status(200).json({
    success: true,
    vehicles,
  });
});

export const getMaintenance = catchAsyncErrors(async (req, res, next) => {
  const maintenance = await Maintenance.find();
  res.status(200).json({
    success: true,
    maintenance,
  });
});

export const updateVehicles = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { 
    vehicleV, image, model, type, status, serviseDoneBy, 
    lastMaintenance, nextMaintenance, totalCost, repairType, 
    partReplace, mileage, capacity, notes 
  } = req.body;

  // Find the vehicle first
  const vehicle = await VehicleMaintenanceEntry.findById(id);
  if (!vehicle) {
    return next(new ErrorHandler('Vehicle not found', 404));
  }

  // Update the vehicle
  const updatedVehicle = await VehicleMaintenanceEntry.findByIdAndUpdate(
    id,
    {
      vehicleV, image, model, type, status, serviseDoneBy, 
      lastMaintenance, nextMaintenance, totalCost, repairType, 
      partReplace, mileage, capacity, notes
    },
    { new: true, runValidators: true }
  );

  // Create a maintenance record
  const maintenance = await Maintenance.create({
    vehicleName: vehicleV, 
    type: repairType, 
    model, 
    nextRepairDate: nextMaintenance, 
    cost: totalCost, 
    LastrepairDate: lastMaintenance,
  });

  res.status(200).json({
    success: true,
    updatedVehicle,
    maintenance,
  });
});


export const deleteVehicles = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const vehicle = await Vehicle.findByIdAndDelete(id);

  if (!vehicle) {
    return next(new ErrorHandler('vehicle not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'vehicle deleted successfully',
  });
});