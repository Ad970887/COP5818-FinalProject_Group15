import { useState } from 'react';
import { createUser, getUsers } from '../services/api';

export default function Wallet() {
  const [email,setEmail]=useState("");
  const [user,setUser]=useState(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function loadBalance(){
    try {
      setLoading(true);
      setError("");
      const users=await getUsers();
      if (Array.isArray(users)) {
        const u=users.find(x=>x.email===email);
        if (u) {
          setUser(u);
        } else {
          setError("User not found");
          setUser(null);
        }
      } else {
        setError("Failed to fetch users");
        setUser(null);
      }
    } catch (err) {
      setError("Error fetching balance");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function create(){
    try {
      setLoading(true);
      setError("");
      const newUser = await createUser(email);
      if (newUser.error) {
        // Show an alert for duplicate wallet creation
        const msg = newUser.error || 'Failed to create wallet';
        if (/exist/i.test(msg) || /duplicate/i.test(msg)) {
          alert(msg);
        }
        setError(msg);
      } else {
        alert("Wallet created!");
        setUser(newUser);
        setEmail("");
      }
    } catch (err) {
      setError("Error creating wallet");
    } finally {
      setLoading(false);
    }
  }

  const getTotalStablecoinBalance = () => {
    if (!user || !user.stablecoins) return 0;
    return (user.stablecoins.USDC || 0) + (user.stablecoins.USDT || 0) + (user.stablecoins.DAI || 0);
  };

  return (
    <div>
      <h2>Wallet</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={create} disabled={loading}>Create Wallet</button>
      <button onClick={loadBalance} disabled={loading}>Check Balance</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {user && (
        <div>
          <p><strong>{user.email}</strong></p>
          <p>USD Balance: <strong>${user.balance}</strong></p>
          <p>Total Stablecoins: <strong>{getTotalStablecoinBalance()}</strong></p>
          <h3>Stablecoin Balances:</h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{margin: '4px 0'}}>🔵 USDC: <strong>{user.stablecoins?.USDC || 0}</strong></li>
            <li style={{margin: '4px 0'}}>🟢 USDT: <strong>{user.stablecoins?.USDT || 0}</strong></li>
            <li style={{margin: '4px 0'}}>🟡 DAI: <strong>{user.stablecoins?.DAI || 0}</strong></li>
          </ul>
        </div>
      )}
    </div>
  );
}
