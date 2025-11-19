// Backend API calls
export async function fetchTransactions() {
    try {
        const res = await fetch('/api/transactions');
        if (!res.ok) {
            throw new Error(`Failed to fetch transactions: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}