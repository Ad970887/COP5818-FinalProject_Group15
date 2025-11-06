// Business logic
const Transaction = require('../models/Transaction');

exports.logTransaction = async (req, res) => {
    const tx = new Transaction(req.body);
    await tx.save();
    res.status(201).send(tx);
};

exports.getTransactions = async (req, res) => {
    const txs = await Transaction.find();
    res.send(txs);
};