import Employee from '../models/Employee.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

// Add Employee
export const addEmployee = catchAsyncErrors(async (req, res, next) => {
  const { name, idNumber, birthday, position, section, image, salary,regNumber,monthSallery} = req.body;

  if (!name || !idNumber || !birthday || !position || !section || !regNumber) {
    return next(new ErrorHandler('Please fill in all required fields.', 400));
  }

  const employee = await Employee.create({
    name,
    regNumber,
    idNumber,
    birthday,
    position,
    section,
    image,
    salary,
    monthSallery,
  });

  res.status(201).json({
    success: true,
    employee
  });
});

// Get All Employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
  const employees = await Employee.find();
  res.status(200).json({
    success: true,
    employees
  });
});

// Update Employee
export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler('Employee not found', 404));
  }

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    employee
  });
});

// Delete Employee
export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler('Employee not found', 404));
  }

  await employee.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Employee deleted successfully'
  });
});

