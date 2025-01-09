import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext'; // Correct the import path

const Dashboard = () => {
  const { updatedProducts } = useContext(ProductContext);

  if (!updatedProducts) {
    return <div>Loading...</div>; // Handle the loading state
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Product Quantities</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Product Name</th>
              <th className="py-2 px-4 border-b text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {updatedProducts.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{product.name}</td>
                <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;