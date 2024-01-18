"use strict";
exports.__esModule = true;
exports.NewDefaultStarter = exports.DEFAULT_PLAYER_POSITIONS = void 0;
var _1 = require(".");
var configurator_1 = require("./configurator");
var mapper_1 = require("./mapper");
exports.DEFAULT_PLAYER_POSITIONS = {
    1: { Col: 0, Row: 0 },
    2: { Col: 1, Row: 1 },
    3: { Col: 2, Row: 2 },
    4: { Col: 2, Row: 3 },
    5: { Col: 1, Row: 4 },
    6: { Col: 3, Row: 1 },
    7: { Col: 3, Row: 2 },
    8: { Col: 3, Row: 3 },
    9: { Col: 3, Row: 4 },
    10: { Col: 4, Row: 3 },
    11: { Col: 4, Row: 2 }
};
function NewDefaultStarter() {
    // the map will help us to see the field in quadrants (called regions) instead of working with coordinates
    var config = new configurator_1.EnvVarLoader();
    // the map will help us to see the field in quadrants (called regions) instead of working with coordinates
    var map = new mapper_1.Mapper(10, 6, config.getBotTeamSide());
    // our bot strategy defines our bot initial position based on its number
    var initialRegion = map.getRegion(exports.DEFAULT_PLAYER_POSITIONS[config.getBotNumber()].Col, exports.DEFAULT_PLAYER_POSITIONS[config.getBotNumber()].Row);
    // now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
    // client constructor as well
    var lugoClient = (0, _1.NewClientFromConfig)(config, initialRegion.getCenter());
    function playAsBot(bot) {
        lugoClient.playAsBot(bot).then(function () {
            console.log("all done");
        })["catch"](function (e) {
            console.error(e);
        });
    }
    return { config: config, map: map, initialRegion: initialRegion, lugoClient: lugoClient, playAsBot: playAsBot };
}
exports.NewDefaultStarter = NewDefaultStarter;
