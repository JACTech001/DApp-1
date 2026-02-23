const hre = require("hardhat");

async function main() {
  const lockAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // deployed address

  // Get contract instance
  const lock = await hre.ethers.getContractAt("Lock", lockAddress);

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Initial locked amount
  let lockedAmount = await lock.lockedAmount();
  console.log("Initial locked amount:", hre.ethers.utils.formatEther(lockedAmount), "ETH");

  // Deposit 0.5 ETH
  const depositTx = await lock.deposit({ value: hre.ethers.utils.parseEther("0.0005") });
  await depositTx.wait();
  console.log("Deposited 0.0005 ETH");

  lockedAmount = await lock.lockedAmount();
  console.log("Updated locked amount:", hre.ethers.utils.formatEther(lockedAmount), "ETH");

  // Withdraw 0.5 ETH
    const withdrawTx = await lock.withdraw(
    hre.ethers.utils.parseEther("0.0005")
    );
    await withdrawTx.wait();
    console.log("Withdrew 0.0005 ETH");

  // Final locked amount
  lockedAmount = await lock.lockedAmount();
  console.log("Final locked amount:", hre.ethers.utils.formatEther(lockedAmount), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
