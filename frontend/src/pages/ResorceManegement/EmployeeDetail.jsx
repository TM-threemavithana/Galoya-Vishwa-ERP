import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;

  if (!employee) {
    return (
      <div className="p-6">
        <p className="text-red-500">Employee data not available.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-w-[560px] mx-auto bg-white shadow-lg rounded-lg ml-80 mr-80 mt-10 mb-20">

      <div className="flex flex-col items-center mb-6">
        <img
          src={employee.image || "https://via.placeholder.com/150"}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">{employee.name}</h2>
        <p className="text-gray-500">GV 0{employee.emplId}</p>
      </div>

      <div>
          <label className="block text-gray-700 font-semibold">Employee Id</label>
          <input
            type="text"
            value={`GV ${employee.emplId.toString().padStart(2, "0")}`}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />

      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            value={employee.name}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">National ID Number</label>
          <input
            type="text"
            value={employee.idNumber}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">BirthDay</label>
          <input
            type="text"
            value={new Date(employee.birthday).toLocaleDateString()}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Position</label>
          <input
            type="text"
            value={employee.position}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Department</label>
          <input
            type="text"
            value={employee.section}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Residence</label>
          <input
            type="text"
            value={employee.residence}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
        <label className="block text-gray-700 font-semibold">Contact</label>
        <input
            type="text"
            value={`${employee.contactNumber1} , ${employee.contactNumber2}`}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Joined Date</label>
          <input
            type="text"
            value={new Date(employee.createdAt).toLocaleDateString()}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Current Salary for Day</label>
          <input
            type="text"
            value={employee.salary}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Last Month Salary</label>
          <input
            type="text"
            value={employee.monthSallery}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

      </form>

      <button
        onClick={() => navigate("/resource-dashboard")}
        className="mt-6 block mx-auto px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>
    </div>
  );
};

export default EmployeeDetail;
