// src/pages/SendMoney.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { transferMoney, getBalance, searchUsers } from "../api/paymentApi";
import "react-toastify/dist/ReactToastify.css";

const SendMoney = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const userBalance = await getBalance();
      setBalance(userBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleSearchUser = async () => {
    if (!recipient.trim()) {
      toast.error("Please enter recipient email or name");
      return;
    }

    if (recipient.trim().length < 2) {
      toast.error("Search query must be at least 2 characters long");
      return;
    }

    try {
      setLoading(true);
      const users = await searchUsers(recipient.trim());
      setSearchResults(users);
      setShowSearchResults(true);
      
      if (users.length === 0) {
        toast.info("No users found with that search term");
      }
    } catch (error) {
      toast.error("Failed to search for users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!selectedUser) {
      toast.error("Please select a recipient");
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (Number(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setLoading(true);
      await transferMoney(selectedUser.id, Number(amount));
      toast.success("Money sent successfully!");
      setAmount("");
      setRecipient("");
      setSelectedUser(null);
      setShowSearchResults(false);
      setSearchResults([]);
      fetchBalance(); // Refresh balance
    } catch (error) {
      toast.error(error.message || "Failed to send money");
    } finally {
      setLoading(false);
    }
  };

  const selectRecipient = (user) => {
    setSelectedUser(user);
    setRecipient(user.email);
    setShowSearchResults(false);
  };

  const clearSelection = () => {
    setSelectedUser(null);
    setRecipient("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container className="text-center" style={{ maxWidth: "500px" }}>
        <h2>Send Money</h2>
        <Card className="p-4">
          <div className="mb-3">
            <strong>Available Balance: ₹{balance.toLocaleString()}</strong>
          </div>
          
          <Form>
            <Form.Group controlId="recipient" className="mt-3">
              <Form.Label>Recipient (Email or Name)</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Enter recipient email or name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  disabled={selectedUser !== null}
                />
                {selectedUser ? (
                  <Button 
                    variant="outline-secondary" 
                    onClick={clearSelection}
                  >
                    Clear
                  </Button>
                ) : (
                  <Button 
                    variant="outline-primary" 
                    onClick={handleSearchUser}
                    disabled={loading || !recipient.trim() || recipient.trim().length < 2}
                  >
                    {loading ? <Spinner size="sm" /> : "Search"}
                  </Button>
                )}
              </div>
            </Form.Group>

            {selectedUser && (
              <Alert variant="success" className="mt-2">
                <strong>Selected Recipient:</strong><br />
                {selectedUser.name} ({selectedUser.email})
              </Alert>
            )}

            {showSearchResults && searchResults.length > 0 && (
              <div className="mt-2">
                <Alert variant="info" className="p-2">
                  <strong>Found Users:</strong>
                  <div className="mt-2">
                    {searchResults.map((user) => (
                      <div key={user.id} className="d-flex justify-content-between align-items-center p-2 border rounded mb-2">
                        <div>
                          <strong>{user.name}</strong><br />
                          <small>{user.email}</small>
                        </div>
                        <Button 
                          size="sm" 
                          variant="success"
                          onClick={() => selectRecipient(user)}
                        >
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                </Alert>
              </div>
            )}

            <Form.Group controlId="amount" className="mt-3">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max={balance}
                required
              />
              <Form.Text className="text-muted">
                Maximum: ₹{balance.toLocaleString()}
              </Form.Text>
            </Form.Group>

            <Button 
              variant="primary" 
              type="button" 
              className="mt-4 w-100"
              onClick={handleSend}
              disabled={loading || !amount || !selectedUser}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Sending...
                </>
              ) : (
                "Send Money"
              )}
            </Button>
          </Form>
        </Card>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default SendMoney;
