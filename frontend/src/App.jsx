// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import existing components/pages
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transaction from "./components/Transaction";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PaymentGateway from "./pages/PaymentGateway";
import SendMoney from "./pages/SendMoney";
import Profile from "./pages/Profile";

// Import new pages

import Rewards from "./pages/Rewards";
import BillPayment from "./pages/BillPayment";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/profile" element={<Profile />} />
            {/* New Routes */}

            <Route path="/rewards" element={<Rewards />} />
            <Route path="/bill-payment" element={<BillPayment />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
