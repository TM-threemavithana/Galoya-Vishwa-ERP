import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const ResourceSallery = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [salaryPerDay, setSalaryPerDay] = useState(0);
  const [workDays, setWorkDays] = useState("");
  const [otHours, setOtHours] = useState("");
  const [absenceDays, setAbsenceDays] = useState("");
  const [deductions, setDeductions] = useState("");
  const [totalSalary, setTotalSalary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);

    if (employeeId) {
      const selectedEmp = employees.find((emp) => emp._id === employeeId);
      if (selectedEmp && selectedEmp.salary) {
        setSalaryPerDay(selectedEmp.salary);
      } else {
        setSalaryPerDay(0);
      }
    }
  };

  const calculateSalary = () => {
    const otPayPerHour = salaryPerDay * 0.1;
    const bonus = absenceDays === "0" ? 5000 : 0;

    const workPay = Number(workDays) * salaryPerDay;
    const otPay = Number(otHours) * otPayPerHour;
    const deductionAmount = deductions ? parseFloat(deductions) : 0;

    const finalSalary = workPay + otPay - deductionAmount + bonus;
    setTotalSalary(finalSalary);
  };

  const saveSalary = async () => {
    if (!selectedEmployee || totalSalary === null) {
      toast.error("Please calculate salary before saving."); // Show error message
      return;
    }

    const salaryData = {
      employeeId: selectedEmployee,
      workDays: Number(workDays),
      otHours: Number(otHours),
      absenceDays: Number(absenceDays),
      deductions: Number(deductions),
      monthSallery: totalSalary, // Set monthSallery to totalSalary
      month: new Date().toISOString().slice(0, 7), // Get YYYY-MM format
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/employee/${selectedEmployee}`, salaryData);
      if (response.data.success) {
        toast.success("Salary saved successfully!"); // Success message
        console.log( response.data.employee); 
      } else {
        toast.error("Failed to save salary."); // Error message
      }
    } catch (error) {
      console.error("Error saving salary:", error);
      toast.error("Error saving salary."); // Error message
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Salary Calculator</h2>

      <label className="block mb-2">Select Employee</label>
      <select
        value={selectedEmployee}
        onChange={handleEmployeeChange}
        className="w-full px-4 py-2 border rounded-md mb-3"
      >
        <option value="">Select Employee</option>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No employees found
          </option>
        )}
      </select>

      <label className="block mb-2">Salary per Day (LKR.)</label>
      <input
        type="text"
        value={salaryPerDay}
        readOnly
        className="w-full px-4 py-2 border rounded-md mb-3 bg-gray-100"
      />

      <label className="block mb-2">Work Days</label>
      <input
        type="number"
        value={workDays}
        onChange={(e) => setWorkDays(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-3"
        placeholder="Enter work days"
      />

      <label className="block mb-2">OT Hours</label>
      <input
        type="number"
        value={otHours}
        onChange={(e) => setOtHours(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-3"
        placeholder="Enter OT hours"
      />

      <label className="block mb-2">Absence Days</label>
      <input
        type="number"
        value={absenceDays}
        onChange={(e) => setAbsenceDays(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-3"
        placeholder="Enter absence days"
      />

      <label className="block mb-2">Deductions (LKR.)</label>
      <input
        type="number"
        value={deductions}
        onChange={(e) => setDeductions(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-3"
        placeholder="Enter deductions"
      />

      <button
        onClick={calculateSalary}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Calculate Salary
      </button>

      {totalSalary !== null && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md">
          <h3 className="text-lg font-bold">Total Salary: LKR.{totalSalary}</h3>
        </div>
      )}

      <button
        onClick={saveSalary}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Save Total Salary
      </button>

      <button
        onClick={() => navigate("/salaries/edit")}
        className="w-full mt-4 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
      >
        Edit Salary
      </button>

      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default ResourceSallery;
