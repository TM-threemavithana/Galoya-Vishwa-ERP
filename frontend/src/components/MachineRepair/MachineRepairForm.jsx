import React, { useState } from 'react';

const MachineRepairForm = () => {
  const [formData, setFormData] = useState({
    machineName: '',
    description: '',
    cost: '',
    repairDate: new Date().toISOString().split('T')[0],
    nextrepairDate: new Date().toISOString().split('T')[0],
  });

  const [receiptPhoto, setReceiptPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setReceiptPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('machineName', formData.machineName);
    data.append('description', formData.description);
    data.append('cost', formData.cost);
    data.append('repairDate', formData.repairDate);
    data.append('nextrepairDate', formData.nextrepairDate);
    data.append('receiptPhoto', receiptPhoto);

    fetch('http://localhost:5000/api/repairs', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Repair logged successfully!');
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Machine Repair
      </h2>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Machine Name:</label>
        <input
          type="text"
          name="machineName"
          value={formData.machineName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Cost Price:</label>
        <input
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Receipt Photo:</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Repair Date:</label>
        <input
          type="date"
          name="repairDate"
          value={formData.repairDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Next Repair Date:</label>
        <input
          type="date"
          name="nextrepairDate"
          value={formData.nextrepairDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form> 
  );
};

export default MachineRepairForm;
