// src/pages/BillPayment.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { payBill, getBillPayments, getBalance } from "../api/paymentApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillPayment = () => {
  const [billType, setBillType] = useState("Mobile Recharge");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [billPayments, setBillPayments] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    fetchBalance();
    fetchBillPayments();
  }, []);

  const fetchBalance = async () => {
    try {
      const userBalance = await getBalance();
      setBalance(userBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchBillPayments = async () => {
    try {
      const payments = await getBillPayments();
      setBillPayments(payments);
    } catch (error) {
      console.error("Error fetching bill payments:", error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (Number(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setLoading(true);
      await payBill(billType, Number(amount));
      toast.success(`Successfully paid ₹${amount} for ${billType}`);
      setAmount("");
      setReference("");
      setShowPaymentForm(false);
      fetchBalance(); // Refresh balance
      fetchBillPayments(); // Refresh bill payments
    } catch (error) {
      toast.error(error.message || "Bill payment failed");
    } finally {
      setLoading(false);
    }
  };

  const dueBills = [
    { id: 1, type: "Electricity Bill", dueDate: "2025-04-05", amount: 1200 },
    { id: 2, type: "Water Bill", dueDate: "2025-04-10", amount: 300 },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Bill Payment & Recharge</h2>
      
      <div className="text-center mb-4">
        <Alert variant="info">
          <strong>Available Balance: ₹{balance.toLocaleString()}</strong>
        </Alert>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Card className="p-4">
            <Card.Title className="text-center mb-3">Pay Bill</Card.Title>
            <Form onSubmit={handlePayment}>
              <Form.Group controlId="billType" className="mb-3">
                <Form.Label>Select Bill Type</Form.Label>
                <Form.Select
                  value={billType}
                  onChange={(e) => setBillType(e.target.value)}
                >
                  <option>Mobile Recharge</option>
                  <option>Electricity Bill</option>
                  <option>Water Bill</option>
                  <option>Internet Subscription</option>
                  <option>Gas Bill</option>
                  <option>Insurance Premium</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group controlId="amount" className="mb-3">
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  max={balance}
                  required
                />
                <Form.Text className="text-muted">
                  Maximum: ₹{balance.toLocaleString()}
                </Form.Text>
              </Form.Group>
              
              <Form.Group controlId="reference" className="mb-3">
                <Form.Label>Reference Number (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter reference number"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </Form.Group>
              
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                disabled={loading || !amount}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  "Pay Bill"
                )}
              </Button>
            </Form>
          </Card>
        </div>

        <div className="col-md-6">
          <h3>Upcoming Bills</h3>
          {dueBills.map((bill) => (
            <Card key={bill.id} className="mt-3">
              <Card.Body>
                <Card.Title>{bill.type}</Card.Title>
                <Card.Text>
                  Due Date: {bill.dueDate} <br />
                  Amount: ₹{bill.amount}
                </Card.Text>
                <Button 
                  variant="success"
                  onClick={() => {
                    setBillType(bill.type);
                    setAmount(bill.amount.toString());
                    setShowPaymentForm(true);
                  }}
                  disabled={bill.amount > balance}
                >
                  Pay Now
                </Button>
                {bill.amount > balance && (
                  <Alert variant="warning" className="mt-2">
                    Insufficient balance
                  </Alert>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {billPayments.length > 0 && (
        <div className="mt-5">
          <h3>Recent Bill Payments</h3>
          <div className="row">
            {billPayments.slice(0, 6).map((payment, index) => (
              <div key={index} className="col-md-4 mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{payment.billType}</Card.Title>
                    <Card.Text>
                      Amount: ₹{payment.amount}<br />
                      Date: {new Date(payment.createdAt).toLocaleDateString()}<br />
                      Status: <span className="text-success">{payment.status}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </Container>
  );
};

export default BillPayment;

