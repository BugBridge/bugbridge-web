const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Proxy API requests to the Go API
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:55812',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api/v1', // Rewrite /api to /api/v1
  },
}));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - return index.html for all non-API routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Production server running on http://localhost:${PORT}`);
  console.log(`📡 API proxy configured for http://localhost:55812`);
});
