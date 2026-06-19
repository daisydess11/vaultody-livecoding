'use strict';

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60;

const clients = new Map();

module.exports = function rateLimiter(req, res, next) {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const entry = clients.get(key) || {
        count: 0,
        start: now
    };

    if (now - entry.start >= WINDOW_MS) {
        entry.count = 0;
        entry.start = now;
    }

    entry.count += 1;
    clients.set(key, entry);

    if (entry.count > MAX_REQUESTS) {
        return res.status(429).json({
            error: 'Too Many Requests',
            message: `Rate limit exceeded. Try again in ${Math.ceil((WINDOW_MS - (now - entry.start)) / 1000)} seconds.`
        });
    }

    next();
};