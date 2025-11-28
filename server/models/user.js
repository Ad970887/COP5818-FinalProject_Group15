const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 }, // Total USD balance
    stablecoins: {
        USDC: { type: Number, default: 0 },
        USDT: { type: Number, default: 0 },
        DAI: { type: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
