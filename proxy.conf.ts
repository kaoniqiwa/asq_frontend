const PROXY_CONFIG = [
  {
    context: [
      '/api',
    ],
    target: 'http://localhost:8888/gitstore/ASQ/asq_server',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/api": ""
    }
  },
];

module.exports = PROXY_CONFIG;
