// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getBalance, createTransaction } from "../api/paymentApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  // Check for authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBalance();
  }, [navigate]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const balance = await getBalance();
      setWalletBalance(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setProcessing(true);
      await createTransaction(Number(amount), "credit");
      toast.success("Deposit successful!");
      setAmount("");
      setShowDepositModal(false);
      fetchBalance(); // Refresh balance
    } catch (error) {
      toast.error(error.message || "Deposit failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (Number(amount) > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setProcessing(true);
      await createTransaction(Number(amount), "debit");
      toast.success("Withdrawal successful!");
      setAmount("");
      setShowWithdrawModal(false);
      fetchBalance(); // Refresh balance
    } catch (error) {
      toast.error(error.message || "Withdrawal failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Dashboard</h2>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Wallet Balance</Card.Title>
                <Card.Text className="h3 text-primary">₹{walletBalance.toLocaleString()}</Card.Text>
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    onClick={() => setShowDepositModal(true)}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Deposit"}
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowWithdrawModal(true)}
                    disabled={processing || walletBalance <= 0}
                  >
                    {processing ? "Processing..." : "Withdraw"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Deposit Modal */}
        <Modal show={showDepositModal} onHide={() => setShowDepositModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Deposit Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleDeposit}>
              <Form.Group>
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDepositModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeposit} disabled={processing}>
              {processing ? "Processing..." : "Deposit"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Withdraw Modal */}
        <Modal show={showWithdrawModal} onHide={() => setShowWithdrawModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Withdraw Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleWithdraw}>
              <Form.Group>
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  max={walletBalance}
                  required
                />
                <Form.Text className="text-muted">
                  Available balance: ₹{walletBalance.toLocaleString()}
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowWithdrawModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleWithdraw} disabled={processing}>
              {processing ? "Processing..." : "Withdraw"}
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default Dashboard;


