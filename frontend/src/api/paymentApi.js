const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001/api";

export const createPaymentOrder = async (amount) => {
  try {
    const response = await fetch(`${BASE_URL}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency: "INR", receipt: "txn_1234" }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create payment order");
    }
    return data.order;
  } catch (error) {
    console.error("Error creating payment order:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await fetch(`${BASE_URL}/payments/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentDetails),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to verify payment");
    }
    return data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// Add new API functions for other features
export const getBalance = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/users/balance`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get balance");
    }
    return data.balance;
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
};

export const createTransaction = async (amount, type) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/transactions/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount, type })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create transaction");
    }
    return data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const transferMoney = async (recipientId, amount) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/transactions/transfer`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipientId, amount })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to transfer money");
    }
    return data;
  } catch (error) {
    console.error("Error transferring money:", error);
    throw error;
  }
};

export const getTransactionHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/transactions/history`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get transaction history");
    }
    return data.transactions;
  } catch (error) {
    console.error("Error getting transaction history:", error);
    throw error;
  }
};

export const payBill = async (billType, amount) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/bills/pay`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ billType, amount })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to pay bill");
    }
    return data;
  } catch (error) {
    console.error("Error paying bill:", error);
    throw error;
  }
};

export const getBillPayments = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/bills`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get bill payments");
    }
    return data.billPayments;
  } catch (error) {
    console.error("Error getting bill payments:", error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/users/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to search users");
    }
    return data.users;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token");
    }

    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get user profile");
    }
    return data.user;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
