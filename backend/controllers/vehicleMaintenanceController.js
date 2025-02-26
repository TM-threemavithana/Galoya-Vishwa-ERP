// filepath: /c:/academic/Software Project/backend/controllers/vehicleRepairController.js
import VehicleRepair from '../models/VehicleMaintenanceEntry.js'; // Assuming you have a Vehicle model
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

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

  // Check if all required fields are provided
  if (!vehicleV || !repairType || !mileage || !partReplace || !serviseDoneBy || !totalCost || !lastMaintenance || !nextMaintenance) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  // Create a new vehicle repair entry
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

  const vehicleRepair = await VehicleRepair.findByIdAndUpdate(
    id,
    { vehicleV, repairType, mileage, partReplace, serviseDoneBy, totalCost, lastMaintenance, nextMaintenance,notes },
    { new: true, runValidators: true }
  );

  if (!vehicleRepair) {
    return next(new ErrorHandler('Vehicle repair not found', 404));
  }

  res.status(200).json({
    success: true,
    vehicleRepair,
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
    message: 'Vehicle repair deleted successfully',
  });
});
