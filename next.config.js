const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
}

module.exports = process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);