const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: Number, required: true },
    stablecoin: { type: String, enum: ['USDC', 'USDT', 'DAI'], default: 'USDC' },
    currency: { type: String, default: "USD" },
    senderBalanceBefore: Number,
    senderBalanceAfter: Number,
    recipientBalanceBefore: Number,
    recipientBalanceAfter: Number
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
