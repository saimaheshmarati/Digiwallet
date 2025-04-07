// src/components/Footer.jsx
import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <p>&copy; 2025 Digital Wallet. All rights reserved.</p>
      <p>Contact: support@digitalwallet.com</p>
      <div>
        <a
          href="https://www.instagram.com/sai_mahesh_526/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", fontSize: "1.5em" }}
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

