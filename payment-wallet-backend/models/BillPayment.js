import mongoose from "mongoose";

const billPaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    billType: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "failed"], default: "paid" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("BillPayment", billPaymentSchema);
