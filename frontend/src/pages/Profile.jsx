// src/pages/Profile.jsx
import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const Profile = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <div className="text-center" style={{ maxWidth: "400px" }}>
        <h2>Profile</h2>
        <Card className="p-4">
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default Profile;
