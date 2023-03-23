import {
  accountMock,
  encryptedPrivateKeyMock,
  passwordMock,
  setAccountsMock,
  web3InstanceMock,
} from "./mocks";
import {
  checkForLocalStorageWallets,
  createAccount,
  encryptPrivateKey,
  storeAccountInLocalStorage,
} from "./utils";

afterEach(() => localStorage.clear());

test("should test the encryptPrivateKey function", () => {
  expect(
    encryptPrivateKey(web3InstanceMock, accountMock, passwordMock)
  ).toStrictEqual({
    ...accountMock,
    privateKey: encryptedPrivateKeyMock,
  });
});

test("should test storeAccountInLocalStorage function", () => {
  storeAccountInLocalStorage(accountMock);
  const storedAcounts = JSON.parse(localStorage.getItem("storedAccounts"));
  expect(storedAcounts.length).toBe(1);
  expect(storedAcounts[0].address).toBe(accountMock.address);
});

test("should test createAccount function", () => {
  createAccount(web3InstanceMock, passwordMock, setAccountsMock);
  expect(setAccountsMock).toHaveBeenCalledTimes(1);
});

test("should test checkForLocalStorageWallets function", () => {
  localStorage.setItem(
    "storedAccounts",
    JSON.stringify({ accounts: [accountMock] })
  );
  checkForLocalStorageWallets(setAccountsMock);
  expect(setAccountsMock).toHaveBeenCalledTimes(1);
});

test("should test checkForLocalStorageWallets function when there's no accounts in local storage", () => {
  checkForLocalStorageWallets(setAccountsMock);
  expect(setAccountsMock).not.toHaveBeenCalled();
});
