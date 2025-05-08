import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adjustments = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [products, setProducts] = useState([]);
  const [newAdjustment, setNewAdjustment] = useState({
    productId: '',
    type: 'Damaged',
    quantity: 0,
    reason: '',
  });

  useEffect(() => {
    fetchAdjustments();
    fetchProducts();
  }, []);

  // Fetch all adjustments
  const fetchAdjustments = async () => {
    try {
      const response = await axios.get('https://galoya-vishwa-erp-backend.onrender.com/api/adjustments');
      setAdjustments(response.data.adjustments);
    } catch (error) {
      console.error("Error fetching adjustments", error);
    }
  };

  // Fetch all products for selection
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://galoya-vishwa-erp-backend.onrender.com/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Add a new adjustment
  const addAdjustment = async () => {
    if (!newAdjustment.productId || newAdjustment.quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }
    try {
      await axios.post('https://galoya-vishwa-erp-backend.onrender.com/api/adjustments', newAdjustment);
      fetchAdjustments();
      setNewAdjustment({ productId: '', type: 'Damaged', quantity: 0, reason: '' });
    } catch (error) {
      console.error("Error adding adjustment", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Inventory Adjustments</h2>

      {/* Add New Adjustment Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Adjustment</h3>
        <div className="mb-3">
          <label className="block mb-1">Product</label>
          <select
            value={newAdjustment.productId}
            onChange={(e) => setNewAdjustment({ ...newAdjustment, productId: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Adjustment Type</label>
          <select
            value={newAdjustment.type}
            onChange={(e) => setNewAdjustment({ ...newAdjustment, type: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Damaged">Damaged</option>
            <option value="Expired">Expired</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            value={newAdjustment.quantity}
            onChange={(e) => setNewAdjustment({ ...newAdjustment, quantity: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Reason</label>
          <input
            type="text"
            value={newAdjustment.reason}
            onChange={(e) => setNewAdjustment({ ...newAdjustment, reason: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          onClick={addAdjustment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Adjustment
        </button>
      </div>

      {/* Adjustments List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Reason</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {adjustments.map((adjustment) => (
              <tr key={adjustment.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{adjustment.productName}</td>
                <td className="py-2 px-4 border-b">{adjustment.type}</td>
                <td className="py-2 px-4 border-b">{adjustment.quantity}</td>
                <td className="py-2 px-4 border-b">{adjustment.reason}</td>
                <td className="py-2 px-4 border-b">{new Date(adjustment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adjustments;
