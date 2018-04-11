const giphyClient = require('../clients/giphy')
const logger = require('winston')

const params = {
    json: true,
    qs: {
        api_key: process.env.giphy_api_key
    }
}

const random = (tag) => {
   params.qs.tag = tag

   return new Promise( (resolve, reject) => {
       let responseObject = giphyClient.get( 'gifs/random', params)
        .then( res => {
            if( res.body.meta.status !== 200 ) {
                reject(res)
            }

            resolve(res.body.data)
        })
        .catch( err => logger.error(err) )
    })
}

module.exports = {
    random
}