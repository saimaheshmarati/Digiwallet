const BASE_URL = "http://localhost:5001";

export const createPaymentOrder = async (amount) => {
  try {
    const response = await fetch(`${BASE_URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency: "INR", receipt: "txn_1234" }),
    });

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error creating payment order:", error);
    return null;
  }
};

export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    });

    return await response.json();
  } catch (error) {
    console.error("Error verifying payment:", error);
    return null;
  }
};
