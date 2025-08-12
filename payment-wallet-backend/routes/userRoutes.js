import express from 'express';
import { getBalance, searchUsers, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';  // ✅ Using 'middlewares'

const router = express.Router();

// Route to get user balance
router.get('/balance', protect, getBalance);

// Route to search users
router.get('/search', protect, searchUsers);

// Route to get user profile
router.get('/profile', protect, getUserProfile);

export default router;
