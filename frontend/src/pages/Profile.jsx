// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Table, Badge, Spinner } from "react-bootstrap";
import { getBalance, getTransactionHistory, getUserProfile } from "../api/paymentApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get user info from localStorage (you might want to store more user data)
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      // Fetch user profile, balance and transactions
      const [userProfile, userBalance, transactionHistory] = await Promise.all([
        getUserProfile(),
        getBalance(),
        getTransactionHistory()
      ]);

      setUser(userProfile);
      setBalance(userBalance);
      setTransactions(transactionHistory);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case "credit":
        return "success";
      case "debit":
        return "danger";
      case "transfer":
        return "primary";
      default:
        return "secondary";
    }
  };

  const getTransactionTypeLabel = (type) => {
    switch (type) {
      case "credit":
        return "Deposit";
      case "debit":
        return "Withdrawal";
      case "transfer":
        return "Transfer";
      default:
        return type;
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Profile</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </div>
              <Card.Title>{user?.name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user?.email}<br />
                <strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}<br />
                <strong>Balance:</strong> ₹{balance.toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Transaction History</h5>
            </Card.Header>
            <Card.Body>
              {transactions.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No transactions found</p>
                </div>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>
                          {new Date(transaction.createdAt).toLocaleDateString()}
                          <br />
                          <small className="text-muted">
                            {new Date(transaction.createdAt).toLocaleTimeString()}
                          </small>
                        </td>
                        <td>
                          <Badge bg={getTransactionTypeColor(transaction.type)}>
                            {getTransactionTypeLabel(transaction.type)}
                          </Badge>
                        </td>
                        <td>
                          <span className={transaction.type === "debit" ? "text-danger" : "text-success"}>
                            {transaction.type === "debit" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <Badge bg="success">Completed</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default Profile;
