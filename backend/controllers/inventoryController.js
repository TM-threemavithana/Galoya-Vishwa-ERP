import Inventory from '../models/Inventory.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const addInventory = catchAsyncErrors(async (req, res, next) => {
  const { date, inventoryName, quantity, expiredDate, batchNo, labourName } = req.body;

  if (!date || !inventoryName || !quantity || !expiredDate || !batchNo || !labourName) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const inventory = await Inventory.create({
    date,
    inventoryName,
    quantity,
    expiredDate,
    batchNo,
    labourName
  });

  res.status(201).json({
    success: true,
    inventory
  });
});

export const getInventories = catchAsyncErrors(async (req, res, next) => {
  const inventories = await Inventory.find();
  res.status(200).json({
    success: true,
    inventories
  });
});