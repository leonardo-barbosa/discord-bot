const Discord = require('discord.io')
const auth = require('../config/auth.json')
const commandHelper = require('../helpers/command')
const logger = require('winston')
const giphyController = require('./giphy')

const bot =  new Discord.Client({
    token: auth.discord.token,
    autorun: true
})

const getChannelID = () => {
    return this.channelID
}

const listenCommands = (message, channelID) => {
    if(message.substring(0,1) == '!') {
        this.channelID = channelID
        let commandObject = commandHelper.commandParser(message)
            .then( commandData =>  executeCommand(commandData, channelID))
    }
}

const executeCommand = (commandData) => {
    let commandObject= commands[commandData.command]
    try {
        if ( commandObject ) {
            return commandObject.fn()
        } else {
            return sendMessage(
                'Comando desconhecido! \nUtilize !help para listar todos.'
            )
        }
    } catch( err ) {
        logger.error( err )
    }
}

const ping = () => {
    return sendMessage(
        "Pong!"
    )
} 

const beyonce = () => { 
    return giphyController.random('beyonce')
        .then( responseBody => {
            sendMessageWithEmbedImage(
                '',
                responseBody.image_original_url
            )
        } )
        .catch( err => logger.error(err) )
}

const help = () => {
    return getCommandList()
        .then( stringList => {
            sendMessage(
                'Comandos disponíveis: \n' + stringList
            )
        } )
        .catch( err => logger.info(err) )
}

const getCommandList = () => {
    let commandsListArray = JSON.stringify(commands)
        .replace(/["{}:]/g, '').split(",")
    
    return new Promise( (resolve, reject) => {
        try {
            resolve( commandHelper.arrayToStringList(commandsListArray) )
        } catch(err){ 
            reject(err)
        }
    }) 
}

const sendMessage = (message) => {
    return bot.sendMessage( {
        to: getChannelID(),
        message: message
    })
}

const sendMessageWithEmbedImage = (message, embedUrl) => {
    return bot.sendMessage( {
        to: getChannelID(),
        message: message,
        embed: {
            image: {
                url: embedUrl
            }
        }
    })
}

const commands = {
    "ping": {
        fn: ping 
    },
    "help": {
        fn: help 
    },
    "beyonce": {
        fn: beyonce
    }
}

module.exports = {
    bot,
    listenCommands 
}