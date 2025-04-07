// src/pages/BillPayment.jsx
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const BillPayment = () => {
  const [billType, setBillType] = useState("Mobile Recharge");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const dueBills = [
    { id: 1, type: "Electricity Bill", dueDate: "2025-04-05", amount: 1200 },
    { id: 2, type: "Water Bill", dueDate: "2025-04-10", amount: 300 },
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Paid ₹${amount} for ${billType} (Reference: ${reference})`);
    setAmount("");
    setReference("");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Bill Payment & Recharge</h2>
      <Card className="p-4 w-100 w-md-50 mx-auto">
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
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="reference" className="mb-3">
            <Form.Label>Reference</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reference number"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Pay Bill
          </Button>
        </Form>
      </Card>

      <h3 className="mt-5">Upcoming Bills</h3>
      {dueBills.map((bill) => (
        <Card key={bill.id} className="mt-3">
          <Card.Body>
            <Card.Title>{bill.type}</Card.Title>
            <Card.Text>
              Due Date: {bill.dueDate} <br />
              Amount: ₹{bill.amount}
            </Card.Text>
            <Button variant="success">Pay Now</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default BillPayment;

