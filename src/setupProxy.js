const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:55812',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1', // Rewrite /api to /api/v1
      },
    })
  );
};
