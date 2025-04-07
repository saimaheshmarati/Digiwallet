import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QRCode", qrCodeSchema);
