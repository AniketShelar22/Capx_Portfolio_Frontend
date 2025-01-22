// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/stocks"; // backend endpoint
// const API_KEY = "VHUIOVX5P6Q7TP47";

// // Fetch all stocks
// export const fetchStocks = async () => {
//   const response = await axios.get(API_BASE_URL);
//   return response.data;
// };

// // Add a new stock
// export const addStock = async (stock) => {
//   const response = await axios.post(API_BASE_URL, stock);
//   return response.data;
// };

// // Delete a stock
// export const deleteStock = async (id) => {
//   const response = await axios.delete(`${API_BASE_URL}/${id}`);
//   return response.data;
// };

// // Update stock details
// export const updateStock = async (id, stock) => {
//   const response = await axios.put(`${API_BASE_URL}/${id}`, stock);
//   return response.data;
// };

// export const fetchStockPrice = async (ticker) => {
//   try {
//     const response = await axios.get(API_BASE_URL, {
//       params: {
//         function: "GLOBAL_QUOTE",
//         symbol: ticker,
//         apikey: API_KEY,
//       },
//     });
//     return response.data["Global Quote"]["05. price"];
//   } catch (error) {
//     console.error("Error fetching stock price:", error);
//     throw error;
//   }
// };

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/stocks"; // Replace with your backend URL

export const fetchStocks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addStock = async (stock) => {
  const response = await axios.post(API_BASE_URL, stock);
  return response.data;
};

export const deleteStock = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateStock = async (id, stock) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, stock);
  return response.data;
};
