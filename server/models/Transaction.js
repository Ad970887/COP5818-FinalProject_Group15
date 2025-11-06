// Transaction schema
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);