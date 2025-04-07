import express from "express";
import { payBill, getBillPayments } from "../controllers/billPaymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/pay", protect, payBill);
router.get("/", protect, getBillPayments);

export default router;
