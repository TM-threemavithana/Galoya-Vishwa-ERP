import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoriesResponse, distributionsResponse, stockReductionsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/inventories'),
          axios.get('http://localhost:5000/api/distributions'),
          axios.get('http://localhost:5000/api/stock-reductions')
        ]);

        const inventories = inventoriesResponse.data.inventories || [];
        const distributions = distributionsResponse.data.distributions || [];
        const stockReductions = stockReductionsResponse.data.stockReductions || [];

        const inventoryMap = {};

        // Increase quantity from inventories
        inventories.forEach(item => {
          if (!inventoryMap[item.inventoryName]) {
            inventoryMap[item.inventoryName] = 0;
          }
          inventoryMap[item.inventoryName] += item.quantity;
        });

        // Decrease quantity from distributions
        distributions.forEach(distribution => {
          distribution.inventories.forEach(item => {
            if (!inventoryMap[item.inventoryName]) {
              inventoryMap[item.inventoryName] = 0;
            }
            inventoryMap[item.inventoryName] -= item.quantity;
          });
        });

        // Decrease quantity from stock reductions
        stockReductions.forEach(item => {
          if (!inventoryMap[item.inventoryName]) {
            inventoryMap[item.inventoryName] = 0;
          }
          inventoryMap[item.inventoryName] -= item.quantity;
        });

        const inventoryData = Object.keys(inventoryMap).map(name => ({
          inventoryName: name,
          quantity: inventoryMap[name]
        }));

        setInventoryData(inventoryData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load inventory data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  const pieData = {
    labels: inventoryData.map(item => item.inventoryName),
    datasets: [
      {
        data: inventoryData.map(item => item.quantity),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg">
        <div className="p-4 border-white text-center">
          <h1 className="text-2xl font-bold text-gray-700">Stock Dashboard</h1>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg text-center shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-700">Stock Distribution</h2>
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="bg-white rounded-lg text-center shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-700">Stock Details</h2>
              <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-center text-sm font-semibold">
                    <th className="py-3 px-4 border-b">Product Name</th>
                    <th className="py-3 px-4 border-b">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-3 px-4 border-b">{item.inventoryName}</td>
                      <td className="py-3 px-4 border-b">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;