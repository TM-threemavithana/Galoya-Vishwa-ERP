import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Add a new category
  const addCategory = async () => {
    if (!newCategory) {
      alert("Please enter a category name.");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  // Update an existing category
  const updateCategory = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, { name: editingCategory.name });
      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {/* Add New Category Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-2 w-full"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, name: e.target.value })
                      }
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingCategory?.id === category.id ? (
                    <button
                      onClick={() => updateCategory(category.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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

export default Categories;
