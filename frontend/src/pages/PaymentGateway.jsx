import React, { useState, useEffect } from "react";
import { Container, Button, Form, Card, Alert, Spinner } from "react-bootstrap";
import { createPaymentOrder, verifyPayment, getBalance } from "../api/paymentApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentGateway = () => {
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

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

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      setPaymentStatus("Creating payment order...");
      
      const order = await createPaymentOrder(Number(amount));
      if (!order) {
        throw new Error("Failed to create payment order");
      }

      setPaymentStatus("Payment order created. Processing payment...");

      // Simulate Payment Process (Replace this with actual Razorpay Checkout)
      // In a real app, you would redirect to Razorpay checkout
      setTimeout(async () => {
        try {
          const fakePaymentDetails = {
            razorpay_order_id: order.id,
            razorpay_payment_id: "payment_" + Date.now(),
            razorpay_signature: "signature_" + Date.now(),
          };

          const verifyResponse = await verifyPayment(fakePaymentDetails);

          if (verifyResponse.success) {
            setPaymentStatus("Payment successful!");
            toast.success("Payment completed successfully!");
            setAmount("");
            fetchBalance(); // Refresh balance
          } else {
            setPaymentStatus("Payment verification failed.");
            toast.error("Payment verification failed");
          }
        } catch (error) {
          setPaymentStatus("Payment verification failed.");
          toast.error("Payment verification failed");
        } finally {
          setLoading(false);
        }
      }, 2000);

    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("Payment failed: " + error.message);
      toast.error("Payment failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center fade-in">
      <Container>
        <h2>Payment Gateway</h2>
        <p className="mb-4">Enter the amount and proceed with payment.</p>
        
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="p-4">
              <div className="mb-3">
                <Alert variant="info">
                  <strong>Available Balance: ₹{balance.toLocaleString()}</strong>
                </Alert>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                />
                <Form.Text className="text-muted">
                  Minimum amount: ₹1
                </Form.Text>
              </Form.Group>
              
              <Button 
                variant="success" 
                onClick={handlePayment} 
                className="w-100"
                disabled={loading || !amount || amount <= 0}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
              
              {paymentStatus && (
                <Alert 
                  variant={paymentStatus.includes("successful") ? "success" : 
                          paymentStatus.includes("failed") ? "danger" : "info"} 
                  className="mt-3"
                >
                  {paymentStatus}
                </Alert>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-4">
          <h5>Payment Methods Available:</h5>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="d-flex justify-content-around flex-wrap">
                <div className="text-center m-2">
                  <div className="bg-primary text-white p-2 rounded">💳</div>
                  <small>Credit Card</small>
                </div>
                <div className="text-center m-2">
                  <div className="bg-success text-white p-2 rounded">🏦</div>
                  <small>Debit Card</small>
                </div>
                <div className="text-center m-2">
                  <div className="bg-info text-white p-2 rounded">🏧</div>
                  <small>Net Banking</small>
                </div>
                <div className="text-center m-2">
                  <div className="bg-warning text-white p-2 rounded">📱</div>
                  <small>UPI</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default PaymentGateway;