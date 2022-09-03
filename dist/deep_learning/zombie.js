var Mapperper = require('../mapper').Mapper;
var Client = require('../client').Client;
var PLAYER_POSITIONS = {
    1: { Col: 0, Row: 1 },
    2: { Col: 1, Row: 1 },
    3: { Col: 2, Row: 1 },
    4: { Col: 3, Row: 1 },
    5: { Col: 4, Row: 1 },
    6: { Col: 5, Row: 1 },
    7: { Col: 6, Row: 1 },
    8: { Col: 7, Row: 1 },
    9: { Col: 8, Row: 1 },
    10: { Col: 9, Row: 1 },
    11: { Col: 10, Row: 1 }
};
function newZombiePlayer(teamSide, playerNumber, gameServerAddress) {
    return new Promise(function (resolve, reject) {
        var map = new Mapper(22, 5, teamSide);
        var initialRegion = map.getRegion(PLAYER_POSITIONS[playerNumber].Col, PLAYER_POSITIONS[playerNumber].Row);
        var lugoClient = new Client(gameServerAddress, true, "", teamSide, playerNumber, initialRegion.getCenter());
        var turnHandler = function (orderSet, snapshot) { return orderSet; };
        lugoClient.play(turnHandler, resolve)["catch"](function (e) {
            console.log("Zombie player ".concat(teamSide === 0 ? 'HOME' : 'AWAY', "-").concat(playerNumber, " said: ").concat(e.toString()));
        });
    });
}
module.exports = { newZombiePlayer: newZombiePlayer };
