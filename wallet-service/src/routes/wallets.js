'use strict';

const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
    getAllWallets,
    getWalletByAddress,
    calculateBalanceUsd
} = require('../store/wallets');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(getAllWallets());
});

router.get('/:address/details', authMiddleware, (req, res) => {
    const wallet = getWalletByAddress(req.params.address);

    if (!wallet) {
        return res.status(404).json({
            error: 'Wallet not found'
        });
    }

    res.json({
        wallet,
        usdBalance: calculateBalanceUsd(wallet)
    });
});

router.get('/:address', (req, res) => {
    const wallet = getWalletByAddress(req.params.address);

    if (!wallet) {
        return res.status(404).json({
            error: 'Wallet not found'
        });
    }

    res.json(wallet);
});

module.exports = router;