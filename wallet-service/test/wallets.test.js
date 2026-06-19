'use strict';

const assert = require('assert');
const {
    wallets,
    getWalletByAddress,
    getAllWallets,
    calculateBalanceUsd
} = require('../src/store/wallets');
const {
    seed
} = require('../src/store/seedWallets');

function runTests() {
    console.log('Running wallet-service tests...');

    const firstSeed = seed[0];
    const lowerCaseAddress = firstSeed.address.toLowerCase();
    const upperCaseAddress = firstSeed.address.toUpperCase();

    console.log('Test: case-insensitive address lookup');
    const foundLower = getWalletByAddress(lowerCaseAddress);
    assert(foundLower, 'Expected wallet lookup to return a result for lower-case address');
    assert.strictEqual(foundLower.internalId, firstSeed.internalId, 'Expected lower-case address lookup to return the correct wallet');

    const foundUpper = getWalletByAddress(upperCaseAddress);
    assert.strictEqual(foundUpper.internalId, firstSeed.internalId, 'Expected upper-case address lookup to be case-insensitive');
    console.log('✅ Address lookup tests passed');

    console.log('Test: invalid address handling');
    assert.strictEqual(getWalletByAddress(''), null, 'Expected empty address lookup to return null');
    assert.strictEqual(getWalletByAddress('missing'), null, 'Expected unknown address lookup to return null');
    console.log('✅ Invalid address tests passed');

    console.log('Test: getAllWallets and wallet count');
    const all = getAllWallets();
    assert(Array.isArray(all), 'Expected getAllWallets() to return an array');
    assert.strictEqual(all.length, seed.length, 'Expected getAllWallets() to return all seeded wallets');
    assert.strictEqual(wallets.size, seed.length, 'Expected internal wallet Map size to match seed count');
    console.log('✅ Wallet collection tests passed');

    console.log('Test: internal wallet map contents');
    for (const w of seed) {
        const stored = wallets.get(w.address.toLowerCase());
        assert(stored, `Expected wallet Map to contain seeded address ${w.address}`);
        assert.strictEqual(stored.internalId, w.internalId, 'Expected stored wallet internalId to match seed');
    }
    console.log('✅ Wallet map contents tests passed');

    console.log('Test: USD balance calculation');
    const expectedUsd = parseFloat((firstSeed.balance * 3200).toFixed(2));
    assert.strictEqual(calculateBalanceUsd(firstSeed), expectedUsd, 'Expected calculateBalanceUsd() to return correct USD amount');
    assert.strictEqual(calculateBalanceUsd(null), 0, 'Expected calculateBalanceUsd(null) to return 0');
    console.log('✅ USD balance tests passed');

    console.log('All wallet-service tests passed.');
}

runTests();