// Token transfer logic
import { ethers } from 'ethers';

// Example USDC contract address and ABI
const USDC_ADDRESS = '0x...'; // Replace with actual token address
const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)"
];

export async function sendStablecoin(recipient, amount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
    const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 6)); // USDC has 6 decimals
    await tx.wait();
    console.log('Transaction confirmed:', tx.hash);
}