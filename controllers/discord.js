const discord = require('discord.js')
const discordClient = new discord.Client()
const giphyController = require('../controllers/giphy')
const {
  commandParser,
  indexOf,
  buildEmbedBodyImage
} = require('../helpers/command')

const Discord = (msg) => {
  this.message = msg

  return { handleMessage: handleMessage }
}

const getMessage = () => this.message

const handleMessage = () => {
  if (!getMessage().content.startsWith('!') || getMessage().author.bot) return

  commandParser(getMessage().content)
    .then(commandObject => executeCommand(commandObject))
}

const executeCommand = (commandObject) => {
  let command = commandObject.command
  let params = commandObject.params
  if (indexOf(commands, command) === -1) return

  command = commands[command]

  if (command.params) {
    if (verifyParams(command.params, params)) return command.fn(params)
    else return
  }

  return command.fn()
}

const verifyParams = (paramsNeeded, paramsSent) => {
  let requiredParams = []
  for (let index in paramsNeeded) {
    if (paramsNeeded[index].required === true) requiredParams.push(index)
  }

  let requiredNotSend = requiredParams.filter((item) => {
    return indexOf(paramsSent, item) === -1
  })

  if (requiredNotSend.length === 0) {
    return true
  } else {
    sendMessage('Parâmetros ausentes: ' + requiredNotSend)
    return false
  }
}

const ping = () => {
  return sendMessage('Ping?')
    .then(message =>
      message.edit(
        `Pong! Latência é de ${message.createdTimestamp - getMessage().createdTimestamp}ms.`
      )
    )
}

const beyonce = () => {
  giphyController.random('beyonce')
    .then(res => sendMessage(
      buildEmbedBodyImage(res.image_original_url)
    ))
}

const info = (params) => {
  // TODO
}

const sendMessage = (message) => {
  return getMessage().channel.send(message)
}

const commands = {
  'ping': {
    description: 'Utilizado para testar a latência de minhas respostas.',
    fn: ping
  },
  'beyonce': {
    description: 'Envia um GIF animado randomico de nossa rainha.',
    fn: beyonce
  },
  'info': {
    description: 'Mostra todas as informações de um usuário.',
    fn: info,
    params: {
      'nick': { required: true }
    }
  }
}

module.exports = {
  Discord,
  discordClient
}
