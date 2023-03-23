import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

afterEach(() => localStorage.clear());

test("renders App title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Simple Wallet Keeper Binance/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders password label", () => {
  render(<App />);
  const inputLabelElement = screen.getByText(/Password:/i);
  expect(inputLabelElement).toBeInTheDocument();
});

test("renders create wallet button", () => {
  render(<App />);
  const createButtonElement = screen.getByText(/Create Wallet/i);
  expect(createButtonElement).toBeInTheDocument();
});

test("should create a wallet without a password and show to the user", async () => {
  render(<App />);
  const createButtonElement = screen.getByText(/Create Wallet/i);

  fireEvent.click(createButtonElement);

  const refreshButton = await screen.findByText("Refresh");
  expect(refreshButton).toBeInTheDocument();
});

test("should create a wallet with a click and a password and show to the user", async () => {
  render(<App />);
  const createButtonElement = screen.getByText(/Create Wallet/i);
  const walletPasswordInput = screen.getByLabelText("wallet-password");

  fireEvent.change(walletPasswordInput, { target: { value: "password" } });

  fireEvent.click(createButtonElement);

  const decryptButton = await screen.findByText("Decrypt Private Key");
  expect(decryptButton).toBeInTheDocument();
});

test("should create a wallet without a password with the enter key and show to the user", async () => {
  render(<App />);
  const walletPasswordInput = screen.getByLabelText("wallet-password");

  fireEvent.focus(walletPasswordInput);
  fireEvent.keyDown(walletPasswordInput, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  const refreshButton = await screen.findByText("Refresh");
  expect(refreshButton).toBeInTheDocument();
});

test("should create a wallet and decrypt the private key with a password", async () => {
  render(<App />);
  const createButtonElement = screen.getByText(/Create Wallet/i);
  const walletPasswordInput = screen.getByLabelText("wallet-password");

  fireEvent.change(walletPasswordInput, { target: { value: "password" } });

  fireEvent.click(createButtonElement);

  const decryptButton = await screen.findByText("Decrypt Private Key");
  const walletItemPasswordInput = screen.getByLabelText(
    "wallet-item-password-input"
  );

  fireEvent.change(walletItemPasswordInput, { target: { value: "password" } });
  fireEvent.click(decryptButton);

  const privateKeyText = await screen.findByText("Private Key:", {
    exact: false,
  });
  expect(privateKeyText).toBeInTheDocument();
});

test("should fail to decrypt the private key with an invalid password", async () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  render(<App />);
  const createButtonElement = screen.getByText(/Create Wallet/i);
  const walletPasswordInput = screen.getByLabelText("wallet-password");

  fireEvent.change(walletPasswordInput, { target: { value: "password" } });

  fireEvent.click(createButtonElement);

  const decryptButton = await screen.findByText("Decrypt Private Key");
  const walletItemPasswordInput = screen.getByLabelText(
    "wallet-item-password-input"
  );

  fireEvent.change(walletItemPasswordInput, { target: { value: "wrong" } });
  fireEvent.click(decryptButton);

  const invalidPasswordText = await screen.findByText("Invalid Password");
  expect(invalidPasswordText).toBeInTheDocument();
});
