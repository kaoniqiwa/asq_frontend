const PROXY_CONFIG = [
  {
    context: [
      '/app/asq_server',
    ],
    target: 'https://asq.neoballoon.com/app/asq_server/',
    // target: "http://localhost:8888/Project/asq_server",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/app/asq_server": ""
    }
  },
];

module.exports = PROXY_CONFIG;
