"use strict";
exports.__esModule = true;
exports.getOpponentSide = exports.getPlayer = exports.getTeam = exports.isBallHolder = exports.getBallHolder = void 0;
var proto_exported_1 = require("./proto_exported");
function getBallHolder(snapshot) {
    var holder = snapshot.getBall().getHolder();
    return holder !== null && holder !== void 0 ? holder : null;
}
exports.getBallHolder = getBallHolder;
function isBallHolder(snapshot, player) {
    var holder = snapshot.getBall().getHolder();
    return holder !== undefined && holder.getTeamSide() === player.getTeamSide() && holder.getNumber() === player.getNumber();
}
exports.isBallHolder = isBallHolder;
function getTeam(snapshot, side) {
    var _a, _b;
    if (side === proto_exported_1.Team.Side.HOME) {
        return (_a = snapshot.getHomeTeam()) !== null && _a !== void 0 ? _a : null;
    }
    return (_b = snapshot.getAwayTeam()) !== null && _b !== void 0 ? _b : null;
}
exports.getTeam = getTeam;
function getPlayer(snapshot, side, number) {
    var team = getTeam(snapshot, side);
    if (team) {
        var player = null;
        for (var _i = 0, _a = team.getPlayersList(); _i < _a.length; _i++) {
            var currentPlayer = _a[_i];
            if (currentPlayer.getNumber() === number)
                player = currentPlayer;
        }
        return player;
    }
    return null;
}
exports.getPlayer = getPlayer;
function getOpponentSide(side) {
    return side === proto_exported_1.Team.Side.HOME ? proto_exported_1.Team.Side.AWAY : proto_exported_1.Team.Side.HOME;
}
exports.getOpponentSide = getOpponentSide;
