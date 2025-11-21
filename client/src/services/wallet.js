import { BrowserProvider, formatEther } from 'ethers';

export async function connectWallet() {
    if (!window.ethereum) {
        throw new Error('MetaMask not found');
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
}

export async function getBalance(address) {
    if (!window.ethereum) {
        throw new Error('MetaMask not found');
    }

    try {
        const provider = new BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        return formatEther(balance);
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}