'use strict';

const EXCHANGE_RATES = {
  ethereum: 3200,   // 1 ETH = $3200
  bitcoin:  62000,  // 1 BTC = $62000
  solana:   145,    // 1 SOL = $145
};

// Seed wallet records (mixed-case addresses). Keys in the internal Map are lowercased.
const seed = [
  {
    address:    "0x742d35Cc6634C0532925a3b8D4C9B7c6d5e1f2a3",
    blockchain: "ethereum",
    network:    "mainnet",
    label:      "Treasury Wallet A",
    balance:    2.5,
    createdAt:  "2024-01-15T00:00:00Z",
    internalId: "wlt_eth_001",
    riskScore:  12,
    tags:       ["treasury", "high-value"]
  },
  {
    address:    "0xAbCDefabcdefABCDefabcdefAbcdefABCDEFabcd",
    blockchain: "ethereum",
    network:    "testnet",
    label:      "Dev Wallet",
    balance:    10.0,
    createdAt:  "2024-06-01T00:00:00Z",
    internalId: "wlt_eth_002",
    riskScore:  5,
    tags:       ["dev"]
  },
  {
    address:    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    blockchain: "bitcoin",
    network:    "mainnet",
    label:      "Cold Storage BTC",
    balance:    1.2,
    createdAt:  "2023-11-05T00:00:00Z",
    internalId: "wlt_btc_001",
    riskScore:  20,
    tags:       ["cold", "long-term"]
  },
  {
    address:    "mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn",
    blockchain: "bitcoin",
    network:    "testnet",
    label:      "BTC Test Wallet",
    balance:    0.005,
    createdAt:  "2025-02-10T00:00:00Z",
    internalId: "wlt_btc_002",
    riskScore:  7,
    tags:       ["test"]
  },
  {
    address:    "5eykt4UsFv8P8NJdTREpY1vz6gW4fR5rXB",
    blockchain: "solana",
    network:    "mainnet",
    label:      "Solana Hot Wallet",
    balance:    200,
    createdAt:  "2024-09-20T00:00:00Z",
    internalId: "wlt_sol_001",
    riskScore:  30,
    tags:       ["hot", "exchange"]
  }
];

// Build Map with lowercase keys for case-insensitive lookup
const wallets = new Map();
for (const w of seed) {
  wallets.set(w.address.toLowerCase(), w);
}

function getWalletByAddress(address) {
  if (!address) return null;
  return wallets.get(address.toLowerCase()) || null;
}

function getAllWallets() {
  return Array.from(wallets.values());
}

function calculateBalanceUsd(wallet) {
  if (!wallet || !wallet.blockchain || typeof wallet.balance !== 'number') return 0;
  const rate = EXCHANGE_RATES[wallet.blockchain.toLowerCase()] || 0;
  const usd = wallet.balance * rate;
  return parseFloat(usd.toFixed(2));
}

module.exports = {
  EXCHANGE_RATES,
  wallets,
  getWalletByAddress,
  getAllWallets,
  calculateBalanceUsd
};
