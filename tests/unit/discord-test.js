 const discord = require('../../controllers/discord')
 const expect = require('chai').expect
 const assert = require('assert')

 describe( 'Discord controller', () => {
    describe( 'ping', () => {
        it( 'should send message ping to given channelID', () => {
            assert.equal(discord.listenCommands( '!ping ', '432194259131826179' ), undefined)
        })
    })
 } )

/*
( '!ping ', '432194259131826179' )
*/