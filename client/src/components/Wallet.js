import React, { useEffect, useState } from 'react';
import { connectWallet, getBalance } from '../services/wallet';

function Wallet() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        async function init() {
            try {
                const addr = await connectWallet();
                setAddress(addr);
                const bal = await getBalance(addr);
                setBalance(bal);
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        }
        init();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Your Wallet</h2>
            <p><strong>Address:</strong> {address || 'Not connected'}</p>
            <p><strong>Balance:</strong> {balance ? `${balance} ETH` : 'Loading...'}</p>
        </div>
    );
}

const styles = {
    container: {
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
    }
};

export default Wallet;