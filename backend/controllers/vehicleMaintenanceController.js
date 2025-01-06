import VehicleMaintenanceEntry from '../models/VehicleMaintenanceEntry.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const addVehicleMaintenanceEntry = catchAsyncErrors(async (req, res, next) => {
  try {
    const entry = await VehicleMaintenanceEntry.create(req.body);
    res.status(201).json({
      success: true,
      entry
    });
  } catch (error) {
    console.error('Error adding vehicle maintenance entry:', error);
    next(new ErrorHandler('Failed to add vehicle maintenance entry', 500));
  }
});

export const getVehicleMaintenanceEntries = catchAsyncErrors(async (req, res, next) => {
  try {
    const entries = await VehicleMaintenanceEntry.find();
    res.status(200).json({
      success: true,
      entries
    });
  } catch (error) {
    console.error('Error fetching vehicle maintenance entries:', error);
    next(new ErrorHandler('Failed to fetch vehicle maintenance entries', 500));
  }
});