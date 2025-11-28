const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        // Handle duplicate email (unique index) explicitly
        if (err && err.code === 11000) {
            return res.status(409).json({ error: 'Wallet with that email already exists' });
        }
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Buy stablecoins endpoint
router.post('/buy', async (req, res) => {
    try {
        const { email, usdAmount, stablecoin } = req.body;

        if (usdAmount <= 0) {
            return res.status(400).json({ error: "Amount must be positive" });
        }

        if (!['USDC', 'USDT', 'DAI'].includes(stablecoin)) {
            return res.status(400).json({ error: "Invalid stablecoin" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.balance < usdAmount) {
            return res.status(400).json({ error: "Insufficient USD balance" });
        }

        // Deduct USD and add stablecoin (1:1 conversion)
        user.balance -= usdAmount;
        user.stablecoins[stablecoin] = (user.stablecoins[stablecoin] || 0) + usdAmount;

        await user.save();

        res.status(200).json({ 
            message: `Successfully bought ${usdAmount} ${stablecoin}`,
            user 
        });
    } catch (err) {
        console.error("Error buying stablecoins:", err);
        res.status(500).json({ error: "Failed to process purchase" });
    }
});

module.exports = router;
