import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TransactionProvider } from "./context/TransactionContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>
);
