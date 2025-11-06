// API routes
const express = require('express');
const router = express.Router();
const { logTransaction, getTransactions } = require('../controllers/transactions');

router.post('/', logTransaction);
router.get('/', getTransactions);

module.exports = router;