import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { createPaymentOrder, verifyPayment } from "../api/paymentApi";

const PaymentGateway = () => {
  const [amount, setAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    if (amount <= 0) {
      setPaymentStatus("Please enter a valid amount.");
      return;
    }

    const order = await createPaymentOrder(amount);
    if (!order) {
      setPaymentStatus("Error creating order. Please try again.");
      return;
    }

    // Simulate Payment Process (Replace this with actual Razorpay Checkout)
    const fakePaymentDetails = {
      orderId: order.id,
      paymentId: "payment_1234",
      signature: "signature_5678",
    };

    const verifyResponse = await verifyPayment(fakePaymentDetails);

    if (verifyResponse.success) {
      setPaymentStatus("Payment successful!");
    } else {
      setPaymentStatus("Payment verification failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center fade-in">
      <Container>
        <h2>Payment Gateway</h2>
        <p>Enter the amount and proceed with payment.</p>
        <Form>
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={handlePayment} className="mt-3">
          Pay Now
        </Button>
        {paymentStatus && <p className="mt-3">{paymentStatus}</p>}
      </Container>
    </div>
  );
};

export default PaymentGateway;