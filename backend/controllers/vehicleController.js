import Vehicle from '../models/VehicleMaintenanceEntry.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import VehicleMaintenanceEntry from '../models/VehicleMaintenanceEntry.js';

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

export const updateVehicles = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { vehicleV,image,model,type,status,serviseDoneBy,lastMaintenance,nextMaintenance, totalCost,repairType,partReplace,mileage,capacity,notes} = req.body;

  const vehicle = await Vehicle.findByIdAndUpdate(
    id,
    {vehicleV,image,model,type,status,serviseDoneBy,lastMaintenance,nextMaintenance, totalCost,repairType,partReplace,mileage,capacity,notes},
    { new: true, runValidators: true }
  );

  if (!vehicle) {
    return next(new ErrorHandler('Vehicle not found', 404));
  }

  res.status(200).json({
    success: true,
    vehicle,
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