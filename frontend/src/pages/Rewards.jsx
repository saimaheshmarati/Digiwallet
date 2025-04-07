// src/pages/Rewards.jsx
import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const Rewards = () => {
  const earnedPoints = 250;
  const rewards = [
    { id: 1, name: "10% Cashback on Grocery", pointsRequired: 100 },
    { id: 2, name: "15% Discount on Electronics", pointsRequired: 200 },
    { id: 3, name: "20% Off on Travel Booking", pointsRequired: 300 },
  ];

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>Rewards & Cashback</h2>
      <h4 className="mt-3">You have {earnedPoints} reward points</h4>
      <Row className="mt-4">
        {rewards.map((reward) => (
          <Col key={reward.id} sm={12} md={4} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{reward.name}</Card.Title>
                <Card.Text>
                  Requires {reward.pointsRequired} points
                </Card.Text>
                <Button
                  variant="primary"
                  disabled={earnedPoints < reward.pointsRequired}
                >
                  {earnedPoints >= reward.pointsRequired ? "Redeem" : "Insufficient Points"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Rewards;
