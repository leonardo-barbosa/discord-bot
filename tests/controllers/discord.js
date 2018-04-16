const assert = require('chai').assert
const discordController = require('../../controllers/discord').Discord

describe('Listen messages', () => {
  describe('Ping', () => {
    it('should return a pending promise', () => {
      let message = {
        content: '!ping',
        channel: {
          id: '123'
        }
      }

      let pingResult = discordController(message).handleMessage()
      assert.equal(pingResult, Promise)
    })
  })
})