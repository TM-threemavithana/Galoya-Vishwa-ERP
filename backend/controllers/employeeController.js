import Employee from "../models/Employee.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import Sallery from "../models/Sallery.js";

// ➤ Add Employee with Auto-Incremented emplId
export const addEmployee = catchAsyncErrors(async (req, res, next) => {
  console.log("Received Request Body:", req.body); // Debugging Line

  const { name, idNumber, birthday, position, section, image, salary, monthSallery, month, workingDays, contactNumber1, contactNumber2, residence } = req.body;

  if (!name || !idNumber || !birthday || !position || !section) {
    return next(new ErrorHandler("Please fill in all required fields.", 400));
  }

  // Auto-increment emplId
  const latestEmployee = await Employee.findOne().sort({ emplId: -1 });
  console.log("Latest Employee Found:", latestEmployee); // Debugging Line

  const newEmplId = latestEmployee ? latestEmployee.emplId + 1 : 1;
  console.log("New Employee ID:", newEmplId); // Debugging Line

  try {
    const employee = await Employee.create({
      emplId: newEmplId,
      name,
      idNumber,
      birthday,
      position,
      section,
      image,
      salary,
      monthSallery,
      month,
      workingDays,
      contactNumber1,
      contactNumber2,
      residence,
    });

    console.log("Employee Created Successfully:", employee); // Debugging Line

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Error Creating Employee:", error); // Debugging Line
    next(new ErrorHandler(error.message, 500));
  }
});


// ➤ Get All Employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
  const employees = await Employee.find();
  res.status(200).json({
    success: true,
    employees,
  });
});

export const getSalary = catchAsyncErrors(async (req, res, next) => {
  const salaries = await Sallery.find();
  res.status(200).json({
    success: true,
    salaries,
  });
});

// ➤ Update Employee
export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, idNumber, birthday, position, section, image, salary, monthSallery, month, workingDays ,residence,contactNumber1,contactNumber2} = req.body;

  const employee = await Employee.findByIdAndUpdate(
    id,
    { name, idNumber, birthday, position, section, image, salary, monthSallery, month, workingDays,residence,contactNumber1,contactNumber2 },
    { new: true, runValidators: true }
  );

  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  // Create salary entry
  const salaryEntry = await Sallery.create({
    emplName: name,
    salaryPerDay: salary,
    smonthSallery: monthSallery,
    workDays: workingDays,
    smonth: month,
  });

  res.status(200).json({
    success: true,
    message: "Employee updated and salary record created!",
    employee,
    salaryEntry,
  });
});

// ➤ Delete Employee
export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  await employee.deleteOne();
  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});
