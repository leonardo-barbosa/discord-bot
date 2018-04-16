const config = require('../configs/config')
const request = require('request')

const BASE_URL = config.get('giphy')

const client = (apiKey) => {
  this.params = {
    json: true,
    qs: {
      api_key: apiKey
    }
  }

  return {
    get: get
  }
}

const get = (path, params) => new Promise((resolve, reject) => {
  let queriableParams = setQueriableStringParams(params)

  request.get(BASE_URL.concat(path), queriableParams, (err, res) => {
    if (err) reject(err)

    resolve(res)
  })
})

const setQueriableStringParams = (params) => {
  insertDataIntoObject(this.params.qs, params)

  return this.params
}

const insertDataIntoObject = (object, data) => {
  for (let index in data) {
    object[index] = data[index]
  }
}

module.exports = {
  client
}
