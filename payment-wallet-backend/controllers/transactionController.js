import Transaction from "../models/Transaction.js"; // Import Transaction model
import User from "../models/User.js"; // Import User model
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion

// ---------------------- CREATE TRANSACTION ----------------------
export const createTransaction = async (req, res) => {
    try {
        const { amount, type } = req.body;
        const userId = req.user.id; // Get user ID from token

        // Validate input
        if (!amount || amount <= 0 || !type || !["credit", "debit"].includes(type)) {
            return res.status(400).json({ message: "Invalid transaction type or amount" });
        }

        // Fetch user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (type === "debit" && user.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Create and save transaction
        const transaction = await Transaction.create({ userId, amount, type });

        // Update user's balance
        user.balance += type === "credit" ? amount : -amount;
        await user.save();

        res.status(201).json({ message: "Transaction successful", transaction });
    } catch (error) {
        console.error("❌ Transaction Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------------- TRANSFER MONEY ----------------------
export const transferMoney = async (req, res) => {
    try {
        const { recipientId, amount } = req.body;
        const senderId = req.user.id; 

        if (!recipientId || !amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid recipient or amount" });
        }

        // Ensure recipientId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ message: "Invalid recipient ID format" });
        }

        // Fetch sender and recipient details
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        if (!sender) return res.status(404).json({ message: "Sender not found" });
        if (!recipient) return res.status(404).json({ message: "Recipient not found" });

        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct from sender, add to recipient
        sender.balance -= amount;
        recipient.balance += amount;

        await sender.save({ validateBeforeSave: false });
        await recipient.save({ validateBeforeSave: false });

        // Create transaction record
        const transaction = await Transaction.create({
            senderId,
            recipientId,
            amount,
            type: "transfer",
        });

        res.status(200).json({ message: "Transfer successful", transaction });
    } catch (error) {
        console.error("❌ Transfer Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ---------------------- GET TRANSACTION HISTORY ----------------------
export const getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find transactions where user is sender, recipient, or involved in a transaction
        const transactions = await Transaction.find({
            $or: [{ senderId: userId }, { recipientId: userId }, { userId }]
        }).sort({ createdAt: -1 });

        res.status(200).json({ message: "Transaction history retrieved", transactions });
    } catch (error) {
        console.error("❌ Transaction History Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
