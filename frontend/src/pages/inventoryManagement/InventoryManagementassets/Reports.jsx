import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('stockLevels');

  useEffect(() => {
    fetchReports();
  }, []);

  // Fetch reports based on selected criteria
  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports`, {
        params: {
          reportType,
          startDate,
          endDate,
        },
      });
      setReports(response.data.reports);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  // Handle report generation
  const generateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    fetchReports();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      {/* Report Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="stockLevels">Stock Levels</option>
              <option value="salesTrends">Sales Trends</option>
              <option value="lowStockAlerts">Low Stock Alerts</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
        <button
          onClick={generateReport}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Generate Report
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Report Type</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{report.productName}</td>
                <td className="py-2 px-4 border-b">{report.type}</td>
                <td className="py-2 px-4 border-b">{report.quantity}</td>
                <td className="py-2 px-4 border-b">{new Date(report.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
