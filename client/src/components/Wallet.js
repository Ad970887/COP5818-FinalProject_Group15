import { useState } from 'react';
import { createUser, getUsers } from '../services/api';

export default function Wallet() {
  const [email,setEmail]=useState("");
  const [balance,setBalance]=useState(null);

  async function loadBalance(){
    const users=await getUsers();
    const u=users.find(x=>x.email===email);
    setBalance(u?u.balance:"Not found");
  }

  async function create(){
    await createUser(email);
    alert("Wallet created!");
  }

  return (
    <div>
      <h2>Wallet</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={create}>Create Wallet</button>
      <button onClick={loadBalance}>Check Balance</button>
      {balance!==null && <p>Balance: {balance} tokens</p>}
    </div>
  );
}
