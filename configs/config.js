const convict = require('convict')

const config = convict({
  env: {
    doc: 'Application enviroment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  giphy: {
    doc: 'Giphy base url for API requests',
    default: 'http://api.giphy.com/v1/',
    env: 'GIPHY_BASE_URL'
  }
})

module.exports = config
