const withPWA = require('next-pwa');
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
}

module.exports = withPWA(nextConfig);