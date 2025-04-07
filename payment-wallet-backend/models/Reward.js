import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reward", rewardSchema);
