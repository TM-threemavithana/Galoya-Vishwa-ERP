import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const saveTotalsData = async (totals) => {
  try {
    await axios.post("https://galoya-vishwa-erp-backend.onrender.com/api/totals", totals);
    toast.success("Totals data saved successfully!");
  } catch (error) {
    toast.error("Error saving totals data");
    console.error("Error saving totals data:", error);
  }
};

const saveReturnedItems = async (returnedItems) => {
  try {
    await axios.post("https://galoya-vishwa-erp-backend.onrender.com/api/returned-items", {
      returnedItems,
    });
    toast.success("Returned items saved successfully!");
  } catch (error) {
    toast.error("Error saving returned items");
    console.error("Error saving returned items:", error);
  }
};

const DailyBusinessCalculator = () => {
  const { state } = useLocation();

  const handleSubmit = () => {
    saveTotalsData(totals);
    saveReturnedItems(returnedItems);
  };
  /////////////////////////////////////////////////////////
  const [distributionData, setDistributionData] = useState({
    date: "",
    vehicleNumber: "",
    route: "",
    refName: "",
    driverName: "",
    products: [],
  });
  const [issuedItems, setissuedItems] = useState([
    { productName: "Normal Yoghurt", quantity: 50 },
    { productName: "Jelly Yoghurt", quantity: 100 },
    { productName: "Panni Yoghurt", quantity: 45 },
    { productName: "Ice packet 20ml", quantity: 50 },
    { productName: "Ice packet 50ml", quantity: 200 },
    { productName: "Yoghurt Drinking Bottle", quantity: 300 },
    { productName: "Milk Toffee Packets", quantity: "" },
    { productName: "Spoons", quantity: 450 },
  ]);
  useEffect(() => {
    const fetchDistributionData = async () => {
      try {
        const response = await fetch("https://galoya-vishwa-erp-backend.onrender.com/api/distributions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json(); // Parse the JSON response
        console.log("API Response:", result); // Log the full API response

        // Access the distributions array from the result
        const data = result.distributions;

        if (data && data.length > 0) {
          // const latestDistribution = data[0]; // Get the first distribution
          const latestDistribution = state.distribution; // Get the first distributi on
          console.log("Processed Data:", latestDistribution); // Log processed data
          setDistributionData({
            date: latestDistribution.date || "",
            vehicleNumber: latestDistribution.vehicleNumber || "",
            route: latestDistribution.route || "",
            refName: latestDistribution.refName || "",
            driverName: latestDistribution.driverName || "",
            products:
              latestDistribution.inventories?.map((inventory) => ({
                productName: inventory.inventoryName || "Unknown Product",
                issuedQuantity: inventory.quantity || 0,
              })) || [],
          });
          console.log(distributionData);
        } else {
          console.warn("No distribution data found"); // Log a warning if no data
        }
      } catch (error) {
        console.error("Error fetching distribution data:", error); // Log errors
      }
    };

    fetchDistributionData();
  }, []);

  ///////////////////////////////////////////////////////////////////

  // Function to save totals data

  const [showReturned, setShowReturned] = useState(false);
  const [showExpired, setShowExpired] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [soldItems, setSoldItems] = useState([
    { productName: "", quantity: "", price: "", value: "" },
  ]);
  const [returnedItems, setReturnedItems] = useState([
    { productName: "", quantity: "", price: "", value: "" },
  ]);
  const [expiredItems, setExpiredItems] = useState([
    { productName: "", quantity: "", storeName: "", price: "", value: "" },
  ]);
  const [sampleItems, setSampleItems] = useState([
    { productName: "", quantity: "", storeName: "", price: "", value: "" },
  ]);

  const [moneyCategories, setMoneyCategories] = useState([
    { category: "5000", quantity: "", value: "" },
    { category: "1000", quantity: "", value: "" },
    { category: "500", quantity: "", value: "" },
    { category: "100", quantity: "", value: "" },
    { category: "50", quantity: "", value: "" },
    { category: "20", quantity: "", value: "" },
    { category: "Coins", quantity: "", value: "" },
  ]);

  const [totals, setTotals] = useState({
    totalMoneyValue: 0,
    totalCreditSales: 0,
    totalCreditReceives: 0,
    productsSaleTotal: 0, // This should come from the previous component 1
    returnedItemsTotal: 0, // This should come from the previous component 2
    expiredItemsTotal: 0, // This should come from the previous component 3
    sampleGivenTotal: 0, // This should come from the previous component 4
    leakage: 0,
  });

  // Credit transactions state
  const [showCreditSales, setShowCreditSales] = useState(false);
  const [showCreditReceives, setShowCreditReceives] = useState(false);
  const [creditSales, setCreditSales] = useState([
    { shopName: "", value: "", invoiceNo: "" },
  ]);
  const [creditReceives, setCreditReceives] = useState([
    { shopName: "", value: "", invoiceNo: "" },
  ]);

  const handleSoldItemChange = (index, field, value) => {
    if (field === "quantity" || field === "price") {
      if (value < 0) {
        toast.error("Value cannot be negative.");
        return;
      }
    }
  
    const newSoldItems = [...soldItems];
    newSoldItems[index][field] = value;
  
    if (field === "quantity" || field === "price") {
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
    if (field === "quantity") {
      const quantity = parseFloat(value) || 0;
      const category = parseFloat(updatedCategories[index].category) || 0;
      updatedCategories[index].value = (quantity * category).toString();
    }

    setMoneyCategories(updatedCategories);
  };

  const handleReturnedItemChange = (index, field, value) => {
    const newItems = [...returnedItems];
    newItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      newItems[index].value = (quantity * price).toFixed(2);
    }

    setReturnedItems(newItems);
  };

  const handleExpiredItemChange = (index, field, value) => {
    const newItems = [...expiredItems];
    newItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      newItems[index].value = (quantity * price).toFixed(2);
    }

    setExpiredItems(newItems);
  };

  const handleSampleItemChange = (index, field, value) => {
    const newItems = [...sampleItems];
    newItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      newItems[index].value = (quantity * price).toFixed(2);
    }

    setSampleItems(newItems);
  };

  const addSoldItem = () => {
    setSoldItems([
      ...soldItems,
      { productName: "", quantity: "", price: "", value: "" },
    ]);
  };

  const addReturnedItem = () => {
    setReturnedItems([
      ...returnedItems,
      { productName: "", quantity: "", price: "", value: "" },
    ]);
  };

  const addExpiredItem = () => {
    setExpiredItems([
      ...expiredItems,
      { productName: "", quantity: "", storeName: "", price: "", value: "" },
    ]);
  };

  const addSampleItem = () => {
    setSampleItems([
      ...sampleItems,
      { productName: "", quantity: "", storeName: "", price: "", value: "" },
    ]);
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

  // Handle credit transaction changes
  const handleCreditChange = (index, field, value, items, setItems) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add new credit transaction
  const addCreditTransaction = (items, setItems) => {
    setItems([...items, { shopName: "", value: "", invoiceNo: "" }]);
  };

  // Remove credit transaction
  const removeCreditTransaction = (index, items, setItems) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calculate totals
  useEffect(() => {
    const totalMoneyValue = moneyCategories.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    const totalCreditSales = creditSales.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    const totalCreditReceives = creditReceives.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    const productsSaleTotal = soldItems.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    const returnedItemsTotal = returnedItems.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    const expiredItemsTotal = expiredItems.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    const sampleGivenTotal = sampleItems.reduce(
      (sum, item) => sum + (parseFloat(item.value) || 0),
      0
    );

    // Calculate leakage
    const leakage =
      totals.productsSaleTotal -
      totals.returnedItemsTotal -
      totals.expiredItemsTotal -
      totals.sampleGivenTotal -
      totalMoneyValue -
      totalCreditSales +
      totalCreditReceives;

    setTotals((prev) => ({
      ...prev,
      totalMoneyValue,
      totalCreditSales,
      totalCreditReceives,
      productsSaleTotal,
      returnedItemsTotal,
      expiredItemsTotal,
      sampleGivenTotal,
      leakage,
    }));
  }, [
    moneyCategories,
    creditSales,
    creditReceives,
    soldItems,
    returnedItems,
    expiredItems,
    sampleItems,
  ]);

  const [newShop, setNewShop] = useState({
    shopName: "",
    route: "",
    phoneNumber: "",
    ownerName: "",
    address: "",
  });

  const handleNewShopChange = (field, value) => {
    setNewShop((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewShopSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://galoya-vishwa-erp-backend.onrender.com/api/shops", newShop);
      toast.success("New shop added successfully!");
      setNewShop({
        shopName: "",
        route: "",
        phoneNumber: "",
        ownerName: "",
        address: "",
      });
    } catch (error) {
      toast.error("Error adding new shop");
      console.error("Error adding new shop:", error);
    }
  };
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://galoya-vishwa-erp-backend.onrender.com/api/shop-details"
        );
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Daily Business Calculator
      </h1>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Vehicle Number</th>
              <th className="border p-2 text-left">Route</th>
              <th className="border p-2 text-left">Ref Name</th>
              <th className="border p-2 text-left">Driver Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                {distributionData.date
                  ? new Date(distributionData.date).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="border p-2">
                {distributionData.vehicleNumber || "N/A"}
              </td>
              <td className="border p-2">{distributionData.route || "N/A"}</td>
              <td className="border p-2">
                {distributionData.refName || "N/A"}
              </td>
              <td className="border p-2">
                {distributionData.driverName || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Product Name</th>
                <th className="border p-2 text-left">Issued Quantity</th>
              </tr>
            </thead>
            <tbody>
              {distributionData.products.length > 0 ? (
                distributionData.products.map((product, index) => (
                  <tr key={index}>
                    <td className="border p-2">{product.productName}</td>
                    <td className="border p-2">{product.issuedQuantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border p-2" colSpan="2">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mb-6">
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
              {distributionData.products.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.productName}</td>
                  <td className="border p-2">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       </div> */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Sold Items</h2>
        {soldItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end"
          >
            <div>
              {index === 0 && (
                <label className="block text-sm font-medium mb-1">
                  Product Name:
                </label>
              )}
              <select
                className="w-full border rounded-lg p-2"
                value={item.productName}
                onChange={(e) =>
                  handleSoldItemChange(index, "productName", e.target.value)
                }
              >
                <option value="">Select Product</option>
                {distributionData.products.map((product, i) => (
                  <option key={i} value={product.productName}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {index === 0 && (
                <label className="block text-sm font-medium mb-1">
                  Quantity:
                </label>
              )}
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={item.quantity}
                onChange={(e) =>
                  handleSoldItemChange(index, "quantity", e.target.value)
                }
              />
            </div>
            <div>
              {index === 0 && (
                <label className="block text-sm font-medium mb-1">Price:</label>
              )}
              <select
                className="w-full border rounded-lg p-2"
                value={item.price}
                onChange={(e) =>
                  handleSoldItemChange(index, "price", e.target.value)
                }
              >
                <option value="">Select Price</option>
                <option value="10">47</option>
                <option value="20">48</option>
                <option value="30">49</option>
                <option value="30">50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Value:
                  </label>
                )}
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

      {/* awla thiyna thana */}
      {showReturned && (
        <div className="mb-6 gap-6">
          <h2 className="text-xl font-semibold mb-4">Returned Items</h2>
          {returnedItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end"
            >
              {/* Product Name */}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Product Name:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.productName}
                  onChange={(e) =>
                    handleReturnedItemChange(
                      index,
                      "productName",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select Product</option>
                  {distributionData.products.map((product, i) => (
                    <option key={i} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Quantity:
                  </label>
                )}
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.quantity}
                  onChange={(e) =>
                    handleReturnedItemChange(index, "quantity", e.target.value)
                  }
                />
              </div>

              {/* Price */}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Price:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.price}
                  onChange={(e) =>
                    handleReturnedItemChange(index, "price", e.target.value)
                  }
                >
                  <option value="">Select Price</option>
                  <option value="10">47.00</option>
                  <option value="20">48.00</option>
                  <option value="30">49.00</option>
                  <option value="30">50.00</option>
                </select>
              </div>

              {/* Value */}
              <div className="flex items-center gap-2">
                <div>
                  {index === 0 && (
                    <label className="block text-sm font-medium mb-1">
                      Value:
                    </label>
                  )}
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 bg-gray-50"
                    value={item.value}
                    readOnly
                  />
                </div>

                {/* Close Icon */}
                {index > 0 && (
                  <button
                    onClick={() => removeReturnedItem(index)}
                    className="p-2 text-red-500 hover:text-red-700 w-6"
                  >
                    <XCircle size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Another Product Button */}
          <button
            onClick={addReturnedItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 min-w-36"
          >
            Add Another Product
          </button>
        </div>
      )}

      {showExpired && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Expired Items</h2>
          {expiredItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end"
            >
              {/* product Name */}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Product Name:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.productName}
                  onChange={(e) =>
                    handleExpiredItemChange(
                      index,
                      "productName",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select Product</option>
                  {distributionData.products.map((product, i) => (
                    <option key={i} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Quantity */}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Quantity:
                  </label>
                )}
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.quantity}
                  onChange={(e) =>
                    handleExpiredItemChange(index, "quantity", e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                {expiredItems.map((item, index) => (
                  <div className="flex-1" key={index}>
                    {index === 0 && (
                      <label className="block text-sm font-medium mb-1">
                        Store Name:
                      </label>
                    )}
                    <select
                      className="w-full border rounded-lg p-2"
                      value={item.storeName}
                      onChange={(e) =>
                        handleExpiredItemChange(
                          index,
                          "storeName",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Shop</option>
                      {shops.map((shop) => (
                        <option key={shop._id} value={shop.shopName}>
                          {shop.shopName}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Price:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.price}
                  onChange={(e) =>
                    handleExpiredItemChange(index, "price", e.target.value)
                  }
                >
                  <option value="">Select Price</option>
                  <option value="10">47.00</option>
                  <option value="20">48.00</option>
                  <option value="30">49.00</option>
                  <option value="30">50.00</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  {index === 0 && (
                    <label className="block text-sm font-medium mb-1">
                      Value:
                    </label>
                  )}
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
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end"
            >
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Product Name:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.productName}
                  onChange={(e) =>
                    handleSampleItemChange(index, "productName", e.target.value)
                  }
                >
                  <option value="">Select Product</option>
                  {distributionData.products.map((product, i) => (
                    <option key={i} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Quantity:
                  </label>
                )}
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.quantity}
                  onChange={(e) =>
                    handleSampleItemChange(index, "quantity", e.target.value)
                  }
                />
              </div>
              {sampleItems.map((item, index) => (
                <div className="flex-1" key={index}>
                  {index === 0 && (
                    <label className="block text-sm font-medium mb-1">
                      Store Name:
                    </label>
                  )}
                  <select
                    className="w-full  border rounded-lg p-2"
                    value={item.storeName}
                    onChange={(e) =>
                      handleSampleItemChange(index, "storeName", e.target.value)
                    }
                  >
                    <option value="">Select Shop</option>
                    {shops.map((shop) => (
                      <option key={shop._id} value={shop.shopName}>
                        {shop.shopName}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Price:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.price}
                  onChange={(e) =>
                    handleSampleItemChange(index, "price", e.target.value)
                  }
                >
                  <option value="">Select Price</option>
                  <option value="10">47.00</option>
                  <option value="20">48.00</option>
                  <option value="30">49.00</option>
                  <option value="30">50.00</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  {index === 0 && (
                    <label className="block text-sm font-medium mb-1">
                      Value:
                    </label>
                  )}
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

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Summary of Items with Totals
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Issued Products</th>
                <th className="border p-2 text-left">Issued Quantity</th>
                <th className="border p-2 text-left">Sold Items Quantity</th>
                <th className="border p-2 text-left">Returned Items</th>
                <th className="border p-2 text-left">Expired Items</th>
                <th className="border p-2 text-left">Sample Given Items</th>
                <th className="border p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {distributionData.products.map((issuedItem, index) => {
                const soldQuantity = soldItems
                  .filter(
                    (soldItem) =>
                      soldItem.productName === issuedItem.productName
                    // soldItem.
                  )
                  .reduce(
                    (sum, soldItem) =>
                      sum + (parseFloat(soldItem.quantity) || 0),
                    0
                  );
                var returnedQuantity = 0;
                if (showReturned) {
                  returnedQuantity = returnedItems
                    .filter(
                      (returnedItem) =>
                        returnedItem.productName === issuedItem.productName
                    )
                    .reduce(
                      (sum, returnedItem) =>
                        sum + (parseFloat(returnedItem.quantity) || 0),
                      0
                    );
                }
                var expiredQuantity = 0;
                if (showExpired) {
                  expiredQuantity = expiredItems
                    .filter(
                      (expiredItem) =>
                        expiredItem.productName === issuedItem.productName
                    )
                    .reduce(
                      (sum, expiredItem) =>
                        sum + (parseFloat(expiredItem.quantity) || 0),
                      0
                    );
                }
                var sampleQuantity = 0;
                if (showSamples) {
                  sampleQuantity = sampleItems
                    .filter(
                      (sampleItem) =>
                        sampleItem.productName === issuedItem.productName
                    )
                    .reduce(
                      (sum, sampleItem) =>
                        sum + (parseFloat(sampleItem.quantity) || 0),
                      0
                    );
                }
                const totalQuantity =
                  soldQuantity +
                  returnedQuantity +
                  expiredQuantity +
                  sampleQuantity;
                const isBalanced = issuedItem.issuedQuantity === totalQuantity;
                const status = isBalanced
                  ? "OK"
                  : `${issuedItem.issuedQuantity - totalQuantity}`;

                return (
                  <tr key={index} className={isBalanced ? "bg-green-100" : ""}>
                    <td className="border p-2">{issuedItem.productName}</td>
                    <td className="border p-2">{issuedItem.issuedQuantity}</td>
                    <td className="border p-2">{soldQuantity}</td>
                    <td className="border p-2">{returnedQuantity}</td>
                    <td className="border p-2">{expiredQuantity}</td>
                    <td className="border p-2">{sampleQuantity}</td>
                    <td
                      className={`border p-2 ${
                        isBalanced ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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
                      onChange={(e) =>
                        handleMoneyChange(index, "quantity", e.target.value)
                      }
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
                <td colSpan="2" className="border p-2 font-semibold">
                  Total money value
                </td>
                <td className="border p-2 font-semibold">
                  {totals.totalMoneyValue}
                </td>
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
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
            >
              <div>
                {/* Render the label only for the first field */}
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Shop Name:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.shopName}
                  onChange={(e) =>
                    handleCreditChange(
                      index,
                      "shopName",
                      e.target.value,
                      creditSales,
                      setCreditSales
                    )
                  }
                >
                  <option value="">Select Shop</option>
                  {shops.map((shop) => (
                    <option key={shop._id} value={shop._id}>
                      {shop.shopName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                {/* Render the label only for the first field */}
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Value:
                  </label>
                )}
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.value}
                  onChange={(e) =>
                    handleCreditChange(
                      index,
                      "value",
                      e.target.value,
                      creditSales,
                      setCreditSales
                    )
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <div>
                  {/* Render the label only for the first field */}
                  {index === 0 && (
                    <label className="block text-sm font-medium mb-1">
                      Invoice No:
                    </label>
                  )}
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={item.invoiceNo}
                    onChange={(e) =>
                      handleCreditChange(
                        index,
                        "invoiceNo",
                        e.target.value,
                        creditSales,
                        setCreditSales
                      )
                    }
                  />
                </div>

                {/* Remove button */}
                {index > 0 && (
                  <button
                    onClick={() =>
                      removeCreditTransaction(
                        index,
                        creditSales,
                        setCreditSales
                      )
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XCircle size={24} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Another Deal Button */}
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
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
            >
              <div>
                {/* Render the label only for the first field */}
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Shop Name:
                  </label>
                )}
                <select
                  className="w-full border rounded-lg p-2"
                  value={item.shopName}
                  onChange={(e) =>
                    handleCreditChange(
                      index,
                      "shopName",
                      e.target.value,
                      creditReceives,
                      setCreditReceives
                    )
                  }
                >
                  <option value="">Select Shop</option>
                  {shops.map((shop) => (
                    <option key={shop._id} value={shop._id}>
                      {shop.shopName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                {/* Render the label only for the first field */}
                {index === 0 && (
                  <label className="block text-sm font-medium mb-1">
                    Value:
                  </label>
                )}
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={item.value}
                  onChange={(e) =>
                    handleCreditChange(
                      index,
                      "value",
                      e.target.value,
                      creditReceives,
                      setCreditReceives
                    )
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  {/* Render the label only for the first field */}
                  {index === 0 && (
                    <label className="block text-sm font-medium mb-1">
                      Invoice No:
                    </label>
                  )}
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={item.invoiceNo}
                    onChange={(e) =>
                      handleCreditChange(
                        index,
                        "invoiceNo",
                        e.target.value,
                        creditReceives,
                        setCreditReceives
                      )
                    }
                  />
                </div>

                {/* Remove button */}
                {index > 0 && (
                  <button
                    onClick={() =>
                      removeCreditTransaction(
                        index,
                        creditReceives,
                        setCreditReceives
                      )
                    }
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <XCircle size={24} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Another Deal Button */}
          <button
            onClick={() =>
              addCreditTransaction(creditReceives, setCreditReceives)
            }
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

      <button
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold"
        onClick={handleSubmit}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default DailyBusinessCalculator;
