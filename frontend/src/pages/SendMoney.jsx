// src/pages/SendMoney.jsx
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendMoney = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const data = {
      sender: "mahesh@wallet", // 🔁 Replace this with actual sender's ID/email if dynamic
      receiver: recipient,
      amount: Number(amount),
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Money sent successfully!");
      } else {
        toast.error(result.message || "Failed to send money.");
      }
    } catch (err) {
      console.error("Error during transfer:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container className="text-center" style={{ maxWidth: "400px" }}>
        <h2>Send Money</h2>
        <Card className="p-4">
          <Form onSubmit={handleSend}>
            <Form.Group controlId="recipient" className="mt-3">
              <Form.Label>Recipient (Email/Phone/Wallet ID)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="amount" className="mt-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Send
            </Button>
          </Form>
        </Card>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default SendMoney;
