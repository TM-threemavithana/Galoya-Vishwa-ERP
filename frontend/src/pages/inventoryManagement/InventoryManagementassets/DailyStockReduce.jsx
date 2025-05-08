import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DailyStockReduce = () => {
  const [stockReduce, setStockReduce] = useState({
    date: '',
    inventoryName: '',
    description: '',
    quantity: ''
  });

  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const inventoryNames = ['Jeli Yougurts',
    'Pani Yougurts',
    'Normal Yougurts',
    'Ice Packets 50ml',
    'Ice Packets 20ml',
    'Curd',
    'Gee Oil',
    'Yougurt Drinking Bottles',
    'Milk Toffees'];
  const descriptions = ['Damaged', 'Expired', 'Private Use'];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://galoya-vishwa-erp-backend.onrender.com/api/stock-reductions');
      setRecords(response.data.stockReductions || []);
    } catch (error) {
      console.error('Error fetching records:', error);
      toast.error('Error fetching records');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockReduce({ ...stockReduce, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stockReduce.date || !stockReduce.inventoryName || !stockReduce.description || !stockReduce.quantity) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      if (isEditing) {
        await axios.put(`https://galoya-vishwa-erp-backend.onrender.com/api/stock-reductions/${editId}`, stockReduce);
        toast.success('Stock reduction updated successfully!');
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('https://galoya-vishwa-erp-backend.onrender.com/api/stock-reductions', stockReduce);
        toast.success('Stock reduction added successfully!');
      }
      setStockReduce({
        date: '',
        inventoryName: '',
        description: '',
        quantity: ''
      });
      fetchRecords();
    } catch (error) {
      toast.error('Error saving stock reduction');
      console.error('Error saving stock reduction:', error);
    }
  };

  const handleEdit = (record) => {
    setStockReduce(record);
    setIsEditing(true);
    setEditId(record._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://galoya-vishwa-erp-backend.onrender.com/api/stock-reductions/${id}`);
      toast.success('Stock reduction deleted successfully!');
      fetchRecords();
    } catch (error) {
      toast.error('Error deleting stock reduction');
      console.error('Error deleting stock reduction:', error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Daily Stock Reduction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={stockReduce.date} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Product Name</label>
            <select name="inventoryName" value={stockReduce.inventoryName} onChange={handleChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a Product</option>
              {inventoryNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <select name="description" value={stockReduce.description} onChange={handleChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a description</option>
              {descriptions.map((desc, index) => (
                <option key={index} value={desc}>{desc}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" name="quantity" value={stockReduce.quantity} onChange={handleChange} placeholder="Quantity" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isEditing ? 'Update' : 'Submit'}
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-5xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Stock Reduction Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Product Name</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Quantity</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b">{record.inventoryName}</td>
                  <td className="py-3 px-4 border-b">{record.description}</td>
                  <td className="py-3 px-4 border-b">{record.quantity}</td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <button onClick={() => handleEdit(record)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-md">Edit</button>
                    <button onClick={() => handleDelete(record._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(records.length / recordsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStockReduce;