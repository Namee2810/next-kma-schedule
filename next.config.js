const withPWA = require('next-pwa');

const next_config = {
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
  }
}

module.exports = withPWA(next_config);