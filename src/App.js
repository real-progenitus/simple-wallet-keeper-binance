import { useEffect, useState } from "react";
import Web3 from "web3";
import { checkForLocalStorageWallets, createAccount } from "./utils";
import "./App.css";
import WalletItem from "./components/wallet-item";

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

function App() {
  const [accounts, setAccounts] = useState([]);
  const [walletPassword, setWalletPassword] = useState("");

  useEffect(() => {
    checkForLocalStorageWallets(setAccounts);
  }, []);

  return (
    <div className="App">
      <p>Simple Wallet Keeper Binance</p>
      <span>Password: &nbsp;</span>
      <input
        type="password"
        aria-label="wallet-password"
        placeholder="Password"
        onChange={(e) => setWalletPassword(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && createAccount(web3, walletPassword, setAccounts)
        }
        value={walletPassword.current}
      />
      <button onClick={() => createAccount(web3, walletPassword, setAccounts)}>
        Create Wallet
      </button>
      <div>
        {accounts.map((acc) => (
          <WalletItem key={acc.address} account={acc} web3={web3} />
        ))}
      </div>
    </div>
  );
}

export default App;
