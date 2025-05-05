import React, { useState, useEffect } from "react";
import upload_area from "../../assets/upload_area.svg";
import { FaUserAlt, FaIdCard, FaBirthdayCake, FaBriefcase, FaLayerGroup, FaPhoneAlt, FaHome, FaCalendarPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import the toast styles

const ResourceAdd = () => {
  const [image, setImage] = useState(null);
  const [employee, setEmployee] = useState({
    emplId: "",  // Auto-incremented Employee ID
    name: "",
    idNumber: "",
    birthday: "",
    position: "",
    section: "",
    image: "",
    salary: "",
    monthSallery: "",
    month: "",
    workingDays: "",
    contactNumber1: "",
    contactNumber2: "",
    residence: "",
  });

  // Fetch the last employee ID and increment it
  useEffect(() => {
    fetch("http://localhost:5000/api/employee")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          const nextId = data.lastEmplId ? data.lastEmplId + 1 : 1;
          setEmployee((prev) => ({ ...prev, emplId: nextId }));
        }
      })
      .catch((error) => console.error("Error fetching last employee ID:", error));
  }, []);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" || name === "monthSallery" || name === "workingDays"
        ? value ? Number(value) : ""  // Prevent NaN issues
        : value,
    }));
  };

  const addEmployee = async () => {
    console.log(employee);
    let responseData;

    let formData = new FormData();
    if (image) {
      formData.append("product", image);
    }

    // Upload image if selected
    if (image) {
      await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });

      if (responseData?.success) {
        employee.image = responseData.image_url;
      }
    }

    // Send employee data
    await fetch("http://localhost:5000/api/employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          toast.success("Employee added successfully!");
        } else {
          toast.error("Failed to add employee.");
        }
      })
      .catch(() => {
        toast.error("An error occurred while adding the employee.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-3xl border border-gray-300 hover:shadow-xl transition-shadow duration-500 rounded-[8px]">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 mb-8 text-center">
          Add New Employee
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex items-center space-x-3">
              <FaUserAlt className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1 ">
                <label className="block text-lg font-medium text-gray-700 mb-2 ">Name</label>
                <input
                  value={employee.name}
                  onChange={changeHandler}
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* ID Number */}
            <div className="flex items-center space-x-3">
              <FaIdCard className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">ID Number</label>
                <input
                  value={employee.idNumber}
                  onChange={changeHandler}
                  type="text"
                  name="idNumber"
                  placeholder="Enter ID number"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Contact Number 1 */}
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Contact Number 1</label>
                <input
                  value={employee.contactNumber1}
                  onChange={changeHandler}
                  type="text"
                  name="contactNumber1"
                  placeholder="Enter contact number 1"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Contact Number 2 */}
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Contact Number 2</label>
                <input
                  value={employee.contactNumber2}
                  onChange={changeHandler}
                  type="text"
                  name="contactNumber2"
                  placeholder="Enter contact number 2"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Residence */}
            <div className="flex items-center space-x-3">
              <FaHome className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Residence</label>
                <input
                  value={employee.residence}
                  onChange={changeHandler}
                  type="text"
                  name="residence"
                  placeholder="Enter residence"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Birthday */}
            <div className="flex items-center space-x-3">
              <FaBirthdayCake className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Birthday</label>
                <input
                  value={employee.birthday}
                  onChange={changeHandler}
                  type="date"
                  name="birthday"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Birthday */}
            <div className="flex items-center space-x-3">
              <FaCalendarPlus className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Joined Date</label>
                <input
                  value={employee.joinedDate}
                  onChange={changeHandler}
                  type="date"
                  name="joinedDate"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Position */}
            <div className="flex items-center space-x-3">
              <FaBriefcase className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Position</label>
                <input
                  value={employee.position}
                  onChange={changeHandler}
                  type="text"
                  name="position"
                  placeholder="Enter position"
                  className="form-input w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                />
              </div>
            </div>

            {/* Section Dropdown */}
            <div className="flex items-center space-x-3">
              <FaLayerGroup className="text-blue-500 text-2xl mt-9" />
              <div className="flex-1">
                <label className="block text-lg font-medium text-gray-700 mb-2">Section</label>
                <select
                  value={employee.section}
                  onChange={changeHandler}
                  name="section"
                  className="form-select w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 rounded-[6px]"
                >
                  <option value="">Select Section</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="distributing">Distributing</option>
                  <option value="produce and manufacturing">Produce and Manufacturing</option>
                  <option value="management">Management</option>
                </select>
              </div>
            </div>

          </div>

          {/* Image Upload */}
          <div className="mt-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">Upload Photo</label>
            <label htmlFor="file-input" className="block cursor-pointer mb-4">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="Upload"
                className="w-40 h-40 object-cover border-2 border-gray-300 rounded-md shadow-md rounded-[8px]"
              />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
          </div>

          {/* Add Employee Button */}
          <button
            type="button"
            onClick={addEmployee}
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg rounded-[6px]"
          >
            Add Employee
          </button>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ResourceAdd;
