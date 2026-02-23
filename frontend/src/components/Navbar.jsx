import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ account, balance, connectWallet }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const shortenAddress = (addr) => addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : "";

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🔐 Lock DApp</div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
        <li>Home</li>
        <li>Dashboard</li>

        {!account ? (
          <li className={styles.walletBox}>
            <button onClick={connectWallet}>Connect Wallet</button>
          </li>
        ) : (
          <li className={styles.walletBox}>
            <span>{shortenAddress(account)}</span>
            <span>{parseFloat(balance).toFixed(4)} ETH</span>
            <a href={`https://sepolia.etherscan.io/address/${account}`} target="_blank" rel="noreferrer">
              View
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;