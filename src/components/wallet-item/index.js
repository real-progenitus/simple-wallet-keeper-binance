import { useEffect, useState } from "react";
import { decryptPassword, getBalance } from "./utils";
import { WalletItemContainer } from "./styled-components";

const WalletItem = ({ account, web3 }) => {
  const [password, setPassword] = useState("");
  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance(web3, account, setBalance);
  }, [web3, account, setBalance]);

  function decryptHook() {
    decryptPassword(
      web3,
      account,
      password,
      invalidPassword,
      setDecryptedPrivateKey,
      setInvalidPassword
    );
  }

  return (
    <WalletItemContainer>
      <p>
        {account.address} - Balance: {balance} wei &nbsp;
        <button onClick={() => getBalance(web3, account, setBalance)}>
          Refresh
        </button>
      </p>
      {decryptedPrivateKey && <p>Private Key: {decryptedPrivateKey}</p>}
      {invalidPassword && !decryptedPrivateKey && <p>Invalid Password</p>}
      <div>
        <span>Password: &nbsp;</span>
        <input
          type="password"
          aria-label="wallet-item-password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && decryptHook()}
        />
        <button onClick={decryptHook}>Decrypt Private Key</button>
      </div>
    </WalletItemContainer>
  );
};

export default WalletItem;
