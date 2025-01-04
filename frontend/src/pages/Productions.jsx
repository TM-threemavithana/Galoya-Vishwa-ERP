import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../context/ProductContext'; // Correct the import path

const Productions = () => {
  const { updateProductQuantity } = useContext(ProductContext);
  const [production, setProduction] = useState({
    date: '',
    name: '',
    quantity: '',
    time: '',
    description: ''
  });

  const [productNames, setProductNames] = useState([
    'Milk',
    'Milk powder',
    'Colorants and preservatives',
    'Bottles',
    'Labels',
    'Packaging films and foils'
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduction({ ...production, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation check
    if (!production.date || !production.name || !production.quantity || !production.time || !production.description) {
      toast.error('Please fill in all fields.');
      return;
    }
    // Update product quantity
    await updateProductQuantity(production.name, parseInt(production.quantity));
    setProduction({
      date: '',
      name: '',
      quantity: '',
      time: '',
      description: ''
    });
    toast.success('Production entry added successfully!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD NEW PRODUCTION ENTRY</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={production.date} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Product Name</label>
            <select name="name" value={production.name} onChange={handleChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a product</option>
              {productNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Quantity</label>
            <input type="text" name="quantity" value={production.quantity} onChange={handleChange} placeholder="Quantity" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Time</label>
            <input type="time" name="time" value={production.time} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={production.description} onChange={handleChange} placeholder="Description" className="form-textarea mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            ADD PRODUCTION ENTRY
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Productions;