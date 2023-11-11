const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // maximum number of requests allowed in the windowMs
    handler: (req, res, next, options) => {
        throw new Error('Request limit exceeded. You can only request 10 times per minute.')
    }
});

module.exports = limiter;