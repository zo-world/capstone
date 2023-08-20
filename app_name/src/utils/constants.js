import abi from "./Transactions.json";

//Make sure to get Transactions.json from smart_contract > artifacts > contracts > Transactions.json
export const contractABI = abi.abi;

// In terminal: npx hardhat run scripts/deploy.js --network sepolia. This is the deployed address of our contract
export const contractAddress = "0x3973177CCe3d532f1dF41e33521220520B2f6709";
