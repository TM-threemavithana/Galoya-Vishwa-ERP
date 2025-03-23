import React, { useState, useEffect } from "react";
import axios from "axios";

const ResourceSallery = () => {
  const [employees, setEmployees] = useState([]); // Ensure it's an array
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [otHours, setOtHours] = useState("");
  const [absenceDays, setAbsenceDays] = useState("");
  const [deductions, setDeductions] = useState("");
  const [totalSalary, setTotalSalary] = useState(null);

  // Fetch the list of employees from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        // Ensure the response contains 'success' and 'employees' properties
        if (response.data.success && Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees); // Set employees array
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const calculateSalary = () => {
    const payPerHour = 1000; // Change this if needed
    const otPayPerHour = 200;
    const bonus = absenceDays == 0 ? 5000 : 0;

    const workPay = workDays * payPerHour;
    const otPay = otHours * otPayPerHour;
    const deductionAmount = deductions ? parseFloat(deductions) : 0;

    const finalSalary = workPay + otPay - deductionAmount + bonus;
    setTotalSalary(finalSalary);
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
        {Array.isArray(employees) && employees.length > 0 ? (
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
    </div>
  );
};

export default ResourceSallery;
