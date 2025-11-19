import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

function TransactionFeed() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function load() {
            try {
                const txs = await fetchTransactions();
                setTransactions(txs);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        }
        load();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul style={styles.list}>
                    {transactions.map(tx => (
                        <li key={tx._id} style={styles.item}>
                            {tx.amount} sent to {tx.recipient}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    },
    list: {
        listStyleType: 'none',
        padding: 0
    },
    item: {
        padding: '5px 0',
        borderBottom: '1px solid #eee'
    }
};

export default TransactionFeed;