import React from 'react';
import Wallet from './components/Wallet';
import BuyStablecoin from './components/BuyStablecoin';
import SendForm from './components/SendForm';
import TransactionFeed from './components/TransactionFeed';
import './index.css';

function App() {
    return (
        <div className="app">
            <div className="container">
                <div className="left-col">
                    <div className="header">
                        <h1>Payvo</h1>
                    </div>
                    <div className="card">
                        <Wallet />
                    </div>
                    <div className="card">
                        <BuyStablecoin />
                    </div>
                    <div className="card">
                        <SendForm />
                    </div>
                </div>
                <div className="right-col">
                    <div className="card">
                        <TransactionFeed />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;