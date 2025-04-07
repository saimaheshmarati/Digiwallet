// src/charts/TransactionChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const data = {
    labels: ["Credits", "Debits"],
    datasets: [
      {
        data: [3000, 1500],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <div className="text-center">
        <h2>Transaction Overview</h2>
        <Doughnut data={data} />
      </div>
    </Container>
  );
};

export default TransactionChart;
