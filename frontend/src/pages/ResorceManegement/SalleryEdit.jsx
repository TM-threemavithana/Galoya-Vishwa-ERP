import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalleryEdit = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Navigation Hook

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee");
        setEmployees(response.data.employees);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Error fetching employees.");
      }
    };

    fetchEmployees();
  }, []);

  const handleSalaryChange = (id, newSalary) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp._id === id ? { ...emp, salary: newSalary } : emp
      )
    );
  };

  const handleSave = async (id, salary) => {
    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, { salary });
      toast.success("Salary updated successfully!");
    } catch (error) {
      console.error("Error updating salary:", error);
      toast.error("Failed to update salary.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Employee Salaries
        </h2>

        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Employee</th>
              <th className="p-3 border">Position</th>
              <th className="p-3 border">Salary per day(LKR.)</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border text-center">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={emp.image || "https://via.placeholder.com/40"}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {emp.name}
                </td>
                <td className="p-3 border">{emp.position}</td>
                <td className="p-3 border">
                  <input
                    type="number"
                    value={emp.salary || ""}
                    onChange={(e) => handleSalaryChange(emp._id, e.target.value)}
                    className="w-full px-2 py-1 border rounded text-center"
                  />
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleSave(emp._id, emp.salary)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default SalleryEdit;