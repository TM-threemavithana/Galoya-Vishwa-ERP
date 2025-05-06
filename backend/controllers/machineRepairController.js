// filepath: /c:/academic/Software Project/backend/controllers/machineRepairController.js
import Machine from '../models/Machine.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import MachineRepair from '../models/MachineRepair.js';

export const addMachineRepair = catchAsyncErrors(async (req, res, next) => {
  const { machineName, description, cost, billNo, repairDate, nextRepairDate, } = req.body;

  if (!machineName || !description || !cost || !billNo || !repairDate || !nextRepairDate) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const machineRepair = await Machine.create({
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

export const getRepair = catchAsyncErrors(async (req, res, next) => {
  const machines = await MachineRepair.find();
  res.status(200).json({
    success: true,
    machines,
  });
});

export const getMachineRepairs = catchAsyncErrors(async (req, res, next) => {
  const machineRepairs = await Machine.find();
  res.status(200).json({
    success: true,
    machineRepairs,
  });
});

export const updateMachineRepair = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { machineName, description, cost, billNo, repairDate, nextRepairDate, } = req.body;

  const machineRepair = await Machine.findByIdAndUpdate(
    id,
    { machineName, description, cost, billNo, repairDate, nextRepairDate, },
    { new: true, runValidators: true }
  );
  const repair = await MachineRepair.create({
    machine: machineName,
    mdescription: description,
    nextmaintenanceDate:nextRepairDate,
    maintenanceCost: cost,
    billNumber: billNo,
    maintenanceDate: repairDate,
  });


  if (!machineRepair) {
    return next(new ErrorHandler('Machine repair not found', 404));
  }

  res.status(200).json({
    success: true,
    machineRepair,
    repair,
  });
});

export const deleteMachineRepair = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const machineRepair = await Machine.findByIdAndDelete(id);

  if (!machineRepair) {
    return next(new ErrorHandler('Machine repair not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Machine repair deleted successfully',
  });
});