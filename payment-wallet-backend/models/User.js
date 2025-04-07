import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 }, // ✅ Ensure balance field exists
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
