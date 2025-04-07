// src/components/Transaction.jsx
import React, { useState } from "react";
import { Container, Table, Form } from "react-bootstrap";

const Transaction = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const transactions = [
    { id: 1, type: "Credit", amount: 80000, date: "2025-03-20", description: "Salary" },
    { id: 2, type: "Debit", amount: 500, date: "2025-03-19", description: "Grocery" },
  ];

  const filteredTransactions = transactions.filter((tx) =>
    tx.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <Container>
        <h2 className="text-center">Transaction History</h2>
        <Form.Control
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.type}</td>
                <td>₹{tx.amount}</td>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Transaction;
