const trackClick = (req, res, next) => {
    const analytics = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        shortKey: req.params.key
    };

    // In a real app, you'd push this to a message queue or a DB
    console.log("Click Captured:", analytics);
    next();
};

module.exports = trackClick;
