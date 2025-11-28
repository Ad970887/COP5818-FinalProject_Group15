const API_URL = "http://localhost:5000";

export async function createUser(email) {
  const res = await fetch(API_URL + "/api/users", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email })
  });
  return res.json();
}

export async function getUsers() {
  const res = await fetch(API_URL + "/api/users");
  return res.json();
}

export async function buyStablecoin(email, usdAmount, stablecoin) {
  const res = await fetch(API_URL + "/api/users/buy", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, usdAmount, stablecoin })
  });
  return res.json();
}

export async function sendToken(sender, recipient, amount, stablecoin = 'USDC') {
  const res = await fetch(API_URL + "/api/transactions", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ sender, recipient, amount, stablecoin })
  });
  return res.json();
}

export async function getTransactions() {
  const res = await fetch(API_URL + "/api/transactions");
  return res.json();
}
