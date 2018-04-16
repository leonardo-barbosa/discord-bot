const discord = require('discord.js')
const commandHelper = require('../helpers/command')
const discordClient = new discord.Client()
const giphyController = require('../controllers/giphy')

const Discord = (msg) => {
  this.message = msg

  return { handleMessage: handleMessage }
}

const getMessage = () => this.message

const handleMessage = () => {
  if (!getMessage().content.startsWith('!') || getMessage().author.bot) return

  commandHelper.commandParser(getMessage().content)
    .then(commandObject => executeCommand(commandObject))
}

const executeCommand = (commandObject) => {
  let command = commandObject.command
  let params = commandObject.params

  if (!commandHelper.doesObjectContains(command, commands)) return

  command = commands[command]

  if (command.params) return command.fn(params)

  command.fn()
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
      commandHelper.buildEmbedBodyImage(res.image_original_url)
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
