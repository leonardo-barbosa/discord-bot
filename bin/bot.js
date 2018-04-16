const logger = require('winston')
const {
  discordClient,
  Discord
} = require('../controllers/discord')

logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
  colorize: true
})
logger.level = 'debug'

discordClient.on('ready', (evt) => {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(discordClient.user.username + ' - (' + discordClient.user.id + ')')
})

discordClient.on('message', async msg => {
  Discord(msg).handleMessage()
})

// let beyonce know we're ready
discordClient.login(process.env.DISCORD_TOKEN)
