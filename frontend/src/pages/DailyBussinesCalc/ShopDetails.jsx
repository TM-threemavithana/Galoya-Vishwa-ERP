import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ShopDetails = () => {
  const [shopName, setShopName] = useState('');
  const [route, setRoute] = useState('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/shop-details', {
        shopName,
        route,
        ownerPhoneNumber,
        ownerName,
        address,
      });
      toast.success('Shop details saved successfully!');
      console.log('Shop details saved:', response.data);
    } catch (error) {
      toast.error('Error saving shop details');
      console.error('Error saving shop details:', error);
    }
  };

  return (
    <div className="max-w-6xl mt-6 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Shop</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Shop Name:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Route:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Owner's Phone Number:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={ownerPhoneNumber}
            onChange={(e) => setOwnerPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Owner's Name:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address:</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold"
        >
          Add Shop
        </button>
      </form>
    </div>
  );
};

export default ShopDetails;