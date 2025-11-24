import { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';

export default function TransactionFeed(){
  const [txs,setTxs]=useState([]);

  useEffect(()=>{load();},[]);

  async function load(){
    setTxs(await getTransactions());
  }

  return (
    <div>
      <h2>Transaction Feed</h2>
      <ul>
        {txs.map(t=>(
          <li key={t._id}>
            {t.sender} sent {t.amount} tokens to {t.recipient} at {new Date(t.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
