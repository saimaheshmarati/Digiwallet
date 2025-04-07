import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Used for transfers
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Used for transfers
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Used for credit/debit transactions
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit", "transfer"], required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
