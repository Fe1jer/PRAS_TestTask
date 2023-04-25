const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api",
    "/img",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7152',
        secure: false
    });

    app.use(appProxy);
};
