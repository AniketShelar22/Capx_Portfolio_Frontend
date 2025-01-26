import axios from "axios";

const API_BASE_URL = "https://capx-portfolio-backend.onrender.com/api/stocks"; // Replace with your backend URL

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
