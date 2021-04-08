const withOffline = require('next-offline')

const nextConfig = {
  env: {
    SECRET_KEY: "AQQBp4ULEr12NUE2Jcs6eeQQpPVo9HDO8JMHDO8JMpxcNbCPHkpo474UDCyrkf1HNss9QyahIl8sNqwpj7A8PBHci26H3sNae8LREACT_APP_SECRET_KEY = DJg7HcwSHrTxyPLPwuwzPFX9QG3wevYhBQUcMoHgefbaWFOkSkOc2QvijzN7e7wizNs3z5NPVo97wizNs3z5N8rkpegNKjV8mKRWd",
  },
}

module.exports = withOffline(nextConfig)