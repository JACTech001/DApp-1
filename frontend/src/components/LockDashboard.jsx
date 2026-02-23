import React, { useState } from "react";
import styles from "../styles/LockDashboard.module.css";
import { useEthereum } from "../hooks/useEthereum";

const LockDashboard = () => {
  const {
    account,
    balance,
    contractBalance,
    connectWallet,
    deposit,
    withdraw,
    loading,
    error,
    txHash,
  } = useEthereum();

  const [amount, setAmount] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>
        <h2 className={styles.title}>🔐  Lock Dashboard</h2>

        {!account ? (
          <button className={styles.connect} onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <>
            <div className={styles.card}>
              <p className={styles.label}>Wallet Balance</p>
              <p className={styles.balance}>{parseFloat(balance).toFixed(4)} ETH</p>
            </div>

            <div className={styles.card}>
              <p className={styles.label}>Contract Balance</p>
              <p className={styles.balance}>{parseFloat(contractBalance).toFixed(4)} ETH</p>
            </div>

            <input
              className={styles.input}
              type="number"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className={styles.buttons}>
              <button onClick={() => deposit(amount)} disabled={loading}>Deposit</button>
              <button onClick={() => withdraw(amount)} disabled={loading}>Withdraw</button>
            </div>

           {txHash && (
            <div className={styles.txSuccess}>
              <div className={styles.txIcon}>✓</div>
              <div className={styles.txContent}>
                <span>Transaction Successful</span>
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {txHash.slice(0, 10)}...{txHash.slice(-6)}
                </a>
              </div>
            </div>
          )}

            {loading && <p className={styles.loading}>Processing transaction...</p>}
            {error && <p className={styles.error}>{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default LockDashboard;