import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const InventoryManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productionResponse, distributionResponse, stockReduceResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/inventories'),
          axios.get('http://localhost:5000/api/distributions'),
          axios.get('http://localhost:5000/api/stock-reductions'),
        ]);

        const productionData = Array.isArray(productionResponse.data.inventories)
          ? productionResponse.data.inventories.map((item) => ({
              ...item,
              description: 'Produced',
              colorClass: 'text-green-500',
            }))
          : [];

        const distributionData = Array.isArray(distributionResponse.data.distributions)
          ? distributionResponse.data.distributions.flatMap((record) =>
              record.inventories.map((inventory) => ({
                ...record,
                description: 'Distributed',
                colorClass: 'text-orange-500',
                inventoryName: inventory.inventoryName,
                quantity: inventory.quantity,
              }))
            )
          : [];

        const stockReduceData = Array.isArray(stockReduceResponse.data.stockReductions)
          ? stockReduceResponse.data.stockReductions.map((item) => ({
              ...item,
              description: item.description || 'Reduced',
              colorClass: 'text-red-500',
            }))
          : [];

        const combinedData = [...productionData, ...distributionData, ...stockReduceData].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

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

  useEffect(() => {
    // Filter data based on the selected date
    const filtered = data.filter((item) =>
      new Date(item.date).toDateString() === selectedDate.toDateString()
    );
    setFilteredData(filtered);
  }, [selectedDate, data]);

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
    <div className="container mx-auto h-screen p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar */}
        <div className="bg-white shadow p-4 rounded">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="react-calendar"
          />
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-500">
              No data available for the selected date.
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left font-semibold">Date</th>
                  <th className="py-3 px-4 border-b text-left font-semibold">Product Name</th>
                  <th className="py-3 px-4 border-b text-left font-semibold">Quantity</th>
                  <th className="py-3 px-4 border-b text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
