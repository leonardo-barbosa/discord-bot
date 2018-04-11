const request = require('request')
const logger = require('winston')

const baseURL = 'http://api.giphy.com/v1/'

const get = (path, params) => {
    return new Promise( (resolve, reject) => {
        request.get( baseURL.concat(path), params, ( err, res, body) => {
            if( err ) { reject(logger.error(err)) }
        
            resolve(res)
        })
    })
}

module.exports = {
    get
}