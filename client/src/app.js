import React from 'react';
import Wallet from './components/Wallet';
import SendForm from './components/SendForm';
import TransactionFeed from './components/TransactionFeed';

function App() {
    return (
        <div>
            <h1>Payvo</h1>
            <Wallet />
            <SendForm />
            <TransactionFeed />
        </div>
    );
}

export default App;
