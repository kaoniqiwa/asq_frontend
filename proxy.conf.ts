const PROXY_CONFIG = [
  {
    context: [
      '/',
    ],
    target: 'http://localhost:8888/Project/asq_server',
    // target: 'http://192.168.21.241:9000',
    changeOrigin: true,
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
