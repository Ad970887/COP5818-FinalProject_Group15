// Backend API calls
export async function fetchTransactions() {
    const res = await fetch('/api/transactions');
    return res.json();
}