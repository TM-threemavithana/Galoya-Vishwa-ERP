// filepath: /c:/academic/Software Project/backend/controllers/machineController.js
import Machine from '../models/Machine.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import MachineRepair from '../models/MachineRepair.js';

export const addMachine = catchAsyncErrors(async (req, res, next) => {
  const { name, broughtDate, price, description,image,nextRepairDate,cost,billNo,repairDate,placeNum, } = req.body;

  if (!name || !broughtDate || !price || !description|| !image || !nextRepairDate|| !placeNum) {
    return next(new ErrorHandler('Please fill in all fields.', 400));
  }

  const machine = await Machine.create({
    name,
    placeNum,
    broughtDate,
    price,
    description,
    image,
    nextRepairDate,
    cost,
    billNo,
    repairDate,
  });

  res.status(201).json({
    success: true,
    machine,
  });
});

export const getMachines = catchAsyncErrors(async (req, res, next) => {
  const machines = await Machine.find();
  res.status(200).json({
    success: true,
    machines,
  });
});

export const getRepair = catchAsyncErrors(async (req, res, next) => {
  const machines = await MachineRepair.find();
  res.status(200).json({
    success: true,
    machines,
  });
});

export const updateMachine = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, repairDate, cost, description,image,nextRepairDate,billNo } = req.body;

  const machine = await Machine.findByIdAndUpdate(
    id,
    { name, repairDate, cost, description, image, nextRepairDate,billNo },
    { new: true, runValidators: true }
  );

  const repair = await MachineRepair.create({
    machine: name,
    mdescription: description,
    nextmaintenanceDate:nextRepairDate,
    maintenanceCost: cost,
    billNumber: billNo,
    maintenanceDate: repairDate,
  });


  if (!machine) {
    return next(new ErrorHandler('Machine not found', 404));
  }

  res.status(200).json({
    success: true,
    machine,
    repair,
  });
});

export const deleteMachine = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const machine = await Machine.findByIdAndDelete(id);

  if (!machine) {
    return next(new ErrorHandler('Machine not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Machine deleted successfully',
  });
});