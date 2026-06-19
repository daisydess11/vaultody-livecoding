'use strict';

const {
  EXCHANGE_RATES
} = require('./exchangeRates');

const {
  seed
} = require('./seedWallets');



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
  wallets,
  getWalletByAddress,
  getAllWallets,
  calculateBalanceUsd
};