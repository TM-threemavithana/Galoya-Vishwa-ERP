import StockReduction from '../models/StockReduction.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const addStockReduction = catchAsyncErrors(async (req, res, next) => {
  const { date, inventoryName, description, quantity } = req.body;

  if (!date || !inventoryName || !description || !quantity) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const stockReduction = await StockReduction.create({
    date,
    inventoryName,
    description,
    quantity
  });

  res.status(201).json({
    success: true,
    stockReduction
  });
});

export const getStockReductions = catchAsyncErrors(async (req, res, next) => {
  const stockReductions = await StockReduction.find();
  res.status(200).json({
    success: true,
    stockReductions
  });
});

export const updateStockReduction = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { date, inventoryName, description, quantity } = req.body;

  const stockReduction = await StockReduction.findByIdAndUpdate(
    id,
    { date, inventoryName, description, quantity },
    { new: true, runValidators: true }
  );

  if (!stockReduction) {
    return next(new ErrorHandler('Stock reduction not found', 404));
  }

  res.status(200).json({
    success: true,
    stockReduction
  });
});

export const deleteStockReduction = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const stockReduction = await StockReduction.findByIdAndDelete(id);

  if (!stockReduction) {
    return next(new ErrorHandler('Stock reduction not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Stock reduction deleted successfully'
  });
});