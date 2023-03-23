export function decryptPassword(
  web3,
  account,
  password,
  invalidPassword,
  setDecryptedPrivateKey,
  setInvalidPassword
) {
  try {
    const decryptedAccount = web3.eth.accounts.decrypt(
      account.privateKey,
      password
    );
    setDecryptedPrivateKey(decryptedAccount.privateKey);
    if (invalidPassword) setInvalidPassword(false);
  } catch (e) {
    setInvalidPassword(true);
    console.log(e);
  }
}

export async function getBalance(web3, account, setBalance) {
  const balanceInWei = await web3.eth.getBalance(account.address);
  setBalance(balanceInWei);
}
