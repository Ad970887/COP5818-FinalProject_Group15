// server/models/transaction.js

// Transaction schema
// CommonJS const mongoose = require('mongoose');
// ESM
import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({

  // Individuals involved in transaction
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Transaction data
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  idempotencyKey: {           // prevents duplicate submissions
    type: String,
    index: true,
  },

  // Transaction amounts and currencies
  baseCurrency:  {            // Currency sent by sender
    type: String,
    required: true
  },
  baseAmount: {               // Amount of currency sent
    type: Number,
    required: true,
  },
  quoteCurrency:  {            // Currency sent by receiver
    type: String,
    required: true
  },
  quoteAmount: {               // Amount of currency sent by receiver
    type: Number,
    required: true,
  },
  fxRate: {                   // Exchange rate
    type: Number,
    required: true,
  },

  // Transaction status information
  status:{
    type: String,
    enum: ['pending', 'processing', 'successful', 'failed', 'cancelled'],
    default: 'pending',
    index: true
  },
  
},

{ timestamps: true }        // Provides time of creation

);

// Common JS module.exports = mongoose.model('Transaction', transactionSchema);
//ESM
export default mongoose.model("transaction", transactionSchema);
