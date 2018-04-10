const logger = require('winston')
const discordController = require('../controllers/discord')
const bot = discordController.bot

// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
    colorize: true
})
logger.level = 'debug'

// Initialize Discord bot

bot.on('ready', function (evt) {
    logger.info('Connected')
    logger.info('Logged in as: ')
    logger.info(bot.username + ' - (' + bot.id + ')')
})

bot.on('message', (user, userID, channelID, message, evt, olar) => {
    discordController.listenCommands(message, channelID)
})