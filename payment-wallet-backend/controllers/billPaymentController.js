import BillPayment from "../models/BillPayment.js";
import User from "../models/User.js";

export const payBill = async (req, res) => {
    try {
        const { billType, amount } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

        user.balance -= amount;
        await user.save();

        const billPayment = new BillPayment({ userId, billType, amount });
        await billPayment.save();

        res.status(201).json({ 
            message: "Bill Payment Successful", 
            billPayment,
            newBalance: user.balance
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getBillPayments = async (req, res) => {
    try {
        const billPayments = await BillPayment.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Bill Payments Retrieved", billPayments });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
