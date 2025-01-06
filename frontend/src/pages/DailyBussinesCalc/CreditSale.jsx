import React, { useState, useEffect } from 'react';
import { XCircle, X } from 'lucide-react';

const MoneyCategories = () => { //
  // Money categories state
  const [moneyCategories, setMoneyCategories] = useState([
    { category: '5000', quantity: '', value: '' },
    { category: '1000', quantity: '', value: '' },
    { category: '500', quantity: '', value: '' },
    { category: '100', quantity: '', value: '' },
    { category: '50', quantity: '', value: '' },
    { category: '20', quantity: '', value: '' },
    { category: 'Coins', quantity: '', value: '' }
  ]);

  // Credit transactions state //
  const [showCreditSales, setShowCreditSales] = useState(false);
  const [showCreditReceives, setShowCreditReceives] = useState(false);
  const [creditSales, setCreditSales] = useState([
    { shopName: '', value: '', invoiceNo: '' }
  ]);
  const [creditReceives, setCreditReceives] = useState([
    { shopName: '', value: '', invoiceNo: '' }
  ]);

  // Summary totals state //
  const [totals, setTotals] = useState({
    totalMoneyValue: 0,
    totalCreditSales: 0,
    totalCreditReceives: 0,
    productsSaleTotal: 0, // This should come from the previous component
    returnedItemsTotal: 0, // This should come from the previous component
    expiredItemsTotal: 0, // This should come from the previous component
    sampleGivenTotal: 0, // This should come from the previous component
    leakage: 0
  });

  // Handle money category changes //
  const handleMoneyChange = (index, field, value) => {
    const updatedCategories = [...moneyCategories];
    updatedCategories[index][field] = value;
    
    // Calculate value if quantity changes 
    if (field === 'quantity') {
      const quantity = parseFloat(value) || 0;
      const category = parseFloat(updatedCategories[index].category) || 0;
      updatedCategories[index].value = (quantity * category).toString();
    }
    
    setMoneyCategories(updatedCategories);
  };

  // Handle credit transaction changes
  const handleCreditChange = (index, field, value, items, setItems) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add new credit transaction
  const addCreditTransaction = (items, setItems) => {
    setItems([...items, { shopName: '', value: '', invoiceNo: '' }]);
  };

  // Remove credit transaction
  const removeCreditTransaction = (index, items, setItems) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calculate totals
  useEffect(() => {
    const totalMoneyValue = moneyCategories.reduce((sum, item) => 
      sum + (parseFloat(item.value) || 0), 0);
    
    const totalCreditSales = creditSales.reduce((sum, item) => 
      sum + (parseFloat(item.value) || 0), 0);
    
    const totalCreditReceives = creditReceives.reduce((sum, item) => 
      sum + (parseFloat(item.value) || 0), 0);

    // Calculate leakage
    const leakage = totals.productsSaleTotal - 
      totals.returnedItemsTotal - 
      totals.expiredItemsTotal - 
      totals.sampleGivenTotal - 
      totalMoneyValue - 
      totalCreditSales + 
      totalCreditReceives;

    setTotals(prev => ({
      ...prev,
      totalMoneyValue,
      totalCreditSales,
      totalCreditReceives,
      leakage
    }));
  }, [moneyCategories, creditSales, creditReceives]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Money Categories Table */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Money Categories</h2>
                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="border p-2 text-left">Category</th>
                            <th className="border p-2 text-left">Quantity</th>
                            <th className="border p-2 text-left">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {moneyCategories.map((item, index) => (
                            <tr key={index}>
                            <td className="border p-2">{item.category}</td>
                            <td className="border p-2">
                                <input
                                type="number"
                                className="w-full p-1"
                                value={item.quantity}
                                onChange={(e) => handleMoneyChange(index, 'quantity', e.target.value)}
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                type="text"
                                className="w-full p-1 bg-gray-50"
                                value={item.value}
                                readOnly
                                />
                            </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2" className="border p-2 font-semibold">Total money value</td>
                            <td className="border p-2 font-semibold">{totals.totalMoneyValue}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>

      {/* Credit Sales and Receives Checkboxes */}
      <div className="flex gap-6 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showCreditSales}
            onChange={(e) => setShowCreditSales(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span>Credit Sales</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showCreditReceives}
            onChange={(e) => setShowCreditReceives(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span>Credit Receives</span>
        </label>
      </div>

      {/* Credit Sales Section */}
      {showCreditSales && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Credit Sales</h3>
          {creditSales.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Shop Name:</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.shopName}
                  onChange={(e) => handleCreditChange(index, 'shopName', e.target.value, creditSales, setCreditSales)}
                >
                  <option value="">Select Shop</option>
                  {/* Add your shop options here */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Value:</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.value}
                  onChange={(e) => handleCreditChange(index, 'value', e.target.value, creditSales, setCreditSales)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Invoice No:</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={item.invoiceNo}
                  onChange={(e) => handleCreditChange(index, 'invoiceNo', e.target.value, creditSales, setCreditSales)}
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeCreditTransaction(index, creditSales, setCreditSales)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <XCircle size={24} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addCreditTransaction(creditSales, setCreditSales)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Another Deal
          </button>
        </div>
      )}

      {/* Credit Receives Section */}
      {showCreditReceives && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Credit Receives</h3>
          {creditReceives.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Shop Name:</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.shopName}
                  onChange={(e) => handleCreditChange(index, 'shopName', e.target.value, creditReceives, setCreditReceives)}
                >
                  <option value="">Select Shop</option>
                  {/* Add your shop options here */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Value:</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.value}
                  onChange={(e) => handleCreditChange(index, 'value', e.target.value, creditReceives, setCreditReceives)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Invoice No:</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={item.invoiceNo}
                  onChange={(e) => handleCreditChange(index, 'invoiceNo', e.target.value, creditReceives, setCreditReceives)}
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeCreditTransaction(index, creditReceives, setCreditReceives)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <XCircle size={24} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addCreditTransaction(creditReceives, setCreditReceives)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Another Deal
          </button>
        </div>
      )}

      {/* Final Summary Table */}
      <div className="mb-6">
        <table className="w-full border-collapse border">
          <tbody>
            <tr>
              <td className="border p-2">Total Value of products today sale</td>
              <td className="border p-2">{totals.productsSaleTotal}</td>
            </tr>
            <tr>
              <td className="border p-2">Total value of Returned items</td>
              <td className="border p-2">{totals.returnedItemsTotal}</td>
            </tr>
            <tr>
              <td className="border p-2">Total value of Expired items</td>
              <td className="border p-2">{totals.expiredItemsTotal}</td>
            </tr>
            <tr>
              <td className="border p-2">Total value of Sample given items</td>
              <td className="border p-2">{totals.sampleGivenTotal}</td>
            </tr>
            <tr>
              <td className="border p-2">Total money value</td>
              <td className="border p-2">{totals.totalMoneyValue}</td>
            </tr>
            <tr>
              <td className="border p-2">Credit Sales</td>
              <td className="border p-2">{totals.totalCreditSales}</td>
            </tr>
            <tr>
              <td className="border p-2">Credit Receives</td>
              <td className="border p-2">{totals.totalCreditReceives}</td>
            </tr>
            <tr>
              <td className="border p-2">Leakages</td>
              <td className="border p-2">{totals.leakage}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold">
        SUBMIT
      </button>
    </div>
  );
};

export default MoneyCategories;