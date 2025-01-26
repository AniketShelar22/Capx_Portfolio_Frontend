import React, { useState, useEffect } from "react";
import { fetchStocks, addStock, deleteStock, updateStock } from "../utils/api";

const StockManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ name: "", ticker: "", quantity: 1, buyPrice: "" });
  const [editStockId, setEditStockId] = useState(null);
  const [editedStock, setEditedStock] = useState({});

  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        setError("Failed to fetch stocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, []);

  const handleChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (newStock.name && newStock.ticker && newStock.buyPrice) {
      try {
        const addedStock = await addStock(newStock);
        setStocks([...stocks, addedStock]);
        setNewStock({ name: "", ticker: "", quantity: 1, buyPrice: "" });
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await deleteStock(id);
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleEditClick = (stock) => {
    setEditStockId(stock.id);
    setEditedStock(stock);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStock({ ...editedStock, [name]: value });
  };

  const handleUpdateStock = async () => {
    try {
      const updatedStock = await updateStock(editStockId, editedStock);
      setStocks(
        stocks.map((stock) =>
          stock.id === editStockId ? { ...stock, ...updatedStock } : stock
        )
      );
      setEditStockId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const totalPortfolioValue = stocks.reduce(
    (sum, stock) => sum + stock.quantity * (stock.currentPrice || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Stock Management
        </h2>
        {/* Note Box */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow mb-6">
          <p className="text-gray-700 font-semibold">Note:</p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>This App is using Alpha Vantage API for Real-time data.</li>
            <li>The daily limit for data fetching is 25 responses per day, hence the refresh time for real-time data is 10 min.</li>
          </ul>
        </div>
        {loading && <p className="text-center text-gray-600">Loading stocks...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Add Stock Form */}
        <form className="bg-white p-4 md:p-6 rounded-lg shadow mb-6" onSubmit={handleAddStock}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Stock Name"
              value={newStock.name}
              onChange={handleChange}
              className="p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              name="ticker"
              placeholder="Ticker"
              value={newStock.ticker}
              onChange={handleChange}
              className="p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newStock.quantity}
              onChange={handleChange}
              className="p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="number"
              name="buyPrice"
              placeholder="Buy Price"
              value={newStock.buyPrice}
              onChange={handleChange}
              className="p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add Stock
          </button>
        </form>

        {/* Portfolio Value */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Portfolio Value</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${totalPortfolioValue.toFixed(2)}
          </p>
        </div>
        
        

        {/* Stocks Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Ticker</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Buy Price</th>
                <th className="p-4 text-left">Current Price</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="border-b">
                  <td className="p-4">
                    {editStockId === stock.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedStock.name || ""}
                        onChange={handleEditChange}
                        className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    ) : (
                      stock.name
                    )}
                  </td>
                  <td className="p-4">
                    {editStockId === stock.id ? (
                      <input
                        type="text"
                        name="ticker"
                        value={editedStock.ticker || ""}
                        onChange={handleEditChange}
                        className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    ) : (
                      stock.ticker
                    )}
                  </td>
                  <td className="p-4">
                    {editStockId === stock.id ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editedStock.quantity || ""}
                        onChange={handleEditChange}
                        className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    ) : (
                      stock.quantity
                    )}
                  </td>
                  <td className="p-4">
                    {editStockId === stock.id ? (
                      <input
                        type="number"
                        name="buyPrice"
                        value={editedStock.buyPrice || ""}
                        onChange={handleEditChange}
                        className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    ) : (
                      `$${stock.buyPrice}`
                    )}
                  </td>
                  <td className="p-4">
                    ${stock.currentPrice || "Fetching..."}
                  </td>
                  <td className="p-4 space-x-2">
                    {editStockId === stock.id ? (
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={handleUpdateStock}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEditClick(stock)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteStock(stock.id)}
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
    </div>
  );
};

export default StockManagement;
