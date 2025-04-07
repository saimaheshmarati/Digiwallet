// src/pages/Dashboard.jsx
import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const walletBalance = 85000;

  // Check for authentication (dummy check)
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container>
        <h2 className="text-center mb-4">Dashboard</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Wallet Balance</Card.Title>
                <Card.Text>₹{walletBalance}</Card.Text>
                <Button variant="primary" className="m-2">
                  Deposit
                </Button>
                <Button variant="secondary" className="m-2">
                  Withdraw
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;


