import React, { useEffect, useState } from "react";
import { FaUsers, FaChartPie, FaUserPlus, FaSearch } from "react-icons/fa";

const Card = ({ children }) => (
  <div className="p-6 bg-white shadow-md rounded-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    {children}
  </div>
);

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/employee")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.employees)) {
          // Get the current date
          const currentDate = new Date();

          // Filter employees that were added in the last 90 days
          const filteredEmployees = data.employees.filter((employee) => {
            const createdAtDate = new Date(employee.createdAt);
            const timeDifference = currentDate - createdAtDate;
            const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert ms to days

            return daysDifference <= 90; // If the employee was added within the last 90 days
          });

          // Sort the filtered employees by the `createdAt` field, if necessary
          const sortedEmployees = filteredEmployees.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt); // Sort by most recent
          });

          setEmployees(sortedEmployees);
          setTotalEmployees(sortedEmployees.length);
          setRecentEmployees(sortedEmployees.slice(0, 3)); // Get top 3 recent additions
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

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Employee Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center">
            <FaUsers className="text-blue-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Employees</h3>
              <p className="text-gray-600 text-lg">{totalEmployees}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <FaChartPie className="text-green-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Departments</h3>
              <p className="text-gray-600 text-lg">{[...new Set(employees.map(e => e.section))].length}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <FaUserPlus className="text-orange-500 text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Recent Additions</h3>
              <p className="text-gray-600 text-lg">{recentEmployees.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Employee List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredEmployees.length === 0 ? (
          <div className="col-span-2 text-center text-lg text-gray-500">No employees found</div>
        ) : (
          filteredEmployees.map((employee) => (
            <Card key={employee.idNumber}>
              <div className="flex items-center space-x-6">
                <img
                  src={employee.image || "https://via.placeholder.com/100"}
                  alt={employee.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{employee.name}</h3>
                  <p className="text-gray-600 text-lg">{employee.position}</p>
                  <p className="text-gray-500 text-sm">{employee.section}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Joined on: {new Date(employee.createdAt).toLocaleDateString()}
                  </p>
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