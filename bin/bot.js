const logger = require('winston')
const auth = require('../auth.json')
const Discord = require('discord.js');
const client = new Discord.Client();

logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
    colorize: true
} )
logger.level = 'debug'

client.on('ready', (evt) => {
    logger.info('Connected')
    logger.info('Logged in as: ')
    logger.info(client.user.username + ' - (' + client.user.id + ')')
})

client.on('message', msg => {
    if( msg.content === 'ping') {
        let channelID = msg.channel.id
        client.channels
            .get(channelID)
            .send('Pong')
    }
})

client.login(auth.token)