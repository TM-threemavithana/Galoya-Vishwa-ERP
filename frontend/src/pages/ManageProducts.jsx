import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Sidebar from "../components/Sidebar";


const ManageProducts = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://galoya-vishwa-erp-backend.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingProduct(products[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(`https://galoya-vishwa-erp-backend.onrender.com/api/products/${editingProduct._id}`, editingProduct)
      .then((response) => {
        setProducts(
          products.map((product, index) =>
            index === editingIndex ? response.data : product
          )
        );
        setEditingIndex(null);
        setEditingProduct(null);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const handleDelete = (index) => {
    const productToDelete = products[index];
    axios
      .delete(`https://galoya-vishwa-erp-backend.onrender.com/api/products/${productToDelete._id}`)
      .then(() => {
        setProducts(products.filter((_, i) => i !== index));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 p-8 items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Manage Products</h2>
        <table className="w-full flex-col items-center bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Date</th>
              <th className="py-2 px-4 border-b text-center">Product Name</th>
              <th className="py-2 px-4 border-b text-center">Price</th>
              <th className="py-2 px-4 border-b text-center">Quantity</th>
              <th className="py-2 px-4 border-b text-center">Seller</th>
              <th className="py-2 px-4 border-b text-center">Description</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {editingIndex === index ? (
                  <>
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        type="date"
                        name="date"
                        value={editingProduct.date}
                        onChange={handleChange}
                        className="form-input w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        type="text"
                        name="name"
                        value={editingProduct.name}
                        onChange={handleChange}
                        className="form-input w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        type="text"
                        name="price"
                        value={editingProduct.price}
                        onChange={handleChange}
                        className="form-input w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        type="text"
                        name="quantity"
                        value={editingProduct.quantity}
                        onChange={handleChange}
                        className="form-input w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        type="text"
                        name="seller"
                        value={editingProduct.seller}
                        onChange={handleChange}
                        className="form-input w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <textarea
                        name="description"
                        value={editingProduct.description}
                        onChange={handleChange}
                        className="form-textarea w-full"
                      ></textarea>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md"
                      >
                        Update
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b text-center">
                      {product.date}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {product.price}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {product.quantity}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {product.seller}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {product.description}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;