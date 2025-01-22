import React, { useState, useEffect } from "react";
import { fetchStocks, addStock, deleteStock, updateStock } from "../utils/api";

const StockManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ name: "", ticker: "", quantity: 1, buyPrice: "" });
  const [editStockId, setEditStockId] = useState(null);
  const [editedStock, setEditedStock] = useState({});

  console.log(editedStock.buyPrice)


  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStocks();
        console.log(data)
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
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
      {loading && <p>Loading stocks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Add Stock Form */}
      <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleAddStock}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Stock Name"
            value={newStock.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="ticker"
            placeholder="Ticker"
            value={newStock.ticker}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newStock.quantity}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="buyPrice"
            placeholder="Buy Price"
            value={newStock.buyPrice}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Stock
        </button>
      </form>

      {/* Portfolio Value */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Total Portfolio Value</h3>
        <p className="text-2xl font-bold text-green-600">
          ${totalPortfolioValue.toFixed(2)}
        </p>
      </div>

      {/* Stocks Table */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Ticker</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Buy Price</th>
            <th className="p-2 text-left">Current Price</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id} className="border-b">
              <td className="p-2">
                {editStockId === stock.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedStock.name || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                ) : (
                  stock.name
                )}
              </td>
              <td className="p-2">
                {editStockId === stock.id ? (
                  <input
                    type="text"
                    name="ticker"
                    value={editedStock.ticker || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                ) : (
                  stock.ticker
                )}
              </td>
              <td className="p-2">
                {editStockId === stock.id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editedStock.quantity || ""}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                ) : (
                  stock.quantity
                )}
              </td>
              <td className="p-2">
                {editStockId === stock.id ? (
                  <input
                    type="number"
                    name="buyPrice"
                    value={editedStock.buyPrice || "NA"}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                ) : (
                  `$${stock.buyPrice}`
                )}
              </td>
              <td className="p-2">${stock.currentPrice || "Fetching..."}</td>
              <td className="p-2">
                {editStockId === stock.id ? (
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={handleUpdateStock}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:underline mr-2"
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
  );
};

export default StockManagement;
