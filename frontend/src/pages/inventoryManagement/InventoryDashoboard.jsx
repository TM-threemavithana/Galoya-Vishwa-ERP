import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryDashboard = () => {
  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockResponse = await axios.get('http://localhost:5000/api/inventory/totalStock');
        const lowStockResponse = await axios.get('http://localhost:5000/api/inventory/lowStock');
        const salesResponse = await axios.get('http://localhost:5000/api/sales/recent');
        const performanceResponse = await axios.get('http://localhost:5000/api/products/performance');

        setTotalStock(stockResponse.data.totalStock);
        setLowStock(lowStockResponse.data.lowStockItems);
        setRecentSales(salesResponse.data.sales);
        setProductPerformance(performanceResponse.data.performance);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Stock */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg">Total Stock</h3>
          <p className="text-2xl mt-2">{totalStock}</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg">Low Stock Alerts</h3>
          <ul className="mt-2">
            {lowStock.map((item) => (
              <li key={item.id} className="text-sm text-red-500">
                {item.name} (Qty: {item.stock})
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Sales */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg">Recent Sales</h3>
          <ul className="mt-2">
            {recentSales.map((sale) => (
              <li key={sale.id} className="text-sm">
                {sale.productName} - {sale.quantity} units
              </li>
            ))}
          </ul>
        </div>

        {/* Product Performance */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="font-semibold text-lg">Top Product Performance</h3>
          <ul className="mt-2">
            {productPerformance.map((product) => (
              <li key={product.id} className="text-sm">
                {product.name} - {product.sales} sales
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
