'use strict';
const reader = require('./snapshot_reader')
module.exports = {
    EnvVarLoader: require('./configurator'),
    Client: require('./client').Client,
    Goal: reader.Goal,
    GameSnapshotReader: reader.GameSnapshotReader,
    Mapper: require('./mapper').Map,
    Region: require('./mapper').Region,
    NewVector: require('./vector').NewVector,
    BotStub: require('./stub').BotStub,
    // defineState: require('./stub').defineState,
    PLAYER_STATE: require('./stub').PLAYER_STATE,
    FIELD: require("./field"),

    newClientFromConfig: require('./client').newClientFromConfig,
    vectors: {
        normalize: require('./vector').normalize,
        getLength: require('./vector').getLength,
        getScaledVector: require('./vector').getScaledVector,
        sub: require('./vector').sub
    },
    homeGoal: reader.homeGoal,
    awayGoal: reader.awayGoal,
    directions: {
        East: reader.directions.east,
        West: reader.directions.west,
        South: reader.directions.south,
        North: reader.directions.north,
        NorthEast: reader.directions.northEast,
        NorthWest: reader.directions.northWest,
        SouthEast: reader.directions.southEast,
        SouthWest: reader.directions.southWest,
    },
}