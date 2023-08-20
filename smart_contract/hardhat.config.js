require("@nomicfoundation/hardhat-toolbox");

// From Alchemy website
const API_KEY = import.meta.env.ALCHEMY_ID;
// Account's private key
const PRIVATE_KEY = import.meta.env.ACCOUNT_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
