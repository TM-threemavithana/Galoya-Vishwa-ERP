import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState({
    name: '',
    broughtDate: '',
    price: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/machines');
        setMachines(response.data.machines);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    fetchMachines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachine({ ...machine, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!machine.name || !machine.broughtDate || !machine.price || !machine.description) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (isEditing) {
      try {
        const response = await axios.put(`http://localhost:5000/api/machines/${editId}`, machine);
        toast.success('Machine updated successfully!');
        setMachines(machines.map((m) => (m._id === editId ? response.data.machine : m)));
        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        toast.error('Error updating machine');
        console.error('Error updating machine:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/machines', machine);
        toast.success('Machine added successfully!');
        setMachines([...machines, response.data.machine]);
      } catch (error) {
        toast.error('Error adding machine');
        console.error('Error adding machine:', error);
      }
    }

    setMachine({
      name: '',
      broughtDate: '',
      price: '',
      description: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/machines/${id}`);
      setMachines(machines.filter((machine) => machine._id !== id));
      toast.success('Machine deleted successfully!');
    } catch (error) {
      toast.error('Error deleting machine');
      console.error('Error deleting machine:', error);
    }
  };

  const handleEdit = (id) => {
    const machineToEdit = machines.find((machine) => machine._id === id);
    setMachine(machineToEdit);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? 'EDIT MACHINE' : 'ADD NEW MACHINE'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" value={machine.name} onChange={handleChange} placeholder="Name" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Brought Date</label>
            <input type="date" name="broughtDate" value={machine.broughtDate} onChange={handleChange} className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Price</label>
            <input type="number" name="price" value={machine.price} onChange={handleChange} placeholder="Price" className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={machine.description} onChange={handleChange} placeholder="Description" className="form-textarea mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isEditing ? 'UPDATE MACHINE' : 'ADD MACHINE'}
          </button>
        </form>
        <ToastContainer />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-3xl border border-gray-300 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">MACHINE DETAILS</h2>
        {machines.length === 0 ? (
          <p className="text-center">No machines found.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Brought Date</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine._id}>
                  <td className="py-2 px-4 border-b">{machine.name}</td>
                  <td className="py-2 px-4 border-b">{new Date(machine.broughtDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{machine.price}</td>
                  <td className="py-2 px-4 border-b">{machine.description}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleEdit(machine._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-md mr-2">Edit</button>
                    <button onClick={() => handleDelete(machine._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MachineDetails;