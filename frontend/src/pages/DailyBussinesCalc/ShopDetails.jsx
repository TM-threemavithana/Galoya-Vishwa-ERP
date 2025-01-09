import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ShopDetails = () => {
  const [shopName, setShopName] = useState('');
  const [route, setRoute] = useState('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [shops, setShops] = useState([]);
  const [uniqueRoutes, setUniqueRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newShop = { shopName, route, ownerPhoneNumber, ownerName, address };
      const response = await axios.post('http://localhost:5000/api/shop-details', newShop);
      toast.success('Shop details saved successfully!');
      console.log('Shop details saved:', response.data);

      // Update the shop list and routes dynamically
      setShops((prev) => [...prev, response.data]);
      if (!uniqueRoutes.includes(route)) {
        setUniqueRoutes((prev) => [...prev, route]);
      }

      // Clear form inputs
      setShopName('');
      setRoute('');
      setOwnerPhoneNumber('');
      setOwnerName('');
      setAddress('');
    } catch (error) {
      toast.error('Error saving shop details');
      console.error('Error saving shop details:', error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shop-details');
      setShops(response.data);

      // Extract unique routes
      const routes = [...new Set(response.data.map((shop) => shop.route))];
      setUniqueRoutes(routes);
    } catch (error) {
      console.error('Error fetching shop details:', error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const filteredShops = selectedRoute
    ? shops.filter((shop) => shop.route === selectedRoute)
    : shops;

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

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Shop Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filter by Route:</label>
          <select
            className="w-full border rounded-lg p-2"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="">All Routes</option>
            {uniqueRoutes.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Shop Name</th>
              <th className="py-2 px-4 border-b text-center">Route</th>
              <th className="py-2 px-4 border-b text-center">Owner's Phone Number</th>
              <th className="py-2 px-4 border-b text-center">Owner's Name</th>
              <th className="py-2 px-4 border-b text-center">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr key={shop._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{shop.shopName}</td>
                <td className="py-2 px-4 border-b text-center">{shop.route}</td>
                <td className="py-2 px-4 border-b text-center">{shop.ownerPhoneNumber}</td>
                <td className="py-2 px-4 border-b text-center">{shop.ownerName}</td>
                <td className="py-2 px-4 border-b text-center">{shop.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopDetails;
