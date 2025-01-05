import React, { useState } from 'react';
import { XCircle } from 'lucide-react';

const DailyBusinessCalculator = () => {
  const [showReturned, setShowReturned] = useState(false);
  const [showExpired, setShowExpired] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [soldItems, setSoldItems] = useState([{ productName: '', quantity: '', price: '', value: '' }]);
  const [returnedItems, setReturnedItems] = useState([{ productName: '', quantity: '', price: '', value: '' }]);
  const [expiredItems, setExpiredItems] = useState([{ productName: '', quantity: '', storeName: '', price: '', value: '' }]);
  const [sampleItems, setSampleItems] = useState([{ productName: '', quantity: '', storeName: '', price: '', value: '' }]);

    const [moneyCategories, setMoneyCategories] = useState([
      { category: '5000', quantity: '', value: '' },
      { category: '1000', quantity: '', value: '' },
      { category: '500', quantity: '', value: '' },
      { category: '100', quantity: '', value: '' },
      { category: '50', quantity: '', value: '' },
      { category: '20', quantity: '', value: '' },
      { category: 'Coins', quantity: '', value: '' }
    ]);
  

  const issuedItems = [
    { productName: 'Normal Yoghurt', quantity: 50 },
    { productName: 'Jelly Yoghurt', quantity: 100 },
    { productName: 'Panni Yoghurt', quantity: 45 },
    { productName: 'Ice packet 20ml', quantity: 50 },
    { productName: 'Ice packet 50ml', quantity: 200 },
    { productName: 'Yoghurt Drinking Bottle', quantity: 300 },
    { productName: 'Milk Toffee Packets', quantity: '' },
    { productName: 'Spoons', quantity: 450 }
  ];
  const handleSoldItemChange = (index, field, value) => {
    const newSoldItems = [...soldItems];
    newSoldItems[index][field] = value;
    
    if (field === 'quantity' || field === 'price') {
      const quantity = parseFloat(newSoldItems[index].quantity) || 0;
      const price = parseFloat(newSoldItems[index].price) || 0;
      newSoldItems[index].value = (quantity * price).toFixed(2);
    }
    
    setSoldItems(newSoldItems);
  };

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

  const handleReturnedItemChange = (index, field, value) => {
    const newItems = [...returnedItems];
    newItems[index][field] = value;

    if (field === 'quantity' || field === 'price') {
        const quantity = parseFloat(newItems[index].quantity) || 0;
        const price = parseFloat(newItems[index].price) || 0;
        newItems[index].value = (quantity * price).toFixed(2);
      }

    setReturnedItems(newItems);
  };

  const handleExpiredItemChange = (index, field, value) => {
    const newItems = [...expiredItems];
    newItems[index][field] = value;

    if (field === 'quantity' || field === 'price') {
        const quantity = parseFloat(newItems[index].quantity) || 0;
        const price = parseFloat(newItems[index].price) || 0;
        newItems[index].value = (quantity * price).toFixed(2);
      }

    setExpiredItems(newItems);
  };

  const handleSampleItemChange = (index, field, value) => {
    const newItems = [...sampleItems];
    newItems[index][field] = value;

    if (field === 'quantity' || field === 'price') {
        const quantity = parseFloat(newItems[index].quantity) || 0;
        const price = parseFloat(newItems[index].price) || 0;
        newItems[index].value = (quantity * price).toFixed(2);
      }

    setSampleItems(newItems);
  };

  const addSoldItem = () => {
    setSoldItems([...soldItems, { productName: '', quantity: '', price: '', value: '' }]);
  };

  const addReturnedItem = () => {
    setReturnedItems([...returnedItems, { productName: '', quantity: '', price: '', value: '' }]);
  };

  const addExpiredItem = () => {
    setExpiredItems([...expiredItems, { productName: '', quantity: '', storeName: '', price: '', value: '' }]);
  };

  const addSampleItem = () => {
    setSampleItems([...sampleItems, { productName: '', quantity: '', storeName: '', price: '', value: '' }]);
  };

  const removeSoldItem = (index) => {
    const newItems = soldItems.filter((_, i) => i !== index);
    setSoldItems(newItems);
  };

  const removeReturnedItem = (index) => {
    const newItems = returnedItems.filter((_, i) => i !== index);
    setReturnedItems(newItems);
  };

  const removeExpiredItem = (index) => {
    const newItems = expiredItems.filter((_, i) => i !== index);
    setExpiredItems(newItems);
  };

  const removeSampleItem = (index) => {
    const newItems = sampleItems.filter((_, i) => i !== index);
    setSampleItems(newItems);
  };


return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Daily Business Calculator</h1>
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium">Date:</label>
                <input type="date" className="w-full border rounded-lg p-2" />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium">Vehicle No:</label>
                <select className="w-full border rounded-lg p-2">
                    <option value="">Select Vehicle</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium">Route:</label>
                <select className="w-full border rounded-lg p-2">
                    <option value="">Select Route</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium">Ref Name:</label>
                <select className="w-full border rounded-lg p-2">
                    <option value="">Select Reference</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium">Driver Name:</label>
                <select className="w-full border rounded-lg p-2">
                    <option value="">Select Driver</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium">Diesel:</label>
                <input type="number" className="w-full border rounded-lg p-2" />
            </div>
        </div>

        {/* Issued Items Section */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Issued Items</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border p-2 text-left">Product Name</th>
                            <th className="border p-2 text-left">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuedItems.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">{item.productName}</td>
                                <td className="border p-2">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Sold Items Section */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Sold Items</h2>
            {soldItems.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Name:</label>
                        <select 
                            className="w-full border rounded-lg p-2"
                            value={item.productName}
                            onChange={(e) => handleSoldItemChange(index, 'productName', e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {issuedItems.map((product, i) => (
                                <option key={i} value={product.productName}>{product.productName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Quantity:</label>
                        <input 
                            type="number" 
                            className="w-full border rounded-lg p-2"
                            value={item.quantity}
                            onChange={(e) => handleSoldItemChange(index, 'quantity', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Price:</label>
                        <select 
                            className="w-full border rounded-lg p-2"
                            value={item.price}
                            onChange={(e) => handleSoldItemChange(index, 'price', e.target.value)}
                        >
                            <option value="">Select Price</option>
                            <option value="10">10.00</option>
                            <option value="20">20.00</option>
                            <option value="30">30.00</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Value:</label>
                            <input 
                                type="text" 
                                className="w-full border rounded-lg p-2 bg-gray-50"
                                value={item.value}
                                readOnly
                            />
                        </div>
                        {index > 0 && (
                            <button 
                                onClick={() => removeSoldItem(index)}
                                className="p-2 text-red-500 hover:text-red-700"
                            >
                                <XCircle size={24} />
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button 
                onClick={addSoldItem}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Add Another Product
            </button>
        </div>

        {/* Checkboxes Section */}
        <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center space-x-2">
                <input 
                    type="checkbox" 
                    checked={showReturned}
                    onChange={(e) => setShowReturned(e.target.checked)}
                    className="rounded border-gray-300"
                />
                <span>Returned Items</span>
            </label>
            <label className="flex items-center space-x-2">
                <input 
                    type="checkbox"
                    checked={showExpired}
                    onChange={(e) => setShowExpired(e.target.checked)}
                    className="rounded border-gray-300"
                />
                <span>Expired Items</span>
            </label>
            <label className="flex items-center space-x-2">
                <input 
                    type="checkbox"
                    checked={showSamples}
                    onChange={(e) => setShowSamples(e.target.checked)}
                    className="rounded border-gray-300"
                />
                <span>Sample given Items</span>
            </label>
        </div>

        {/* Conditional Sections */}
        {showReturned && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Returned Items</h2>
          {returnedItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name:</label>
                    <select 
                    className="w-full border rounded-lg p-2"
                    value={item.productName}
                    onChange={(e) => handleReturnedItemChange(index, 'productName', e.target.value)}
                    >
                    <option value="">Select Product</option>
                    {issuedItems.map((product, i) => (
                        <option key={i} value={product.productName}>{product.productName}</option>
                    ))}
                    </select>
                </div>
              <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Quantity:</label>
                        <input 
                            type="number" 
                            className="w-full border rounded-lg p-2"
                            value={item.quantity}
                            onChange={(e) => handleReturnedItemChange(index, 'quantity', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Price:</label>
                        <select 
                            className="w-full border rounded-lg p-2"
                            value={item.price}
                            onChange={(e) => handleReturnedItemChange(index, 'price', e.target.value)}
                        >
                            <option value="">Select Price</option>
                            <option value="10">10.00</option>
                            <option value="20">20.00</option>
                            <option value="30">30.00</option>
                        </select>
                    </div>
                    <div>
                            <label className="block text-sm font-medium mb-1">Value:</label>
                            <input 
                                type="text" 
                                className="w-full border rounded-lg p-2 bg-gray-50"
                                value={item.value}
                                readOnly
                            />
                        </div>
                
                {index > 0 && (
                  <button 
                    onClick={() => removeReturnedItem(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XCircle size={24} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button 
            onClick={addReturnedItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Another Product
          </button>
        </div>
      )}

{showExpired && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Expired Items</h2>
          {expiredItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name:</label>
                <select 
                  className="w-full border rounded-lg p-2"
                  value={item.productName}
                  onChange={(e) => handleExpiredItemChange(index, 'productName', e.target.value)}
                >
                  <option value="">Select Product</option>
                  {issuedItems.map((product, i) => (
                    <option key={i} value={product.productName}>{product.productName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity:</label>
                <input 
                  type="number" 
                  className="w-full border rounded-lg p-2"
                  value={item.quantity}
                  onChange={(e) => handleExpiredItemChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Store Name:</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2"
                    value={item.storeName}
                    onChange={(e) => handleExpiredItemChange(index, 'storeName', e.target.value)}
                  />
                </div>
                <div>
                        <label className="block text-sm font-medium mb-1">Price:</label>
                        <select 
                            className="w-full border rounded-lg p-2"
                            value={item.price}
                            onChange={(e) => handleExpiredItemChange(index, 'price', e.target.value)}
                        >
                            <option value="">Select Price</option>
                            <option value="10">10.00</option>
                            <option value="20">20.00</option>
                            <option value="30">30.00</option>
                        </select>
                    </div>
                    <div>
                            <label className="block text-sm font-medium mb-1">Value:</label>
                            <input 
                                type="text" 
                                className="w-full border rounded-lg p-2 bg-gray-50"
                                value={item.value}
                                readOnly
                            />
                        </div>
                {index > 0 && (
                  <button 
                    onClick={() => removeExpiredItem(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XCircle size={24} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button 
            onClick={addExpiredItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Another Product
          </button>
        </div>
      )}

{showSamples && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sample given Items</h2>
          {sampleItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name:</label>
                <select 
                  className="w-full border rounded-lg p-2"
                  value={item.productName}
                  onChange={(e) => handleSampleItemChange(index, 'productName', e.target.value)}
                >
                  <option value="">Select Product</option>
                  {issuedItems.map((product, i) => (
                    <option key={i} value={product.productName}>{product.productName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity:</label>
                <input 
                  type="number" 
                  className="w-full border rounded-lg p-2"
                  value={item.quantity}
                  onChange={(e) => handleSampleItemChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Store Name:</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg p-2"
                    value={item.storeName}
                    onChange={(e) => handleSampleItemChange(index, 'storeName', e.target.value)}
                  />
                </div>
                <div>
                        <label className="block text-sm font-medium mb-1">Price:</label>
                        <select 
                            className="w-full border rounded-lg p-2"
                            value={item.price}
                            onChange={(e) => handleSampleItemChange(index, 'price', e.target.value)}
                        >
                            <option value="">Select Price</option>
                            <option value="10">10.00</option>
                            <option value="20">20.00</option>
                            <option value="30">30.00</option>
                        </select>
                    </div>
                    <div>
                            <label className="block text-sm font-medium mb-1">Value:</label>
                            <input 
                                type="text" 
                                className="w-full border rounded-lg p-2 bg-gray-50"
                                value={item.value}
                                readOnly
                            />
                        </div>
                {index > 0 && (
                  <button 
                    onClick={() => removeSampleItem(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XCircle size={24} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button 
            onClick={addSampleItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Another Product
          </button>
        </div>
      )}


        <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold">
            SUBMIT
        </button>
    </div>
);
};

export default DailyBusinessCalculator;