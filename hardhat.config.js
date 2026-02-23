require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { sepolia_url, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: sepolia_url,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};