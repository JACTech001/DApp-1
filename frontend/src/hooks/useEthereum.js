import { useState, useEffect } from "react";
import { ethers } from "ethers";
import LockABI from "../abis/Lock.json";

const CONTRACT_ADDRESS = "0x8869F06d5525cfe8C8F04f4c0599297902581939";

export const useEthereum = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0.0");
  const [contractBalance, setContractBalance] = useState("0.0");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  useEffect(() => {
    if (!window.ethereum) return;

    const init = async () => {
      try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);

        const accounts = await _provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const signer = _provider.getSigner();
          const lockContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            LockABI.abi,
            signer
          );
          setContract(lockContract);

          const walletBal = await _provider.getBalance(accounts[0]);
          setBalance(ethers.utils.formatEther(walletBal));

          // ✅ FIXED HERE
          const cBal = await lockContract.getMyBalance();
          setContractBalance(ethers.utils.formatEther(cBal));
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask!");
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(_provider);

      const accounts = await _provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const signer = _provider.getSigner();
        const lockContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          LockABI.abi,
          signer
        );
        setContract(lockContract);

        const walletBal = await _provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(walletBal));

        // ✅ FIXED HERE
        const cBal = await lockContract.getMyBalance();
        setContractBalance(ethers.utils.formatEther(cBal));
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const refreshBalances = async () => {
    try {
      if (!provider || !contract || !account) return;

      const walletBal = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(walletBal));

      // ✅ FIXED HERE
      const cBal = await contract.getMyBalance();
      setContractBalance(ethers.utils.formatEther(cBal));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const deposit = async (amountEth) => {
    if (!contract) return setError("Contract not connected");
    if (!amountEth || Number(amountEth) <= 0)
      return setError("Enter a valid amount");

    setLoading(true);
    setError(null);

    try {
      const tx = await contract.deposit({
        value: ethers.utils.parseEther(amountEth),
      });

      await tx.wait();
      setTxHash(tx.hash);
      await refreshBalances();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (amountEth) => {
    if (!contract) return setError("Contract not connected");
    if (!amountEth || Number(amountEth) <= 0)
      return setError("Enter a valid amount");

    setLoading(true);
    setError(null);

    try {
      const tx = await contract.withdraw(
        ethers.utils.parseEther(amountEth)
      );

      await tx.wait();
      setTxHash(tx.hash);
      await refreshBalances();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    account,
    balance,
    contractBalance,
    connectWallet,
    deposit,
    withdraw,
    loading,
    error,
    txHash,
  };
};