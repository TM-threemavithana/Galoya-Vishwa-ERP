import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [stockUpdate, setStockUpdate] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleStockChange = (productId, value) => {
    setStockUpdate((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const updateStock = async (productId) => {
    if (!stockUpdate[productId]) return;

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}/stock`, {
        stock: stockUpdate[productId],
      });
      fetchProducts(); // Refresh the list
      setStockUpdate((prev) => ({ ...prev, [productId]: '' })); // Reset the input
    } catch (error) {
      console.error("Error updating stock", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Current Stock</th>
              <th className="py-2 px-4 border-b">Update Stock</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={stockUpdate[product.id] || ''}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    placeholder="Enter new stock level"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => updateStock(product.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
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

export default InventoryManagement;
