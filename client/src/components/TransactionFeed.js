import { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';

export default function TransactionFeed(){
  const [txs,setTxs]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{load();},[]);

  async function load(){
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions();
      if (Array.isArray(data)) {
        setTxs(data);
      } else if (data && data.error) {
        setError(data.error);
        setTxs([]);
      } else {
        setTxs([]);
      }
    } catch (err) {
      setError("Failed to load transactions");
      setTxs([]);
    } finally {
      setLoading(false);
    }
  }

  const getCoinEmoji = (coin) => {
    switch(coin) {
      case 'USDC': return '🔵';
      case 'USDT': return '🟢';
      case 'DAI': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <div>
      <h2>Transaction Feed</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {txs.length === 0 && !loading && <p>No transactions yet</p>}
      <ul>
        {txs.map(t=>(
          <li key={t._id} style={{margin: '8px 0', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px'}}>
            {t.sender} sent {t.amount} {getCoinEmoji(t.stablecoin)} {t.stablecoin} to {t.recipient}
            <br/>
            <small style={{color: '#666'}}>{new Date(t.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
