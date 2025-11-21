// Business logic for transactions
const Transaction = require('../models/Transaction');

exports.logTransaction = async (req, res) => {
    try {
        const tx = new Transaction(req.body);
        await tx.save();
        res.status(201).json(tx);
    } catch (error) {
        console.error('❌ Error logging transaction:', error.message);
        res.status(500).json({ error: 'Failed to log transaction' });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const txs = await Transaction.find().sort({ createdAt: -1 });
        res.json(txs);
    } catch (error) {
        console.error('❌ Error fetching transactions:', error.message);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};
