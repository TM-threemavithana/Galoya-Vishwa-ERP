import RawMaterialsLog from '../models/RawMaterialsLog.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const addRawMaterialsLog = catchAsyncErrors(async (req, res, next) => {
  const { date, items } = req.body;

  if (!date || !items || items.length === 0) {
    return next(new ErrorHandler('Please provide date and items.', 400));
  }

  const rawMaterialsLog = await RawMaterialsLog.create({ date, items });

  res.status(201).json({
    success: true,
    rawMaterialsLog
  });
});

export const getRawMaterialsLogs = catchAsyncErrors(async (req, res, next) => {
  const rawMaterialsLogs = await RawMaterialsLog.find();
  res.status(200).json({
    success: true,
    rawMaterialsLogs
  });
});