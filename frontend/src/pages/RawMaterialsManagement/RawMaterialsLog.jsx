import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

const RawMaterialsLog = () => {
  const [logs, setLogs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/raw-materials-log');
        setLogs(response.data.rawMaterialsLogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLogs();
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (parseFloat(item.totalCost) || 0), 0).toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Raw Materials Log
        </h1>
        <p className="text-gray-600 mb-6">
          Daily record of raw materials purchased
        </p>

        {logs.map((log, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <div
              className="flex items-center justify-between p-4 cursor-pointer border-l-4 border-blue-500"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-lg font-medium">{formatDate(log.date)}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-blue-600">
                  Rs {calculateTotal(log.items)}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Total Cost
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Seller
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {log.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.item}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          Rs {item.unitPrice}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          Rs {item.totalCost}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.sellerName}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td
                        colSpan="3"
                        className="px-4 py-3 text-right font-medium"
                      >
                        Daily Total:
                      </td>
                      <td
                        colSpan="2"
                        className="px-4 py-3 font-medium text-blue-600"
                      >
                        Rs {calculateTotal(log.items)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RawMaterialsLog;