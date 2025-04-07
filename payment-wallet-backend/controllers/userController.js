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
