import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://capx-portfolio-backend.onrender.com/api/dashboard"); // Adjust URL as needed
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const placeholderData = {
    totalPortfolioValue: 0,
    portfolioDistribution: [],
  };

  const { totalPortfolioValue, portfolioDistribution } =
    error || isLoading ? placeholderData : dashboardData;

  const safeToFixed = (value, decimals = 2) => {
    if (typeof value === "number") {
      return value.toFixed(decimals);
    }
    return "0.00";
  };

  const chartData = {
    labels: portfolioDistribution.map((stock) => stock.stockName),
    datasets: [
      {
        label: "Portfolio Distribution",
        data: portfolioDistribution.map((stock) => stock.percentage),
        backgroundColor: portfolioDistribution.map(
          (_, index) => `hsl(${(index * 360) / portfolioDistribution.length}, 70%, 50%)`
        ),
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Portfolio Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-semibold">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-green-600">
            ${safeToFixed(totalPortfolioValue)}
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-semibold">Portfolio Distribution</h3>
          {portfolioDistribution.length > 0 ? (
            <div className="mt-4">
              <Pie data={chartData} />
              <ul className="mt-4 space-y-2">
                {portfolioDistribution.map((stock, index) => (
                  <li key={index} className="text-md text-gray-800">
                    {stock.stockName}: {safeToFixed(stock.percentage)}%
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-md text-gray-600">No data available</p>
          )}
        </motion.div>

        {/* You can add another card for more information or visuals */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-semibold">Additional Information</h3>
          <p className="text-md text-gray-600">Add more insights here.</p>
        </motion.div>
      </div>

      {/* Loading and Error State Enhancements */}
      {isLoading && (
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">Loading data...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
