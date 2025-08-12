import User from '../models/User.js';

export const getBalance = async (req, res) => {
    try {
        console.log("🔍 Checking req.user:", req.user); // Debugging log

        // Ensure req.user exists
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Send balance
        res.json({ balance: req.user.balance });

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim().length < 2) {
            return res.status(400).json({ message: "Search query must be at least 2 characters long" });
        }

        // Search users by email or name (excluding the current user)
        const users = await User.find({
            $and: [
                { _id: { $ne: req.user._id } }, // Exclude current user
                {
                    $or: [
                        { email: { $regex: query, $options: 'i' } },
                        { name: { $regex: query, $options: 'i' } }
                    ]
                }
            ]
        }).select('name email _id').limit(10);

        res.json({ 
            message: "Users found", 
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email
            }))
        });

    } catch (error) {
        console.error("❌ User Search Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User profile retrieved",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error("❌ Get Profile Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
