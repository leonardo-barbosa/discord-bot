const Discord = require('discord.io')
const commandHelper = require('../helpers/command')
const logger = require('winston')
const giphyController = require('./giphy')

const bot =  new Discord.Client({
    token: process.env.discord_token,
    autorun: true
})

const listenCommands = (message, channelID) => {
    if(message.substring(0,1) == '!') {
        let commandObject = commandHelper.commandParser(message)
            .then( commandData => executeCommand(commandData, channelID)) 
    }
}

const executeCommand = (commandData, channelID) => {
    try {
        commands[commandData.command].fn(channelID)
    } catch(e) {
        logger.info(e)
    }
}

const ping = (channelID) => {
    sendMessage(
        channelID,
        "Pong!"
    )
} 

const beyonce = (channelID) => { 
    giphyController.random('beyonce')
        .then( responseBody => {
            sendMessageWithEmbedImage(
                channelID,
                '',
                responseBody.image_original_url
            )
        } )
        .catch( err => logger.error(err) )
}

const help = (channelID) => {
    getCommandList()
        .then( stringList => {
            sendMessage(
                channelID,
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

const sendMessage = (channelID, message) => {
    bot.sendMessage( {
        to: channelID,
        message: message
    })
}

const sendMessageWithEmbedImage = (channeldID, message, embedUrl) => {
    bot.sendMessage( {
        to: channeldID,
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