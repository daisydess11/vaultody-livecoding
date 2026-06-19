'use strict';

const express = require('express');
const authMiddleware = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');
const walletsRouter = require('./routes/wallets');

const app = express();

// Middleware
app.use(express.json());

// Apply rate limiter only to public /wallets routes (the rate limiter itself
// will skip protected /details endpoints). Mount router with limiter.
app.use('/wallets', rateLimiter, walletsRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
