import Distribution from '../models/Distribution.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const addDistribution = catchAsyncErrors(async (req, res, next) => {
  const { date, vehicleNumber, route, refName, driverName, inventories } = req.body;

  if (!date || !vehicleNumber || !route || !refName || !driverName || !inventories) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const distribution = await Distribution.create({
    date,
    vehicleNumber,
    route,
    refName,
    driverName,
    inventories
  });

  res.status(201).json({
    success: true,
    distribution
  });
});

export const getDistributions = catchAsyncErrors(async (req, res, next) => {
  const distributions = await Distribution.find();
  res.status(200).json({
    success: true,
    distributions
  });
});

export const updateDistribution = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { date, vehicleNumber, route, refName, driverName, inventories } = req.body;

  const distribution = await Distribution.findByIdAndUpdate(
    id,
    { date, vehicleNumber, route, refName, driverName, inventories },
    { new: true, runValidators: true }
  );

  if (!distribution) {
    return next(new ErrorHandler('Distribution not found', 404));
  }

  res.status(200).json({
    success: true,
    distribution
  });
});

export const deleteDistribution = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const distribution = await Distribution.findByIdAndDelete(id);

  if (!distribution) {
    return next(new ErrorHandler('Distribution not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Distribution deleted successfully'
  });
});