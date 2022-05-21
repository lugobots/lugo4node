const field = require("../field")
const {Client} = require('../client')
const process = require('process')
const GameSnapshotReader = require('../helpers').GameSnapshotReader
const dummy = require('./my_bot')

let pos = new proto.lugo.Point()
pos.setX(randomIntFromInterval(1, field.MAX_Y_COORDINATE))
pos.setY(randomIntFromInterval(1, field.MAX_X_COORDINATE / 2))

const mySide = proto.lugo.Team.Side[process.env.PLAYER_SIDE.toUpperCase()]
const myNumber = parseInt(process.env.PLAYER_NUMBER)

if (mySide === proto.lugo.Team.Side.AWAY) {
    pos.setX(field.MAX_X_COORDINATE - pos.getX())
    pos.setY(field.MAX_Y_COORDINATE - pos.getY())
}

bot = new Client(
    'localhost:5000',
    "",
    mySide,
    myNumber,
    pos,
)
console.log(mySide,
    myNumber,
    pos,)

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 *
 * @param {proto.lugo.OrderSet} orderSet
 * @param {proto.lugo.GameSnapshot} snapshot
 */
const myBot = async (orderSet, snapshot) => {
    try {
        const reader = new GameSnapshotReader(snapshot, mySide)
        // const myTeam = reader.getMyTeam()
        const me = reader.getPlayer(mySide, myNumber)

        if (reader.isBallHolder(me)) {
            console.log(`I AM THE HOLDER`)
        }
        const ballPos = snapshot.getBall().getPosition()

        const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), ballPos)

        orderSet.setDebugMessage("mi mi mi")
        orderSet.setOrdersList([myOrder])
        return orderSet;
    } catch (e) {
        console.log(e)
    }

}

bot.playAsBot(new dummy(mySide, myNumber, pos)).then(() => {
    console.log(`all done`)
}).catch(e => {
    console.error(e)
})


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

