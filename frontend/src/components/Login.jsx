// src/components/Login.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the real JWT token
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container className="text-center" style={{ maxWidth: "400px" }}>
        <h2>Login</h2>
        
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>
        
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;

