import { ethers } from 'ethers';

// Example USDC contract address and ABI
const USDC_ADDRESS = '0x...'; // Replace with actual token address
const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)"
];

export async function sendStablecoin(recipient, amount) {
    if (!window.ethereum) {
        throw new Error('MetaMask not detected');
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);

        // USDC uses 6 decimals
        const parsedAmount = ethers.utils.parseUnits(amount, 6);

        const tx = await contract.transfer(recipient, parsedAmount);
        console.log('Transaction sent:', tx.hash);

        await tx.wait();
        console.log('Transaction confirmed:', tx.hash);
        return tx.hash;
    } catch (error) {
        console.error('Error sending stablecoin:', error);
        throw error;
    }
}