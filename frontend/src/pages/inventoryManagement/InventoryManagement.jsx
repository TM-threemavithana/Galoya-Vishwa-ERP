import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from all three endpoints
        const [productionResponse, distributionResponse, stockReduceResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/inventories'),
          axios.get('http://localhost:5000/api/distributions'),
          axios.get('http://localhost:5000/api/stock-reductions')
        ]);

        // Log the response data to check its structure
        console.log('Production Response:', productionResponse.data);
        console.log('Distribution Response:', distributionResponse.data);
        console.log('Stock Reduction Response:', stockReduceResponse.data);

        // Check if the data is an array and process it
        const productionData = Array.isArray(productionResponse.data.inventories) ? productionResponse.data.inventories.map(item => ({
          ...item,
          description: 'Produced',
          colorClass: 'text-green-500'
        })) : [];

        const distributionData = Array.isArray(distributionResponse.data.distributions) ? distributionResponse.data.distributions.flatMap(record => 
          record.inventories.map(inventory => ({
            ...record,
            description: 'Distributed',
            colorClass: 'text-orange-500',
            inventoryName: inventory.inventoryName,
            quantity: inventory.quantity
          }))
        ) : [];

        const stockReduceData = Array.isArray(stockReduceResponse.data.stockReductions) ? stockReduceResponse.data.stockReductions.map(item => ({
          ...item,
          description: item.description || 'Reduced', // Fallback if description is not provided
          colorClass: 'text-red-500'
        })) : [];

        // Combine and sort all data by date (most recent first)
        const combinedData = [...productionData, ...distributionData, ...stockReduceData]
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load inventory data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-lg">Loading Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left font-semibold">Date</th>
              <th className="py-3 px-4 border-b text-left font-semibold">Inventory Name</th>
              <th className="py-3 px-4 border-b text-left font-semibold">Quantity</th>
              <th className="py-3 px-4 border-b text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={`${item.id || index}-${item.description}`}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4 border-b">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{item.inventoryName}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className={`py-2 px-4 border-b ${item.colorClass}`}>
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;