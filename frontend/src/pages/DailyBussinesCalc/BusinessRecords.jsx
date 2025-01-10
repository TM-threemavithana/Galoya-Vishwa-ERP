import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessRecords = () => {
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/totals');
        setTotals(response.data);
      } catch (error) {
        console.error('Error fetching totals data:', error);
      }
    };

    fetchTotals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/totals/${id}`);
      setTotals(totals.filter(total => total._id !== id));
    } catch (error) {
      console.error('Error deleting totals data:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Daily Business Records</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2">Date</th>
              <th className="border p-2">Total Value of Products Today Sale</th>
              <th className="border p-2">Total Value of Returned Items</th>
              <th className="border p-2">Total Value of Expired Items</th>
              <th className="border p-2">Total Value of Sample Given Items</th>
              <th className="border p-2">Total Money Value</th>
              <th className="border p-2">Credit Sales</th>
              <th className="border p-2">Credit Receives</th>
              <th className="border p-2">Leakages</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((total) => (
              <tr key={total._id}>
                <td className="border p-2">{new Date(total.createdAt).toLocaleDateString()}</td>
                <td className="border p-2">{total.productsSaleTotal}</td>
                <td className="border p-2">{total.returnedItemsTotal}</td>
                <td className="border p-2">{total.expiredItemsTotal}</td>
                <td className="border p-2">{total.sampleGivenTotal}</td>
                <td className="border p-2">{total.totalMoneyValue}</td>
                <td className="border p-2">{total.totalCreditSales}</td>
                <td className="border p-2">{total.totalCreditReceives}</td>
                <td className="border p-2">{total.leakage}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(total._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessRecords;