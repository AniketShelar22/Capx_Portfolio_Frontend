import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
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
        const response = await axios.get("http://localhost:8080/api/dashboard"); // Adjust URL as needed
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Placeholder values for rendering when the data is not available
  const placeholderData = {
    totalPortfolioValue: 0,
    // topPerformingStock: { stockName: "N/A", gain: 0 },
    portfolioDistribution: [],
  };

  // Use placeholder data if no data is fetched or if there is an error
  const { totalPortfolioValue, topPerformingStock, portfolioDistribution } =
    error || isLoading ? placeholderData : dashboardData;

  // Safe check before calling toFixed
  const safeToFixed = (value, decimals = 2) => {
    if (typeof value === "number") {
      return value.toFixed(decimals);
    }
    return "0.00"; // Return a fallback value if value is not a number
  };

  // Prepare data for Pie chart (portfolio distribution)
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="bg-white p-4 rounded shadow"
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-semibold">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-green-600">
            ${safeToFixed(totalPortfolioValue)}
          </p>
        </motion.div>

        

        <motion.div
          className="bg-white p-4 rounded shadow"
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-semibold">Portfolio Distribution</h3>
          {portfolioDistribution.length > 0 ? (
            <div className="mt-4">
              <Pie data={chartData} />
              <ul className="mt-4">
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
      </div>
    </div>
  );
};

export default Dashboard;



