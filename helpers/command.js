const commandParser = (message) => {
    return new Promise( (resolve, reject) => {
        let args = message.substring(1).split(' ')
        let cmd = args[0]

        agrs = args.splice(1)

        resolve ({
            command: cmd,
            params: args 
        })
    })
}

const arrayToStringList = (array) => {
    let stringList = ''

    array.forEach( (item) => {
        stringList += item + ' \n'
    } )

    return stringList
}

module.exports = {
    commandParser,
    arrayToStringList
}