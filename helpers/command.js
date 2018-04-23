const commandParser = (message) => new Promise((resolve, reject) => {
  let args = message.substring(1).split(' ')
  let cmd = args[0]

  let params = buildParameters(args.splice(1).join(' '))
  resolve({
    command: cmd,
    params: params
  })
})

const buildParameters = (args) => {
  args = args.split(/--/g).splice(1)
  let paramsArray = []
  args.forEach((item) => {
    let parameter = item.split(' ')[0]
    let value = item.split(' ')[1]
    paramsArray[parameter] = value
  })

  return paramsArray
}

const indexOf = (object, value) => {
  for (let index in object) {
    if (index === value) return index
  }

  return -1
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
  indexOf,
  buildEmbedBodyImage
}
