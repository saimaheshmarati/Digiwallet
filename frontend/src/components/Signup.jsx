// src/components/Signup.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container className="text-center" style={{ maxWidth: "400px" }}>
        <h2>Sign Up</h2>
        
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSignup}>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Form.Text className="text-muted">
              Password must be at least 6 characters long
            </Form.Text>
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="mt-4 w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>
        
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default Signup;


