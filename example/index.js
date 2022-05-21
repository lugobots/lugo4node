const {EnvVarLoader, newClientFromConfig, GameSnapshotReader, Mapper} = require('lugo4node')
const dummy = require('./my_bot')
const {PLAYER_POSITIONS} = require("./strategy");

// we must load the env vars following the standard defined by the game specs because all bots will receive the
// arguments in the same format (env vars)
const config = new EnvVarLoader()

// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
const map = new Mapper(10, 6, config.botTeam)

// our bot strategy defines our bot initial position based on its number
const initialRegion = map.getRegion(PLAYER_POSITIONS[config.botNumber].Col, PLAYER_POSITIONS[config.botNumber].Row)

// let pos = new proto.lugo.Point()
// pos.setX()
// pos.setY(randomIntFromInterval(1, field.MAX_X_COORDINATE / 2))
//
//
// if (mySide === proto.lugo.Team.Side.AWAY) {
//     pos.setX(field.MAX_X_COORDINATE - pos.getX())
//     pos.setY(field.MAX_Y_COORDINATE - pos.getY())
// }

// now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
// client constructor as well
const lugoClient = new newClientFromConfig(config, initialRegion.getCenter())

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

lugoClient.playAsBot(new dummy(
    config.botTeam,
    config.botNumber,
    initialRegion.getCenter(),
    map,
)).then(() => {
    console.log(`all done`)
}).catch(e => {
    console.error(e)
})


