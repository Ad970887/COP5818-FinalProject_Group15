import { useState } from 'react';
import { buyStablecoin } from '../services/api';

export default function BuyStablecoin(){
  const [email,setEmail]=useState("");
  const [usdAmount,setUsdAmount]=useState("");
  const [stablecoin,setStablecoin]=useState("USDC");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function buy(){
    try {
      setLoading(true);
      setError("");
      const numAmount = Number(usdAmount);
      if (!Number.isFinite(numAmount) || numAmount <= 0) {
        setError("Amount must be a positive number");
        return;
      }
      const res=await buyStablecoin(email,numAmount,stablecoin);
      if(res.error) {
        setError(res.error);
      } else {
        alert(`Successfully bought ${numAmount} ${stablecoin}!`);
        setEmail("");
        setUsdAmount("");
        setStablecoin("USDC");
      }
    } catch (err) {
      setError("Error buying stablecoins");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Buy Stablecoins</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="number" placeholder="USD Amount" value={usdAmount} onChange={e=>setUsdAmount(e.target.value)} />
      <label>
        <strong>Stablecoin:</strong>
        <select value={stablecoin} onChange={e=>setStablecoin(e.target.value)} style={{width: '100%', padding: '8px', marginTop: '4px'}}>
          <option value="USDC">🔵 USDC (USD Coin)</option>
          <option value="USDT">🟢 USDT (Tether)</option>
          <option value="DAI">🟡 DAI (Decentralized)</option>
        </select>
      </label>
      <button onClick={buy} disabled={loading}>Buy {stablecoin}</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
