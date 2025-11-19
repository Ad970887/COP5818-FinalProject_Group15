// API routes
const express = require('express');
const router = express.Router();
const { logTransaction, getTransactions } = require('../controllers/transactions');

// POST /api/transactions - Log a new transaction
router.post('/', logTransaction);

// GET /api/transactions - Fetch all transactions
router.get('/', getTransactions);

module.exports = router;