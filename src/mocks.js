export const decryptedPrivateKeyMock =
  "0x3f638a0e333f0881e3aebe17c5bae23ccdac7a83a63a62ec968d7a86c2129de8";

export const encryptedPrivateKeyMock = "random_eletronic_signature";

export const accountMock = {
  address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
  privateKey:
    "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
  signTransaction: () => {},
  sign: () => {},
  encrypt: () => {},
};

export const web3InstanceMock = {
  eth: {
    accounts: {
      encrypt: (_privateKey, _password) => encryptedPrivateKeyMock,
      create: () => accountMock,
      decrypt: (_privateKey, password) => {
        if (password !== "wrong")
          return {
            ...accountMock,
            privateKey: decryptedPrivateKeyMock,
          };
        throw new Error("Invalid Password");
      },
    },
    getBalance: (_address) => Promise.resolve(1000),
  },
};

export const passwordMock = "password";

export const invalidPasswordMock = false;

export const setAccountsMock = jest.fn();

export const setDecryptedPrivateKeyMock = jest.fn();

export const setInvalidPasswordMock = jest.fn();

export const setBalanceMock = jest.fn();
