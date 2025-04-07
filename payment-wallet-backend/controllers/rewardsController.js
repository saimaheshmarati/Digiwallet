import Reward from "../models/Reward.js";
import User from "../models/User.js";

export const addReward = async (req, res) => {
    try {
        const { userId, amount, reason } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.balance += amount;
        await user.save();

        const reward = new Reward({ userId, amount, reason });
        await reward.save();

        res.status(201).json({ message: "Reward Added Successfully", reward });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserRewards = async (req, res) => {
    try {
        const rewards = await Reward.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Rewards Retrieved", rewards });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
