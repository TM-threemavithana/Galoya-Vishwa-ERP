import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    date: '',
    name: '',
    price: '',
    quantity: '',
    seller: '',
    description: ''
  });

  const [productNames, setProductNames] = useState([
    'Milk',
    'Milk powder',
    'Colorants and preservatives',
    'Bottles',
    'Labels',
    'Packaging films and foils'
  ]);

  const [newProductName, setNewProductName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleNewProductNameChange = (e) => {
    setNewProductName(e.target.value);
  };

  const handleAddNewProductName = (e) => {
    e.preventDefault();
    if (newProductName.trim() === '') {
      toast.error('Please enter a product name.');
      return;
    }
    if (productNames.includes(newProductName)) {
      toast.error('Product name already exists.');
      return;
    }
    setProductNames([...productNames, newProductName]);
    setNewProductName('');
    toast.success('New product name added successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.date || !product.name || !product.price || !product.quantity || !product.seller || !product.description) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('https://galoya-vishwa-erp-backend.onrender.com/api/products', product);
      addProduct(response.data);
      toast.success('Product added successfully!');
      setProduct({
        date: '',
        name: '',
        price: '',
        quantity: '',
        seller: '',
        description: ''
      });
    } catch (error) {
      toast.error('Error adding product');
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD NEW PRODUCT</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={product.date} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Product Name</label>
            <select name="name" value={product.name} onChange={handleChange} className="form-select mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a product</option>
              {productNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Seller's Name</label>
            <input type="text" name="seller" value={product.seller} onChange={handleChange} placeholder="Seller's Name" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="form-textarea mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            ADD PRODUCT
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">ADD NEW PRODUCT NAME</h2>
        <form onSubmit={handleAddNewProductName}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">New Product Name</label>
            <input type="text" value={newProductName} onChange={handleNewProductNameChange} placeholder="New Product Name" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            ADD PRODUCT NAME
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;