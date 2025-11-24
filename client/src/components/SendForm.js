import { useState } from 'react';
import { sendToken } from '../services/api';

export default function SendForm(){
  const [sender,setSender]=useState("");
  const [recipient,setRecipient]=useState("");
  const [amount,setAmount]=useState("");

  async function send(){
    const res=await sendToken(sender,recipient,Number(amount));
    if(res.error) alert(res.error);
    else alert("Token sent!");
  }

  return (
    <div>
      <h2>Send Tokens</h2>
      <input placeholder="Sender Email" value={sender} onChange={e=>setSender(e.target.value)} />
      <input placeholder="Recipient Email" value={recipient} onChange={e=>setRecipient(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
