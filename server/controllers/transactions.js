const Transaction = require('../models/Transaction');
const User = require('../models/user');

exports.logTransaction = async (req, res) => {
    try {
        const { sender, recipient, amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ error: "Amount must be positive" });
        }

        const senderUser = await User.findOne({ email: sender });
        const recipientUser = await User.findOne({ email: recipient });

        if (!senderUser || !recipientUser) {
            return res.status(404).json({ error: "Sender or recipient not found" });
        }

        if (senderUser.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        const sBefore = senderUser.balance;
        const rBefore = recipientUser.balance;

        senderUser.balance -= amount;
        recipientUser.balance += amount;

        await senderUser.save();
        await recipientUser.save();

        const tx = new Transaction({
            sender,
            recipient,
            amount,
            senderBalanceBefore: sBefore,
            senderBalanceAfter: senderUser.balance,
            recipientBalanceBefore: rBefore,
            recipientBalanceAfter: recipientUser.balance
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
