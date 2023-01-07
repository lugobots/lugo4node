"use strict";
exports.__esModule = true;
exports.newZombiePlayer = void 0;
var mapper_1 = require("../mapper");
var client_1 = require("../client");
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
        var map = new mapper_1.Mapper(22, 5, teamSide);
        var initialRegion = map.getRegion(PLAYER_POSITIONS[playerNumber].Col, PLAYER_POSITIONS[playerNumber].Row);
        var lugoClient = new client_1.Client(gameServerAddress, true, "", teamSide, playerNumber, initialRegion.getCenter());
        var turnHandler = function (orderSet, snapshot) {
            return new Promise(function (r, j) {
                orderSet.setDebugMessage("".concat(teamSide === 0 ? 'HOME' : 'AWAY', "-").concat(playerNumber, " #").concat(snapshot.getTurn()));
                r(orderSet);
            });
        };
        lugoClient.play(turnHandler, resolve)["catch"](function (e) {
            //  console.log(`[PLay] Zombie player ${teamSide === 0 ? 'HOME' : 'AWAY'}-${playerNumber} said: ${e.toString()}`)
            reject();
        });
    });
}
exports.newZombiePlayer = newZombiePlayer;
