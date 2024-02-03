"use strict";
exports.__esModule = true;
exports.DEFAULT_PLAYER_POSITIONS = exports.DefaultInitBundle = void 0;
var configurator_1 = require("../configurator");
var mapper_1 = require("../mapper");
function DefaultInitBundle() {
    // the map will help us to see the field in quadrants (called regions) instead of working with coordinates
    var defaultConfig = new configurator_1.EnvVarLoader();
    // the map will help us to see the field in quadrants (called regions) instead of working with coordinates
    var defaultMapper = new mapper_1.Mapper(10, 6, defaultConfig.getBotTeamSide());
    // our bot strategy defines our bot initial position based on its number
    var initialRegion = defaultMapper.getRegion(exports.DEFAULT_PLAYER_POSITIONS[defaultConfig.getBotNumber()].Col, exports.DEFAULT_PLAYER_POSITIONS[defaultConfig.getBotNumber()].Row);
    var defaultInitialPosition = initialRegion.getCenter();
    return { defaultConfig: defaultConfig, defaultMapper: defaultMapper, defaultInitialPosition: defaultInitialPosition };
}
exports.DefaultInitBundle = DefaultInitBundle;
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
