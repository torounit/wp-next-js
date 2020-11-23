const withPWA = require('next-pwa')
const settings = {
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL || 'http://localhost:12345',
    APP_ID : 'bf88fce4-864e-44d8-80f1-ce6758381473',
    APP_NAME: 'next',
  }
}
module.exports = process.env.NODE_ENV !== 'production' ? settings: withPWA(settings)
