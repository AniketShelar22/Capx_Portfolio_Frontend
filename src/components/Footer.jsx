import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Capx_Portfolio_Tracker</p>
        <p>Effortlessly manage your investments and stay updated with real-time stock information.</p>
        <div className="social-links">
          <a
            href="https://github.com/AniketShelar22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/aniket-shelar-5b46b6298/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p>
          Built with <span style={{ color: "red" }}>❤️</span> by ANIKET_
        </p>
        <p>&copy; {new Date().getFullYear()} Portfolio Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
