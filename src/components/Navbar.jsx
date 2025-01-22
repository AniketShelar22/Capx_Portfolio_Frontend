import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
        <motion.div
            whileHover={{ scale: 1.1, textDecoration: "underline" }}
            transition={{ duration: 0.2 }}
          >
          <Link to="/stock-management" className="hover:underline">
            Stock Management
          </Link>
          </motion.div>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
