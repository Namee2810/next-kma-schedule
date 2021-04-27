const withPWA = require('next-pwa');

const next_config = {
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    dest: "public",
  }
}

module.exports = withPWA(next_config);