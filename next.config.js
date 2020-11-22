const withPWA = require('next-pwa')
const settings = {
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL || 'http://localhost:12345'
  }
}
module.exports = process.env.NODE_ENV !== 'production' ? settings: withPWA(settings)
