import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResourceEdit = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    section: "", // Stores selected department
    contactNumber1: "",
    contactNumber2: "", 
    residence: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://galoya-vishwa-erp-backend.onrender.com/api/employee");
        setEmployees(response.data.employees);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Error fetching employees list.");
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectEmployee = (selected) => {
    setSelectedEmployee(selected);
    setEmployee({
      name: selected.name,
      position: selected.position,
      section: selected.section,
      contactNumber1: selected.contactNumber1,
      contactNumber2: selected.contactNumber2,
      residence: selected.residence,

    });
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://galoya-vishwa-erp-backend.onrender.com/api/employee/${selectedEmployee._id}`, employee);
      toast.success("Employee details updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee.");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const formattedId = `GV ${emp.emplId.toString().padStart(2, "0")}`;
    const normalizedSearch = searchQuery.toLowerCase().replace(/\s+/g, '');
    const normalizedName = emp.name.toLowerCase().replace(/\s+/g, '');
    const normalizedId = formattedId.toLowerCase().replace(/\s+/g, '');
  
    return (
      normalizedName.includes(normalizedSearch) ||
      normalizedId.includes(normalizedSearch)
    );
  });
  


  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6 rounded-[6px]">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 rounded-[6px]">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 mb-6 text-center">
          Edit Employee Details
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Employee Name or Employee Id"
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-[6px]"
            onFocus={() => setDropdownOpen(true)}
          />
          {/* Custom Dropdown */}
          {dropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto mt-1 rounded-[6px]">
              {filteredEmployees.map((emp) => (
                <li
                  key={emp._id}
                  onClick={() => handleSelectEmployee(emp)}
                  className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer"
                >
                  <img
                    src={emp.image || "https://via.placeholder.com/40"}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{emp.name}</span>
                  <span className="text-gray-500 text-sm"> (GV 0{emp.emplId})</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Form to Edit Employee Details */}
        {selectedEmployee && (
          <form onSubmit={handleSubmit}>
            {/* Employee ID - own row */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-1">Employee ID</label>
              <input
                type="text"
                value={`GV ${selectedEmployee.emplId.toString().padStart(2, "0")}`}
                disabled
                className="form-input w-[48%] px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700"
              />
            </div>

            {/* Name and Position side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name || ""}
                  onChange={handleChange}
                  placeholder="Employee Name"
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={employee.position || ""}
                  onChange={handleChange}
                  placeholder="Position"
                  className="form-input w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Section, Residence, Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Section</label>
                <select
                  name="section"
                  value={employee.section || ""}
                  onChange={handleChange}
                  className="form-select w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="cleaning">Cleaning</option>
                  <option value="distributing">Distributing</option>
                  <option value="produce and manufacturing">Produce and Manufacturing</option>
                  <option value="management">Management</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Residence</label>
                <input
                  type="text"
                  name="residence"
                  value={employee.residence || ""}
                  onChange={handleChange}
                  placeholder="Residence Address"
                  className="form-input w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Contact Number 1</label>
                <input
                  type="text"
                  name="contactNumber1"
                  value={employee.contactNumber1 || ""}
                  onChange={handleChange}
                  placeholder="Contact Number 1"
                  className="form-input text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Contact Number 2</label>
                <input
                  type="text"
                  name="contactNumber2"
                  value={employee.contactNumber2 || ""}
                  onChange={handleChange}
                  placeholder="Contact Number 2"
                  className="form-input text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
            >
              Update Employee
            </button>
          </form>
        )}

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default ResourceEdit;