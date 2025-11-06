import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

function TransactionFeed() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function load() {
            const txs = await fetchTransactions();
            setTransactions(txs);
        }
        load();
    }, []);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map(tx => (
                    <li key={tx._id}>{tx.amount} sent to {tx.recipient}</li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionFeed;