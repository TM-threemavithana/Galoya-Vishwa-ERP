import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Plus, Trash2, Edit2, Save } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RawAddMaterials = () => {
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    item: '',
    quantity: '',
    unit: 'kg',
    unitPrice: '',
    totalCost: '',
    sellerName: '',
    description: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const unitOptions = ['kg', 'L', 'unit', 'g', 'ml'];

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      // Auto-calculate total cost
      if (name === 'quantity' || name === 'unitPrice') {
        const quantity = name === 'quantity' ? value : prevState.quantity;
        const price = name === 'unitPrice' ? value : prevState.unitPrice;
        newState.totalCost = (parseFloat(quantity) * parseFloat(price) || '').toString();
      }
      return newState;
    });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update existing item
      setItems(prevItems => {
        const newItems = [...prevItems];
        newItems[editingIndex] = { ...currentItem };
        return newItems;
      });
      setEditingIndex(null);
    } else {
      // Add new item
      setItems(prevItems => [...prevItems, { ...currentItem }]);
    }
    // Reset form
    setCurrentItem({
      item: '',
      quantity: '',
      unit: 'kg',
      unitPrice: '',
      totalCost: '',
      sellerName: '',
      description: ''
    });
  };

  const editItem = (index) => {
    setCurrentItem(items[index]);
    setEditingIndex(index);
  };

  const deleteItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://galoya-vishwa-erp-backend.onrender.com/api/raw-materials-log', { date, items });
      toast.success('Data saved successfully!');
      navigate('/raw-materials-log', { state: response.data.rawMaterialsLog });
    } catch (error) {
      toast.error('Error saving data');
      console.error('Error saving data:', error);
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.totalCost) || 0), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <Wrench className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Dairy Stock Entry</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Select Date</h2>
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Item Entry Form */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-blue-600">
                {editingIndex !== null ? 'Edit Item' : 'Add New Item'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="item"
                  value={currentItem.item}
                  onChange={handleItemChange}
                  placeholder="Enter item name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="quantity"
                    value={currentItem.quantity}
                    onChange={handleItemChange}
                    placeholder="Enter quantity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="unit"
                    value={currentItem.unit}
                    onChange={handleItemChange}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={currentItem.unitPrice}
                  onChange={handleItemChange}
                  placeholder="Enter unit price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Total Cost</label>
                <input
                  type="number"
                  name="totalCost"
                  value={currentItem.totalCost}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Seller's Name</label>
                <input
                  type="text"
                  name="sellerName"
                  value={currentItem.sellerName}
                  onChange={handleItemChange}
                  placeholder="Enter seller's name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={currentItem.description}
                  onChange={handleItemChange}
                  placeholder="Enter description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {editingIndex !== null ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingIndex !== null ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-600">Added Items</h2>
                <div className="text-lg font-semibold text-blue-600">
                  Total: Rs {calculateTotal()}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-left">Unit Price</th>
                      <th className="px-4 py-2 text-left">Total Cost</th>
                      <th className="px-4 py-2 text-left">Seller</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-2">{item.item}</td>
                        <td className="px-4 py-2">{item.quantity} {item.unit}</td>
                        <td className="px-4 py-2">Rs {item.unitPrice}</td>
                        <td className="px-4 py-2">Rs {item.totalCost}</td>
                        <td className="px-4 py-2">{item.sellerName}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => editItem(index)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteItem(index)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Submit All Items
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawAddMaterials;