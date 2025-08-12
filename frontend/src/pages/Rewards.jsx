// src/pages/Rewards.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { getBalance } from "../api/paymentApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rewards = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userBalance = await getBalance();
      setBalance(userBalance);
      
      // Mock rewards data - in a real app, you'd fetch this from the backend
      setRewards([
        {
          id: 1,
          title: "Welcome Bonus",
          description: "Get ₹100 bonus on your first transaction",
          points: 100,
          status: "available",
          expiryDate: "2025-12-31"
        },
        {
          id: 2,
          title: "Referral Reward",
          description: "Earn ₹50 for each friend you refer",
          points: 50,
          status: "available",
          expiryDate: "2025-12-31"
        },
        {
          id: 3,
          title: "Transaction Bonus",
          description: "5% cashback on bill payments above ₹1000",
          points: 50,
          status: "claimed",
          expiryDate: "2025-12-31"
        },
        {
          id: 4,
          title: "Monthly Bonus",
          description: "₹200 bonus for maintaining ₹5000+ balance",
          points: 200,
          status: "locked",
          expiryDate: "2025-12-31"
        }
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async (rewardId) => {
    try {
      // In a real app, you'd call the backend API to claim the reward
      toast.success("Reward claimed successfully!");
      
      // Update the reward status locally
      setRewards(prevRewards => 
        prevRewards.map(reward => 
          reward.id === rewardId 
            ? { ...reward, status: "claimed" }
            : reward
        )
      );
    } catch (error) {
      toast.error("Failed to claim reward");
    }
  };

  const getRewardStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge bg="success">Available</Badge>;
      case "claimed":
        return <Badge bg="secondary">Claimed</Badge>;
      case "locked":
        return <Badge bg="warning">Locked</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getRewardStatusColor = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "claimed":
        return "secondary";
      case "locked":
        return "warning";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Rewards & Benefits</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total Balance</Card.Title>
              <Card.Text className="h3 text-primary">₹{balance.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Available Rewards</Card.Title>
              <Card.Text className="h3 text-success">
                ₹{rewards.filter(r => r.status === "available").reduce((sum, r) => sum + r.points, 0).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Available Rewards</h5>
            </Card.Header>
            <Card.Body>
              {rewards.length === 0 ? (
                <Alert variant="info">No rewards available at the moment.</Alert>
              ) : (
                <div className="row">
                  {rewards.map((reward) => (
                    <Col md={6} key={reward.id} className="mb-3">
                      <Card className={`border-${getRewardStatusColor(reward.status)}`}>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Card.Title className="mb-0">{reward.title}</Card.Title>
                            {getRewardStatusBadge(reward.status)}
                          </div>
                          <Card.Text className="text-muted mb-2">
                            {reward.description}
                          </Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="h6 text-success mb-0">₹{reward.points}</span>
                            {reward.status === "available" && (
                              <Button 
                                size="sm" 
                                variant="success"
                                onClick={() => claimReward(reward.id)}
                              >
                                Claim Now
                              </Button>
                            )}
                          </div>
                          <small className="text-muted">
                            Expires: {new Date(reward.expiryDate).toLocaleDateString()}
                          </small>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">How to Earn</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Badge bg="primary" className="me-2">1</Badge>
                  Complete your profile
                </li>
                <li className="mb-2">
                  <Badge bg="primary" className="me-2">2</Badge>
                  Make your first transaction
                </li>
                <li className="mb-2">
                  <Badge bg="primary" className="me-2">3</Badge>
                  Refer friends to the platform
                </li>
                <li className="mb-2">
                  <Badge bg="primary" className="me-2">4</Badge>
                  Pay bills regularly
                </li>
                <li className="mb-2">
                  <Badge bg="primary" className="me-2">5</Badge>
                  Maintain minimum balance
                </li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>
              <h5 className="mb-0">Rewards Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Available:</span>
                <Badge bg="success">
                  ₹{rewards.filter(r => r.status === "available").reduce((sum, r) => sum + r.points, 0)}
                </Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Claimed:</span>
                <Badge bg="secondary">
                  ₹{rewards.filter(r => r.status === "claimed").reduce((sum, r) => sum + r.points, 0)}
                </Badge>
              </div>
              <div className="d-flex justify-content-between">
                <span>Locked:</span>
                <Badge bg="warning">
                  ₹{rewards.filter(r => r.status === "locked").reduce((sum, r) => sum + r.points, 0)}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default Rewards;
