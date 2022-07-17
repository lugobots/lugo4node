const {
    EnvVarLoader,
    NewClientFromConfig,
    GameSnapshotReader,
    Map,
} = require('lugo4node')
const {PLAYER_POSITIONS} = require("./strategy");

// we must load the env vars following the standard defined by the game specs because all bots will receive the
// arguments in the same format (env vars)
const config = new EnvVarLoader()

// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
const map = new Map(10, 6, config.getBotTeamSide())

// our bot strategy defines our bot initial position based on its number
const initialRegion = map.getRegion(PLAYER_POSITIONS[config.getBotNumber()].Col, PLAYER_POSITIONS[config.getBotNumber()].Row)

// now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
// client constructor as well
const lugoClient = new NewClientFromConfig(config, initialRegion.getCenter())

/**
 *
 * @param {proto.lugo.OrderSet} orderSet
 * @param {proto.lugo.GameSnapshot} snapshot
 * @returns {proto.lugo.OrderSet}
 */
const turnHandler = async (orderSet, snapshot) => {
    try {
        const reader = new GameSnapshotReader(snapshot, config.botTeamSide)
        // const myTeam = reader.getMyTeam()
        const me = reader.getPlayer(config.botTeamSide, config.botNumber)

        if(snapshot.getTurn() % 10 === 0) {
            let moveOrder;
            switch (getRndInteger(1, 4)) {
                case 1:
                    moveOrder = reader.goForward()
                    orderSet.setDebugMessage("goForward")
                    console.log(`I am going Forward`)
                    break;
                case 2:
                    moveOrder = reader.goBackward()
                    orderSet.setDebugMessage("goBackward")
                    console.log(`I am going Backward`)
                    break;
                case 3:
                    moveOrder = reader.goLeft()
                    orderSet.setDebugMessage("goLeft")
                    console.log(`I am going Left`)
                    break;
                case 4:
                    moveOrder = reader.goRight()
                    orderSet.setDebugMessage("goRight")
                    console.log(`I am going Right`)
                    break;
            }
            orderSet.setOrdersList([moveOrder])
        }
        return orderSet;
    } catch (e) {
        console.log(e)
    }
}

lugoClient.play(turnHandler).then(() => {
    console.log(`all done`)
}).catch(e => {
    console.error(e)
})


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
