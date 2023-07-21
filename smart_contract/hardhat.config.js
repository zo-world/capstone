require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/f3PAMvvdCdka3jp7tLoMn6-dKsGR4U64",
      accounts: [
        "4ba71667deec059e397744f0ab6b0acd4a5c0c083f03ea08dbc6e6d2b40bf59f",
      ],
    },
  },
};
