// filepath: /c:/academic/Software Project/backend/controllers/machineRepairController.js
import MachineRepair from '../models/Machine.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

export const addMachineRepair = catchAsyncErrors(async (req, res, next) => {
  const { machineName, description, cost, billNo, repairDate, nextRepairDate, } = req.body;

  if (!machineName || !description || !cost || !billNo || !repairDate || !nextRepairDate) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const machineRepair = await MachineRepair.create({
    machineName,
    description,
    cost,
    billNo,
    repairDate,
    nextRepairDate,
    
  });

  res.status(201).json({
    success: true,
    machineRepair,
  });
});

export const getMachineRepairs = catchAsyncErrors(async (req, res, next) => {
  const machineRepairs = await MachineRepair.find();
  res.status(200).json({
    success: true,
    machineRepairs,
  });
});

export const updateMachineRepair = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { machineName, description, cost, billNo, repairDate, nextRepairDate, } = req.body;

  const machineRepair = await MachineRepair.findByIdAndUpdate(
    id,
    { machineName, description, cost, billNo, repairDate, nextRepairDate, },
    { new: true, runValidators: true }
  );

  if (!machineRepair) {
    return next(new ErrorHandler('Machine repair not found', 404));
  }

  res.status(200).json({
    success: true,
    machineRepair,
  });
});

export const deleteMachineRepair = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const machineRepair = await MachineRepair.findByIdAndDelete(id);

  if (!machineRepair) {
    return next(new ErrorHandler('Machine repair not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Machine repair deleted successfully',
  });
});