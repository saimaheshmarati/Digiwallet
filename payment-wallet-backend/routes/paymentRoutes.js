// src/routes/paymentRoutes.js

import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

// Route to create a payment order
router.post("/create-order", createOrder);

// Route to verify payment success
router.post("/verify-payment", verifyPayment);

export default router;
