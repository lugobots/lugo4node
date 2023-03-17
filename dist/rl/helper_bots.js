"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.newCustomHelperPlayer = exports.newZombieHelperPlayer = exports.newChaserHelperPlayer = exports.newRandomMotionHelperPlayer = void 0;
var mapper_1 = require("../mapper");
var client_1 = require("../client");
var index_1 = require("../index");
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
// const possibleAction = ;
function newRandomMotionHelperPlayer(teamSide, playerNumber, gameServerAddress, turnsToChangeDirection) {
    var _this = this;
    if (turnsToChangeDirection === void 0) { turnsToChangeDirection = 60; }
    var changeCounter = 0;
    var currentDir;
    return newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, function (orderSet, snapshot) { return __awaiter(_this, void 0, void 0, function () {
        var reader;
        return __generator(this, function (_a) {
            changeCounter--;
            if (changeCounter <= 0) {
                console.log("change dir!", teamSide, playerNumber, snapshot.getTurn());
                changeCounter = turnsToChangeDirection;
                currentDir = [
                    index_1.DIRECTION.FORWARD,
                    index_1.DIRECTION.BACKWARD,
                    index_1.DIRECTION.LEFT,
                    index_1.DIRECTION.RIGHT,
                    index_1.DIRECTION.BACKWARD_LEFT,
                    index_1.DIRECTION.BACKWARD_RIGHT,
                    index_1.DIRECTION.FORWARD_RIGHT,
                    index_1.DIRECTION.FORWARD_LEFT,
                ][Math.floor(Math.random() * 8)];
            }
            reader = new index_1.GameSnapshotReader(snapshot, teamSide);
            orderSet.addOrders(reader.makeOrderMoveByDirection(currentDir));
            orderSet.setDebugMessage("".concat(teamSide === 0 ? 'HOME' : 'AWAY', "-").concat(playerNumber, " #").concat(snapshot.getTurn(), " - chasing ball"));
            return [2 /*return*/, orderSet];
        });
    }); });
}
exports.newRandomMotionHelperPlayer = newRandomMotionHelperPlayer;
function newChaserHelperPlayer(teamSide, playerNumber, gameServerAddress) {
    var _this = this;
    return newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, function (orderSet, snapshot) { return __awaiter(_this, void 0, void 0, function () {
        var reader, me;
        return __generator(this, function (_a) {
            reader = new index_1.GameSnapshotReader(snapshot, teamSide);
            orderSet.addOrders(reader.makeOrderCatch());
            me = reader.getPlayer(teamSide, playerNumber);
            if (!me) {
                throw new Error("did not find myself in the game");
            }
            orderSet.addOrders(reader.makeOrderMoveMaxSpeed(me.getPosition(), snapshot.getBall().getPosition()));
            orderSet.setDebugMessage("".concat(teamSide === 0 ? 'HOME' : 'AWAY', "-").concat(playerNumber, " #").concat(snapshot.getTurn(), " - chasing ball"));
            return [2 /*return*/, orderSet];
        });
    }); });
}
exports.newChaserHelperPlayer = newChaserHelperPlayer;
function newZombieHelperPlayer(teamSide, playerNumber, gameServerAddress) {
    var _this = this;
    return newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, function (orderSet, snapshot) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("LET ZOOMIE");
            orderSet.setDebugMessage("".concat(teamSide === 0 ? 'HOME' : 'AWAY', "-").concat(playerNumber, " #").concat(snapshot.getTurn()));
            return [2 /*return*/, orderSet];
        });
    }); });
}
exports.newZombieHelperPlayer = newZombieHelperPlayer;
function newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, turnHandler) {
    return new Promise(function (resolve, reject) {
        var map = new mapper_1.Mapper(22, 5, teamSide);
        var initialRegion = map.getRegion(PLAYER_POSITIONS[playerNumber].Col, PLAYER_POSITIONS[playerNumber].Row);
        var lugoClient = new client_1.Client(gameServerAddress, true, "", teamSide, playerNumber, initialRegion.getCenter());
        lugoClient.play(turnHandler, resolve)["catch"](function (e) {
            console.log("failed zombie");
            reject();
        });
    });
}
exports.newCustomHelperPlayer = newCustomHelperPlayer;
