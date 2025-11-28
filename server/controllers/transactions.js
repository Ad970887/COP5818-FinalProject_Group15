const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.logTransaction = async (req, res) => {
    try {
        const { sender, recipient, amount, stablecoin } = req.body;
        const coin = stablecoin || 'USDC';

        if (amount <= 0) {
            return res.status(400).json({ error: "Amount must be positive" });
        }

        if (!['USDC', 'USDT', 'DAI'].includes(coin)) {
            return res.status(400).json({ error: "Invalid stablecoin" });
        }

        const senderUser = await User.findOne({ email: sender });
        const recipientUser = await User.findOne({ email: recipient });

        if (!senderUser || !recipientUser) {
            return res.status(404).json({ error: "Sender or recipient not found" });
        }

        const senderCoinBalance = senderUser.stablecoins[coin];
        if (senderCoinBalance < amount) {
            return res.status(400).json({ error: `Insufficient ${coin} balance` });
        }

        const sBefore = senderCoinBalance;
        const rBefore = recipientUser.stablecoins[coin] || 0;

        // Deduct from sender, add to recipient
        senderUser.stablecoins[coin] -= amount;
        recipientUser.stablecoins[coin] = (recipientUser.stablecoins[coin] || 0) + amount;
        
        // Also update total USD balance (1:1 conversion)
        senderUser.balance = Object.values(senderUser.stablecoins).reduce((a, b) => a + b, 0);
        recipientUser.balance = Object.values(recipientUser.stablecoins).reduce((a, b) => a + b, 0);

        await senderUser.save();
        await recipientUser.save();

        const tx = new Transaction({
            sender,
            recipient,
            amount,
            stablecoin: coin,
            senderBalanceBefore: sBefore,
            senderBalanceAfter: senderCoinBalance - amount,
            recipientBalanceBefore: rBefore,
            recipientBalanceAfter: rBefore + amount
        });

        await tx.save();

        res.status(201).json(tx);

    } catch (error) {
        console.error("Error logging transaction:", error);
        res.status(500).json({ error: "Failed to process transaction" });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const txs = await Transaction.find().sort({ createdAt: -1 });
        res.json(txs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};
