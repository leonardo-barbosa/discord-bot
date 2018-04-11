const Discord = require('discord.io')
const auth = require('../config/auth.json')
const commandHelper = require('../helpers/command')
const logger = require('winston')
const giphyController = require('./giphy')

const bot =  new Discord.Client({
    token: auth.discord.token,
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
    bot.sendMessage({
        to: channelID,
        message: "Pong!"
    })
} 

const beyonce = (channelID) => { 
    giphyController.random('beyonce')
        .then( responseBody => {
            bot.sendMessage( {
                to: channelID,
                message: '',
                embed: {
                    image: {
                        url: responseBody.image_original_url
                    }
                }
            })
        })
        .catch( err => logger.error(err) )
}

const help = (channelID) => {
    getCommandList()
        .then( stringList => {
            bot.sendMessage( {
                to: channelID,
                message: 'Comandos disponíveis: \n' + stringList
            })
        })
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