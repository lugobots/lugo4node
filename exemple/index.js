const field = require("../field")
const {Client} = require('../client')
const process = require('process')
const GameSnapshotReader = require('../snapshot_reader').GameSnapshotReader
const dummy = require('./my_bot')
const mapper = require('../mapper')
const {exit} = require("process");
const {PLAYER_POSITIONS} = require("./strategy");

if (!process.env.BOT_TEAM) {
    console.error("missing BOT_TEAM env value")
    exit(1)
}

if (!process.env.BOT_NUMBER) {
    console.error("missing BOT_NUMBER env value")
    exit(1)
}

// the server address
const serer_address = process.env.BOT_GRPC_URL || 'localhost:5000'
const grpc_insecure = Boolean((process.env.BOT_GRPC_INSECURE || "true").toLowerCase())

// defining bot side
const mySide = proto.lugo.Team.Side[process.env.BOT_TEAM.toUpperCase()]
const myNumber = parseInt(process.env.BOT_NUMBER)
// the token is mandatory in official matches, but you may ignore in local games
const myToken = process.env.BOT_TOKEN || ""

///*******************************

// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
const map = new mapper.Map(10, 6, mySide)


console.log(`PLayer #${myNumber}: ${PLAYER_POSITIONS[myNumber].Col}, ${PLAYER_POSITIONS[myNumber].Row}`)
// our bot strategy defines our bot initial position based on its number
const initialRegion = map.getRegion(PLAYER_POSITIONS[myNumber].Col, PLAYER_POSITIONS[myNumber].Row)

// let pos = new proto.lugo.Point()
// pos.setX()
// pos.setY(randomIntFromInterval(1, field.MAX_X_COORDINATE / 2))
//
//
// if (mySide === proto.lugo.Team.Side.AWAY) {
//     pos.setX(field.MAX_X_COORDINATE - pos.getX())
//     pos.setY(field.MAX_Y_COORDINATE - pos.getY())
// }
console.log(`side ${mySide}`, initialRegion.getCenter())

bot = new Client(
    serer_address,
    grpc_insecure,
    myToken,
    mySide,
    myNumber,
    initialRegion.getCenter(),
)
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

bot.playAsBot(new dummy(
    mySide,
    myNumber,
    initialRegion.getCenter(),
    map,
    )).then(() => {
    console.log(`all done`)
}).catch(e => {
    console.error(e)
})


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

