'use strict';

const seed = [{
        address: "0x742d35Cc6634C0532925a3b8D4C9B7c6d5e1f2a3",
        blockchain: "ethereum",
        network: "mainnet",
        label: "Treasury Wallet A",
        balance: 2.5,
        createdAt: "2024-01-15T00:00:00Z",
        internalId: "wlt_eth_001",
        riskScore: 12,
        tags: ["treasury", "high-value"]
    },
    {
        address: "0xAbCDefabcdefABCDefabcdefAbcdefABCDEFabcd",
        blockchain: "ethereum",
        network: "testnet",
        label: "Dev Wallet",
        balance: 10.0,
        createdAt: "2024-06-01T00:00:00Z",
        internalId: "wlt_eth_002",
        riskScore: 5,
        tags: ["dev"]
    },
    {
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        blockchain: "bitcoin",
        network: "mainnet",
        label: "Cold Storage BTC",
        balance: 1.2,
        createdAt: "2023-11-05T00:00:00Z",
        internalId: "wlt_btc_001",
        riskScore: 20,
        tags: ["cold", "long-term"]
    },
    {
        address: "mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn",
        blockchain: "bitcoin",
        network: "testnet",
        label: "BTC Test Wallet",
        balance: 0.005,
        createdAt: "2025-02-10T00:00:00Z",
        internalId: "wlt_btc_002",
        riskScore: 7,
        tags: ["test"]
    },
    {
        address: "5eykt4UsFv8P8NJdTREpY1vz6gW4fR5rXB",
        blockchain: "solana",
        network: "mainnet",
        label: "Solana Hot Wallet",
        balance: 200,
        createdAt: "2024-09-20T00:00:00Z",
        internalId: "wlt_sol_001",
        riskScore: 30,
        tags: ["hot", "exchange"]
    }
];

module.exports = {
    seed,
};