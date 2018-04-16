const commandParser = (message) => new Promise((resolve, reject) => {
  let args = message.substring(1).split(' ')
  let cmd = args[0]

  args = args.splice(1)

  resolve({
    command: cmd,
    params: args
  })
})

const doesObjectContains = (value, object) => {
  for (let index in object) {
    if (index === value) return true
  }

  return false
}

const buildEmbedBodyImage = (imageUrl) => {
  return {
    embed: {
      image: {
        url: imageUrl
      }
    }
  }
}

module.exports = {
  commandParser,
  doesObjectContains,
  buildEmbedBodyImage
}
