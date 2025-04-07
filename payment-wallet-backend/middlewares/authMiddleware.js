import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];
            console.log("📌 Extracted Token:", token);

            // Check if JWT secret is configured
            if (!process.env.JWT_SECRET) {
                console.error("❌ Missing JWT_SECRET in environment variables.");
                return res.status(500).json({ message: "Server error: JWT secret not configured" });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token Decoded:", decoded);

            // Fetch user from DB
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                console.error("❌ User not found for token ID:", decoded.id);
                return res.status(403).json({ message: "Forbidden: User not found" });
            }

            // ✅ Attach user info to `req.user`
            req.user = user;
            console.log("✅ User Authenticated:", req.user.email, "| Balance:", req.user.balance);

            next(); // Move to next middleware

        } catch (error) {
            console.error("❌ Token Verification Error:", error.message);

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized: Token has expired" });
            }

            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }

            return res.status(403).json({ message: "Forbidden: Invalid authentication" });
        }
    } else {
        console.warn("❌ No Authorization Header Provided");
        return res.status(403).json({ message: "Forbidden: No token provided" });
    }
};


