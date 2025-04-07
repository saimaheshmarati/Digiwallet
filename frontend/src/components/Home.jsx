// src/components/Home.jsx
import React from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center fade-in">
      <div>
        <h1>Welcome to Digital Wallet</h1>
        <p>Securely store and manage your money online.</p>
        <Button variant="primary">Get Started</Button>
      </div>
    </div>
  );
};

export default Home;
