import React from "react";
import Navbar from "./components/Navbar";
import LockDashboard from "./components/LockDashboard";
import { useEthereum } from "./hooks/useEthereum";

const App = () => {
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

  return (
    <div>
      {/* Navbar shows account + live balance */}
      <Navbar account={account} balance={balance} connectWallet={connectWallet} />

      {/* Lock Dashboard */}
      <LockDashboard
        account={account}
        balance={balance}
        contractBalance={contractBalance}
        deposit={deposit}
        withdraw={withdraw}
        loading={loading}
        error={error}
        txHash={txHash}
      />
    </div>
  );
};

export default App;