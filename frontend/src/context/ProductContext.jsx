import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]); // Ensure this is initialized

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setUpdatedProducts(response.data); // Ensure this is set
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product) => {
    setProducts([...products, product]);
    setUpdatedProducts([...updatedProducts, { ...product }]);
  };

  const updateProduct = (name, updatedProduct) => {
    setProducts(products.map(product => 
      product.name === name ? updatedProduct : product
    ));
    setUpdatedProducts(updatedProducts.map(product => 
      product.name === name ? updatedProduct : product
    ));
  };

  const deleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    setUpdatedProducts(updatedProducts.filter((_, i) => i !== index));
  };

  const updateProductQuantity = async (name, usedQuantity) => {
    try {
      const product = updatedProducts.find(product => product.name === name);
      if (product) {
        const updatedProduct = { ...product, quantity: product.quantity - usedQuantity };
        await axios.put(`http://localhost:5000/api/products/quantity/${name}`, { quantity: updatedProduct.quantity });
        setUpdatedProducts(updatedProducts.map(product => 
          product.name === name ? updatedProduct : product
        ));
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updatedProducts, addProduct, updateProduct, deleteProduct, updateProductQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};