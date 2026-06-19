# Wallet Service

This repository contains an in-memory wallet service for `vaultody-livecoding`.

## Running the service

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

## Running tests

A simple Node-based test script is included.

Run tests with:

```bash
npm test
```

The test script validates:

- case-insensitive wallet lookup by address
- `getAllWallets()` returns all seeded wallets
- internal wallet map sizing matches seed count
- `calculateBalanceUsd()` returns expected USD values
- invalid wallet lookup and null inputs return safe defaults
