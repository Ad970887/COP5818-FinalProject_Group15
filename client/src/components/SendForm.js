import React, { useState } from 'react';
import { sendStablecoin } from '../services/stablecoin';

function SendForm() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleSend = async () => {
        if (!recipient || !amount) {
            alert('Please enter recipient and amount.');
            return;
        }
        try {
            await sendStablecoin(recipient, amount);
            alert('Transaction sent!');
            setRecipient('');
            setAmount('');
        } catch (error) {
            console.error('Error sending transaction:', error);
            alert('Failed to send transaction.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Send Stablecoin</h2>
            <input
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={styles.input}
            />
            <input
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSend} style={styles.button}>Send</button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
    },
    input: {
        padding: '8px',
        fontSize: '16px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default SendForm;
