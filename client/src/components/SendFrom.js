import React, { useState } from 'react';
import { sendStablecoin } from '../services/stablecoin';

function SendForm() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleSend = async () => {
        await sendStablecoin(recipient, amount);
        alert('Transaction sent!');
    };

    return (
        <div>
            <input placeholder="Recipient Address" onChange={e => setRecipient(e.target.value)} />
            <input placeholder="Amount" type="number" onChange={e => setAmount(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default SendForm;