'use strict';

const API_KEY = process.env.API_KEY || '';

module.exports = function authMiddleware(req, res, next) {
  const key = req.headers['x-api-key'];

  if (!API_KEY) {
    // Server misconfiguration: API key not set
    return res.status(401).json({ error: 'Unauthorized', message: 'API key not configured on server' });
  }

  if (!key) {
    return res.status(401).json({ error: 'Unauthorized', message: 'x-api-key header required' });
  }

  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid API key' });
  }

  req.apiKey = key;
  next();
};
