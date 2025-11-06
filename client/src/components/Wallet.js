import React, { useEffect, useState } from 'react';
import { connectWallet, getBalance } from '../services/wallet';

function Wallet() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        async function init() {
            const addr = await connectWallet();
            setAddress(addr);
            const bal = await getBalance(addr);
            setBalance(bal);
        }
        init();
    }, []);

    return (
        <div>
            <p>Wallet: {address}</p>
            <p>Balance: {balance} ETH</p>
        </div>
    );
}

export default Wallet;