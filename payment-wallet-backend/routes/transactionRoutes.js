import express from "express";
import { createTransaction, transferMoney, getTransactionHistory } from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new transaction (deposit/withdraw)
router.post("/create", protect, createTransaction);

// Route to transfer money between users
router.post("/transfer", protect, transferMoney);

// Route to fetch transaction history
router.get("/history", protect, getTransactionHistory);

export default router;
