import express from 'express';
import { getBalance } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';  // ✅ Using 'middlewares'

const router = express.Router();

// Route to get user balance
router.get('/balance', protect, getBalance);

export default router;
