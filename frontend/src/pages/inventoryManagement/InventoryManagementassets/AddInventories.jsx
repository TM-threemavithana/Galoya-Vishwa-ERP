import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddInventories = () => {
  const [inventory, setInventory] = useState({
    date: '',
    inventoryName: '',
    quantity: '',
    expiredDate: '',
    batchNo: '',
    labourName: '',
  });

  const [inventoryNames, setInventoryNames] = useState([
    'Jeli Yougurts',
    'Pani Yougurts',
    'Normal Yougurts',
    'Ice Packets 50ml',
    'Ice Packets 20ml',
    'Curd',
    'Gee Oil',
    'Yougurt Drinking Bottles',
    'Milk Toffees',
  ]);

  const [newInventoryName, setNewInventoryName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "quantity" && value < 0) {
      toast.error("Quantity cannot be negative.");
      return;
    }
  
    setInventory({ ...inventory, [name]: value });
  };

  const handleNewInventoryNameChange = (e) => {
    setNewInventoryName(e.target.value);
  };

  const handleAddNewInventoryName = (e) => {
    e.preventDefault();
    if (newInventoryName.trim() === '') {
      toast.error('Please enter an inventory name.');
      return;
    }
    if (inventoryNames.includes(newInventoryName)) {
      toast.error('Inventory name already exists.');
      return;
    }
    setInventoryNames([...inventoryNames, newInventoryName]);
    setNewInventoryName('');
    toast.success('New inventory name added successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inventory.date || !inventory.inventoryName || !inventory.quantity || !inventory.expiredDate || !inventory.batchNo || !inventory.labourName) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      await axios.post('https://galoya-vishwa-erp-backend.onrender.com/api/inventories', inventory);
      toast.success('Inventory added successfully!');
      setInventory({
        date: '',
        inventoryName: '',
        quantity: '',
        expiredDate: '',
        batchNo: '',
        labourName: '',
      });
    } catch (error) {
      toast.error('Error adding inventory');
      console.error('Error adding inventory:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD PRODUCTS</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={inventory.date} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Product Name</label>
            <select name="inventoryName" value={inventory.inventoryName} onChange={handleChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a Product</option>
              {inventoryNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" name="quantity" value={inventory.quantity} onChange={handleChange} placeholder="Quantity" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Expired Date</label>
            <input type="date" name="expiredDate" value={inventory.expiredDate} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Batch No</label>
            <input type="text" name="batchNo" value={inventory.batchNo} onChange={handleChange} placeholder="Batch No" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Labour Name</label>
            <input type="text" name="labourName" value={inventory.labourName} onChange={handleChange} placeholder="Labour Name" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            ADD PRODUCT
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD NEW PRODUCT NAME</h2>
        <form onSubmit={handleAddNewInventoryName}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">New Product Name</label>
            <input type="text" value={newInventoryName} onChange={handleNewInventoryNameChange} placeholder="New Inventory Name" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            ADD PRODUCT NAME
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddInventories;