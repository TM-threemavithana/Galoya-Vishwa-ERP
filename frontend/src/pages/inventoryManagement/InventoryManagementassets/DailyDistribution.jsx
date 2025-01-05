import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DailyDistribution = () => {
  const [distribution, setDistribution] = useState({
    date: '',
    vehicleNumber: '',
    route: '',
    refName: '',
    driverName: ''
  });

  const [inventories, setInventories] = useState([{ inventoryName: '', quantity: '' }]);
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const vehicleNumbers = ['Vehicle 1', 'Vehicle 2', 'Vehicle 3'];
  const routes = ['Route A', 'Route B', 'Route C'];
  const refNames = ['Ref 1', 'Ref 2', 'Ref 3'];
  const driverNames = ['Driver 1', 'Driver 2', 'Driver 3'];
  const inventoryNames = ['Inventory 1', 'Inventory 2', 'Inventory 3'];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/distributions');
      setRecords(Array.isArray(response.data.distributions) ? response.data.distributions : []);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleDistributionChange = (e) => {
    const { name, value } = e.target;
    setDistribution({ ...distribution, [name]: value });
  };

  const handleInventoryChange = (index, e) => {
    const { name, value } = e.target;
    const newInventories = [...inventories];
    newInventories[index][name] = value;
    setInventories(newInventories);
  };

  const handleAddInventory = () => {
    setInventories([...inventories, { inventoryName: '', quantity: '' }]);
  };

  const handleRemoveInventory = (index) => {
    const newInventories = inventories.filter((_, i) => i !== index);
    setInventories(newInventories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!distribution.date || !distribution.vehicleNumber || !distribution.route || !distribution.refName || !distribution.driverName) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (inventories.some(inventory => !inventory.inventoryName || !inventory.quantity)) {
      toast.error('Please fill in all inventory fields.');
      return;
    }
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/distributions/${editId}`, { ...distribution, inventories });
        toast.success('Distribution updated successfully!');
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/distributions', { ...distribution, inventories });
        toast.success('Distribution added successfully!');
      }
      setDistribution({
        date: '',
        vehicleNumber: '',
        route: '',
        refName: '',
        driverName: ''
      });
      setInventories([{ inventoryName: '', quantity: '' }]);
      fetchRecords();
    } catch (error) {
      toast.error('Error adding/updating distribution');
      console.error('Error adding/updating distribution:', error);
    }
  };

  const handleEdit = (record) => {
    setDistribution({
      date: record.date,
      vehicleNumber: record.vehicleNumber,
      route: record.route,
      refName: record.refName,
      driverName: record.driverName
    });
    setInventories(record.inventories);
    setIsEditing(true);
    setEditId(record._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/distributions/${id}`);
      toast.success('Distribution deleted successfully!');
      fetchRecords();
    } catch (error) {
      toast.error('Error deleting distribution');
      console.error('Error deleting distribution:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Daily Distribution</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={distribution.date} onChange={handleDistributionChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Vehicle Number</label>
            <select name="vehicleNumber" value={distribution.vehicleNumber} onChange={handleDistributionChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a vehicle</option>
              {vehicleNumbers.map((vehicle, index) => (
                <option key={index} value={vehicle}>{vehicle}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Route</label>
            <select name="route" value={distribution.route} onChange={handleDistributionChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a route</option>
              {routes.map((route, index) => (
                <option key={index} value={route}>{route}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Reference Name</label>
            <select name="refName" value={distribution.refName} onChange={handleDistributionChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a reference</option>
              {refNames.map((ref, index) => (
                <option key={index} value={ref}>{ref}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Driver Name</label>
            <select name="driverName" value={distribution.driverName} onChange={handleDistributionChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a driver</option>
              {driverNames.map((driver, index) => (
                <option key={index} value={driver}>{driver}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Inventories</h3>
            {inventories.map((inventory, index) => (
              <div key={index} className="flex mb-2">
                <select name="inventoryName" value={inventory.inventoryName} onChange={(e) => handleInventoryChange(index, e)} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2">
                  <option value="">Select an inventory</option>
                  {inventoryNames.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                  ))}
                </select>
                <input type="number" name="quantity" value={inventory.quantity} onChange={(e) => handleInventoryChange(index, e)} placeholder="Quantity" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2" />
                <button type="button" onClick={() => handleRemoveInventory(index)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddInventory} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">Add Inventory</button>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{isEditing ? 'Update' : 'Submit'}</button>
        </form>
        <ToastContainer />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Distribution Records</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Vehicle Number</th>
              <th className="py-2 px-4 border-b">Route</th>
              <th className="py-2 px-4 border-b">Reference Name</th>
              <th className="py-2 px-4 border-b">Driver Name</th>
              <th className="py-2 px-4 border-b">Inventory Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{record.date}</td>
                <td className="py-2 px-4 border-b">{record.vehicleNumber}</td>
                <td className="py-2 px-4 border-b">{record.route}</td>
                <td className="py-2 px-4 border-b">{record.refName}</td>
                <td className="py-2 px-4 border-b">{record.driverName}</td>
                <td className="py-2 px-4 border-b">
                  {record.inventories.map((inventory, index) => (
                    <div key={index}>
                      {inventory.inventoryName}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  {record.inventories.map((inventory, index) => (
                    <div key={index}>
                      {inventory.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEdit(record)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-md mr-2">Edit</button>
                  <button onClick={() => handleDelete(record._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyDistribution;