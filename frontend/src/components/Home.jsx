// src/components/Home.jsx
import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token && token !== "dummy-jwt-token") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="display-4 mb-4">Welcome to Digital Wallet</h1>
            <p className="lead mb-5">
              Securely store, manage, and transfer your money online with our advanced digital wallet platform.
            </p>
            
            <div className="mb-5">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleGetStarted}
                className="me-3"
              >
                Get Started
              </Button>
              <Link to="/login">
                <Button variant="outline-primary" size="lg">
                  Login
                </Button>
              </Link>
            </div>

            <Row className="mt-5">
              <Col md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                      💳
                    </div>
                    <Card.Title>Secure Payments</Card.Title>
                    <Card.Text>
                      Bank-grade security with encrypted transactions and real-time fraud detection.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                      📱
                    </div>
                    <Card.Title>Mobile First</Card.Title>
                    <Card.Text>
                      Access your wallet anywhere, anytime with our responsive mobile design.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                      🚀
                    </div>
                    <Card.Title>Instant Transfers</Card.Title>
                    <Card.Text>
                      Send money instantly to friends and family with just a few clicks.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
