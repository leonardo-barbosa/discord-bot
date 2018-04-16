const client = require('../clients/giphy').client(process.env.GIPHY_API_KEY)
const logger = require('winston')

const random = (tag) => new Promise((resolve, reject) => {
  client.get('gifs/random', { tag: tag })
    .then(res => resolve(res.body.data))
    .catch(err => logger.error(err))
})

module.exports = {
  random
}
