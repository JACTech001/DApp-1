const hre = require("hardhat");

async function main() {
  const Lock = await hre.ethers.getContractFactory("Lock");

  const lock = await Lock.deploy(); // no ETH sent

  await lock.deployed();

  console.log("Contract deployed to:", lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});