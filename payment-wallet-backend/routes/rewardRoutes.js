import express from "express";
import { addReward, getUserRewards } from "../controllers/rewardsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addReward);
router.get("/", protect, getUserRewards);

export default router;
