import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icon library
import "./../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("Menu toggled:", !isMenuOpen); // Debugging: Ensure state is toggling
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo with NavLink */}
        <div className="navbar-logo">
          <NavLink to="/" aria-label="Go to Home">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="CapX Logo"
              className="navbar-logo-img"
            />
          </NavLink>
        </div>

        {/* Hamburger Toggle - appears only on smaller screens */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Navbar Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          {["Home", "About", "Contact", "Dashboard", "StockManagement"].map(
            (item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <NavLink
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                >
                  {item}
                </NavLink>
              </motion.li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

