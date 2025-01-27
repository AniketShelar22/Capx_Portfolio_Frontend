import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import './../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/stockmanagement');
  };

  return (
    <div className="home-container">
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title" style={{ fontSize: '3rem', color: '#4CAF50', textShadow: '2px 2px 4px #000000' }}>
        Simplify your stock tracking and management
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.5rem', color: '#FF9800', marginTop: '10px' }}>
        Revolutionizing portfolio tracking with real-time stock management solutions for seamless and accurate investment oversight        </p>
        <motion.button
          className="cta-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          onClick={handleGetStarted}
        >
          Get Started
        </motion.button>
      </motion.header>
    </div>
  );
};

export default HomePage;
