// filepath: /c:/academic/Software Project/backend/controllers/vehicleRepairController.js
import VehicleRepair from '../models/VehicleMaintenanceEntry.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import Maintenance from '../models/Maintenance.js';

// Add a new vehicle repair
export const addVehicleRepair = catchAsyncErrors(async (req, res, next) => {
  const {
    vehicleV,
    repairType,
    mileage,
    partReplace,
    serviseDoneBy,
    totalCost,
    lastMaintenance,
    nextMaintenance,
  } = req.body;

  if (!vehicleV || !repairType || !mileage || !partReplace || !serviceDoneBy || !totalCost || !lastMaintenance || !nextMaintenance) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const vehicleRepair = await VehicleRepair.create({
    vehicleV,
    repairType,
    mileage,
    partReplace,
    serviseDoneBy,
    totalCost,
    lastMaintenance,
    nextMaintenance,
  });

  res.status(201).json({
    success: true,
    message: 'Vehicle repair added successfully!',
    vehicleRepair,
  });
});

// Get all vehicle repairs
export const getVehicleRepairs = catchAsyncErrors(async (req, res, next) => {
  const vehicleRepairs = await VehicleRepair.find();
  res.status(200).json({
    success: true,
    vehicleRepairs,
  });
});

//get maintenance
export const getMaintenance = catchAsyncErrors(async (req, res, next) => {
  const maintenance = await Maintenance.find();
  res.status(200).json({
    success: true,
    maintenance,
  });
});

// Update vehicle repair by vehicle ID
export const updateVehicleRepair = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const {
    vehicleV,
    repairType,
    mileage,
    partReplace,
    serviseDoneBy, 
    totalCost,
    lastMaintenance,
    nextMaintenance,
    notes,
  } = req.body;

  // Find and update vehicle repair
  const vehicleRepair = await VehicleRepair.findByIdAndUpdate(
    id,
    { vehicleV, repairType, mileage, partReplace, serviseDoneBy, totalCost, lastMaintenance, nextMaintenance, notes },
    { new: true, runValidators: true }
  );

  if (!vehicleRepair) {
    return next(new ErrorHandler('Vehicle repair not found', 404));
  }

  // Create a maintenance entry only if vehicleRepair exists
  const maintenance = await Maintenance.create({
    vehicleName: vehicleV,
    type: repairType,
    model: vehicleRepair.model, // Ensured model is fetched
    nextRepairDate: nextMaintenance,
    cost: totalCost,
    lastRepairDate: lastMaintenance, // Fixed field name
  });

  res.status(200).json({
    success: true,
    message: 'Vehicle repair updated and maintenance record created!',
    vehicleRepair,
    maintenance,
  });
});

// Delete vehicle repair by ID
export const deleteVehicleRepair = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const vehicleRepair = await VehicleRepair.findByIdAndDelete(id);

  if (!vehicleRepair) {
    return next(new ErrorHandler('Vehicle repair not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Vehicle repair deleted successfully!',
  });
});
