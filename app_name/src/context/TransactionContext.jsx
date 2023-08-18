import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  // Make this function async and make the signer await to remove unsupported operation error
  const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum); // read only
    const signer = await provider.getSigner(); // Write ability
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return transactionContract;
  };

  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(() => {
    return parseInt(localStorage.getItem("transactionCount")) || 0;
  });
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      // Must be await, if not, getAllTransactions() will try to run and it wont find it because the contract data won't be loaded up yet
      const transactionContract = await getEthereumContract();

      const availableTransactions =
        await transactionContract.getAllTransactions();
      // Previously: timestamp.toNumber() would fail due to being the input being too big of a number (10,00,000,000,000,000n) > 900,719,925,470,991(MAX_SAFE_INTEGER)
      // Previously: amount._hex. Will faill due to ethers v6 vs. v5
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: (new Date(Number(transaction.timestamp) * 1000)).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: (parseInt(transaction.amount)) / 10 ** 18,
        })
      );
      // Previously: structuredTransactions(structuredTransctions), wrong
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_accounts"
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      // Previously newTransactionCount, incorrect name of state.
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) { }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("Failed to connect to MetaMask.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const transactionContract = await getEthereumContract();
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount.toString(16),
          },
        ],
      });
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      // transactionCount comes in as bigInt, convert to int
      setTransactionCount(Number(transactionCount));
      // No window.reload() method
      location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("Failed to send the transaction.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
