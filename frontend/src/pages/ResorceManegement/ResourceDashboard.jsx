import React, { useEffect, useState } from "react";
import { FaUsers, FaChartPie, FaUserPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Card = ({ children, onClick }) => (
  <div
    className="p-6 bg-white shadow-md rounded-[6px] hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
    onClick={onClick}
  >
    {children}
  </div>
);

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all-employee");
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://galoya-vishwa-erp-backend.onrender.com/api/employee")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.employees)) {
          setEmployees(data.employees);
          setTotalEmployees(data.employees.length);
        } else {
          console.error("API returned a non-array response:", data);
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      });
  }, []);

  // Step 1: Filter employees based on search term
  
  let filteredEmployees = employees.filter((employee) => {
    const formattedId = `GV ${employee.emplId.toString().padStart(2, "0")}`;
    const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
    const normalizedName = employee.name.toLowerCase().replace(/\s+/g, '');
    const normalizedId = formattedId.toLowerCase().replace(/\s+/g, '');
  
    return (
      normalizedName.includes(normalizedSearch) ||
      normalizedId.includes(normalizedSearch)
    );
  });
  

  // Step 2: Apply sorting based on selection
  if (sortBy === "all-employee") {
    filteredEmployees = [...filteredEmployees].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else if (sortBy === "department") {
    filteredEmployees = [...filteredEmployees]
      .filter((employee) =>
        selectedDepartment ? employee.section === selectedDepartment : true
      )
      .sort((a, b) => a.section.localeCompare(b.section));
  } else if (sortBy === "recent") {
    const currentDate = new Date();
    filteredEmployees = filteredEmployees
      .filter((employee) => {
        const createdAtDate = new Date(employee.createdAt);
        return (currentDate - createdAtDate) / (1000 * 3600 * 24) <= 90;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }

  // Get the 3 most recent employees for the "Recent Additions" card
  const recentEmployees = employees
    .filter((employee) => {
      const currentDate = new Date();
      const createdAtDate = new Date(employee.createdAt);
      return (currentDate - createdAtDate) / (1000 * 3600 * 24) <= 90;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const departments = [...new Set(employees.map((e) => e.section))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card onClick={() => {
          setSortBy("all-employee");
          setShowDepartmentDropdown(false);
          setSelectedDepartment("");
        }}>
          <div className="flex items-center">
            <FaUsers className="text-blue-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Employees</h3>
              <p className="text-gray-600 text-lg">{totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => {
          setSortBy("department");
          setShowDepartmentDropdown(!showDepartmentDropdown);
        }}>
          <div className="flex items-center">
            <FaChartPie className="text-green-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Departments</h3>
              <p className="text-gray-600 text-lg">{departments.length}</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => {
          setSortBy("recent");
          setShowDepartmentDropdown(false);
          setSelectedDepartment("");
        }}>
          <div className="flex items-center">
            <FaUserPlus className="text-orange-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Recent Additions</h3>
              <p className="text-gray-600 text-lg">{recentEmployees.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Dropdown for selecting a department */}
      {showDepartmentDropdown && sortBy === "department" && (
        <div className="mb-6">
          <select
            className="w-full md:w-1/3 p-3 rounded-[6px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      )}

      {/* Search Box */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 rounded-[6px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Employee name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mb-4">Employee List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredEmployees.length === 0 ? (
          <div className="col-span-2 text-center text-lg text-gray-500">
            No employees found
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <Card key={employee.idNumber} onClick={() => navigate(`/employee/${employee.idNumber}`, { state: { employee } })}>

              <div className="relative">
                <h3 className="text-gray-500 text-sm absolute top-0 right-0 mt-1 mr-4">
                  GV 0{employee.emplId}
                </h3>

                <div className="flex items-center space-x-6">
                  <img
                    src={employee.image || "https://via.placeholder.com/100"}
                    alt={employee.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{employee.name}</h3>
                    <p className="text-gray-600 text-lg">{employee.position}</p>
                    <p className="text-gray-540 text-m">{employee.idNumber}</p>
                    <p className="text-gray-500 text-sm">{employee.section}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      Joined on: {employee.joinedDate?.slice(0,10) || employee.createdAt?.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
