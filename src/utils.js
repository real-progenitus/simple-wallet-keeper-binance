export function encryptPrivateKey(web3, account, walletPassword) {
  const encryptedStorageUnit = {
    ...account,
    privateKey: web3.eth.accounts.encrypt(account.privateKey, walletPassword),
  };

  return encryptedStorageUnit;
}

export function storeAccountInLocalStorage(account) {
  const storedAccounts = JSON.parse(localStorage.getItem("storedAccounts"));
  const newAccounts = storedAccounts ? [...storedAccounts, account] : [account];
  localStorage.setItem("storedAccounts", JSON.stringify(newAccounts));
}

export function createAccount(web3, walletPassword, setAccounts) {
  const account = web3.eth.accounts.create();
  const encryptedAccount = encryptPrivateKey(web3, account, walletPassword);
  storeAccountInLocalStorage(encryptedAccount);
  setAccounts((currentAccounts) => [...currentAccounts, encryptedAccount]);
}

export function checkForLocalStorageWallets(setAccounts) {
  const storedAcounts = JSON.parse(localStorage.getItem("storedAccounts"));
  if (storedAcounts) setAccounts(storedAcounts);
}
