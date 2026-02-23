import { ethers } from "ethers";
import LockABI from "../abis/Lock.json";

const CONTRACT_ADDRESS = "0x8869F06d5525cfe8C8F04f4c0599297902581939";

// Get provider
export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  return new ethers.providers.Web3Provider(window.ethereum);
};

// Get signer
export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};

// Get contract instance
export const getLockContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    LockABI.abi,   // important: use .abi
    signer
  );
};

// Get user's locked amount
export const getLockedAmount = async () => {
  const contract = await getLockContract();
  const amount = await contract.lockedAmount();
  return ethers.utils.formatEther(amount);
};

// Deposit ETH
export const depositETH = async (amount) => {
  const contract = await getLockContract();

  const tx = await contract.deposit({
    value: ethers.utils.parseEther(amount),
  });

  await tx.wait();
  return tx.hash;
};

// Withdraw ETH
export const withdrawETH = async (amount) => {
  const contract = await getLockContract();

  const tx = await contract.withdraw(
    ethers.utils.parseEther(amount)
  );

  await tx.wait();
  return tx.hash;
};