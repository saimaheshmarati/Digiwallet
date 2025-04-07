// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light"); // Default to light theme

  useEffect(() => {
    document.body.className = theme; // Set the body class to 'light' or 'dark'
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          Digital Wallet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            <Nav.Link as={Link} to="/transaction">Transaction</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/send-money">Send Money</Nav.Link>
            <Nav.Link as={Link} to="/payment">Payment</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/rewards">Rewards</Nav.Link>
            <Nav.Link as={Link} to="/bill-payment">Bill Payment</Nav.Link>

            <Button variant="outline-light" onClick={toggleTheme} className="ms-2">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;

