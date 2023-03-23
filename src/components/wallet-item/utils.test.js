import {
  accountMock,
  decryptedPrivateKeyMock,
  invalidPasswordMock,
  passwordMock,
  setBalanceMock,
  setDecryptedPrivateKeyMock,
  setInvalidPasswordMock,
  web3InstanceMock,
} from "../../mocks";
import { decryptPassword, getBalance } from "./utils";

test("should test the decryptPassword function", () => {
  decryptPassword(
    web3InstanceMock,
    accountMock,
    passwordMock,
    invalidPasswordMock,
    setDecryptedPrivateKeyMock,
    setInvalidPasswordMock
  );
  expect(setDecryptedPrivateKeyMock).toHaveBeenCalledWith(
    decryptedPrivateKeyMock
  );
  expect(setInvalidPasswordMock).not.toHaveBeenCalled();
});

test("should test the decryptPassword function with success but after an invalid try before", () => {
  decryptPassword(
    web3InstanceMock,
    accountMock,
    passwordMock,
    true,
    setDecryptedPrivateKeyMock,
    setInvalidPasswordMock
  );
  expect(setDecryptedPrivateKeyMock).toHaveBeenCalledWith(
    decryptedPrivateKeyMock
  );
  expect(setInvalidPasswordMock).toHaveBeenCalledWith(false);
});

test("should test the decryptPassword function with an invalid password", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  decryptPassword(
    web3InstanceMock,
    accountMock,
    "wrong",
    invalidPasswordMock,
    setDecryptedPrivateKeyMock,
    setInvalidPasswordMock
  );
  expect(setDecryptedPrivateKeyMock).not.toHaveBeenCalled();
  expect(setInvalidPasswordMock).toHaveBeenCalledWith(true);
});

test("should test the getBalance function", async () => {
  await getBalance(web3InstanceMock, accountMock, setBalanceMock);
  expect(setBalanceMock).toHaveBeenCalledWith(1000);
});
