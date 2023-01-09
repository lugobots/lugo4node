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
exports.delay = exports.MyBotTrainer = void 0;
var lugo4node_1 = require("@lugobots/lugo4node");
var tf = require("@tensorflow/tfjs-node");
var MyBotTrainer = /** @class */ (function () {
    function MyBotTrainer(remoteControl) {
        this.remoteControl = remoteControl;
    }
    MyBotTrainer.prototype.createNewInitialState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, randomVelocity, ballPos, newVelocity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mapper = new lugo4node_1.Mapper(20, 20, lugo4node_1.Lugo.Team.Side.HOME);
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 11)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._randomPlayerPos(this.mapper, lugo4node_1.Lugo.Team.Side.HOME, i)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._randomPlayerPos(this.mapper, lugo4node_1.Lugo.Team.Side.AWAY, i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        randomVelocity = new lugo4node_1.Lugo.Velocity();
                        randomVelocity.setSpeed(0);
                        randomVelocity.setDirection(lugo4node_1.ORIENTATION.NORTH); // irrelevant
                        return [4 /*yield*/, this.remoteControl.setPlayerProps(lugo4node_1.Lugo.Team.Side.HOME, 5, this.mapper.getRegion(10, randomInteger(7, 13)).getCenter(), randomVelocity)];
                    case 6:
                        _a.sent();
                        ballPos = new lugo4node_1.Lugo.Point();
                        ballPos.setX(0);
                        ballPos.setY(0);
                        newVelocity = new lugo4node_1.Lugo.Velocity();
                        newVelocity.setSpeed(0);
                        newVelocity.setDirection(lugo4node_1.ORIENTATION.NORTH); // irrelevant
                        return [4 /*yield*/, this.remoteControl.setTurn(1)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.remoteControl.setBallProps(ballPos, newVelocity)];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyBotTrainer.prototype.getInputs = function (snapshot) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, me, mappedOpponents, myPosition, sensorFront, sensorLeft, sensorRight;
            return __generator(this, function (_a) {
                reader = new lugo4node_1.GameSnapshotReader(snapshot, lugo4node_1.Lugo.Team.Side.HOME);
                me = reader.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, 5);
                if (!me) {
                    throw new Error("did not find myself in the game");
                }
                mappedOpponents = this._findOpponent(reader);
                myPosition = this.mapper.getRegionFromPoint(me.getPosition());
                sensorFront = 0;
                if (this._hasOpponent(mappedOpponents, myPosition.front()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front().left()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front().right())) {
                    sensorFront = 3;
                }
                else if (this._hasOpponent(mappedOpponents, myPosition.front().front()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front().front().left()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front().front().right())) {
                    sensorFront = 2;
                }
                else if (this._hasOpponent(mappedOpponents, myPosition.front().front().front()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front().front().front().left()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front().front().front().right())) {
                    sensorFront = 1;
                }
                sensorLeft = 0;
                if (this._hasOpponent(mappedOpponents, myPosition.left())) {
                    sensorLeft = 3;
                }
                else if (this._hasOpponent(mappedOpponents, myPosition.left().left())) {
                    sensorLeft = 2;
                }
                else if (this._hasOpponent(mappedOpponents, myPosition.left().left())) {
                    sensorLeft = 1;
                }
                sensorRight = 0;
                if (this._hasOpponent(mappedOpponents, myPosition.right())) {
                    sensorRight = 3;
                }
                else if (this._hasOpponent(mappedOpponents, myPosition.right().right())) {
                    sensorRight = 2;
                }
                else if (this._hasOpponent(mappedOpponents, myPosition.right().right().right())) {
                    sensorRight = 1;
                }
                // console.log(`Sensorres: `, [sensorFront, sensorLeft, sensorRight])
                return [2 /*return*/, tf.tensor2d([[sensorFront, sensorLeft, sensorRight]])];
            });
        });
    };
    MyBotTrainer.prototype.play = function (orderSet, snapshot, action) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, me, dir;
            return __generator(this, function (_a) {
                reader = new lugo4node_1.GameSnapshotReader(snapshot, lugo4node_1.Lugo.Team.Side.HOME);
                me = reader.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, 5);
                if (!me) {
                    throw new Error("did not find myself in the game");
                }
                dir = reader.makeOrderMoveByDirection(action);
                return [2 /*return*/, orderSet.setOrdersList([dir])];
            });
        });
    };
    /**
     *
     * @param {Lugo.GameSnapshot} previousSnapshot
     * @param {Lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    MyBotTrainer.prototype.evaluate = function (previousSnapshot, newSnapshot) {
        return __awaiter(this, void 0, void 0, function () {
            var readerPrevious, reader, me, mePreviously, mappedOpponents, opponentGoal, previousDist, actualDist, myPosition, reward, done;
            return __generator(this, function (_a) {
                readerPrevious = new lugo4node_1.GameSnapshotReader(previousSnapshot, lugo4node_1.Lugo.Team.Side.HOME);
                reader = new lugo4node_1.GameSnapshotReader(newSnapshot, lugo4node_1.Lugo.Team.Side.HOME);
                me = reader.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, 5);
                if (!me) {
                    throw new Error("did not find myself in the game");
                }
                mePreviously = readerPrevious.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, 5);
                if (!mePreviously) {
                    throw new Error("did not find myself in the game");
                }
                mappedOpponents = this._findOpponent(reader);
                opponentGoal = reader.getOpponentGoal().getCenter();
                previousDist = Math.hypot(opponentGoal.getX() - mePreviously.getPosition().getX(), opponentGoal.getY() - mePreviously.getPosition().getY());
                actualDist = Math.hypot(opponentGoal.getX() - me.getPosition().getX(), opponentGoal.getY() - me.getPosition().getY());
                myPosition = this.mapper.getRegionFromPoint(me.getPosition());
                reward = 0;
                // if ( actualDist < previousDist) {
                reward = ((previousDist - actualDist) / lugo4node_1.SPECS.PLAYER_MAX_SPEED) * 2;
                done = false;
                if (this._hasOpponent(mappedOpponents, myPosition.left()) ||
                    this._hasOpponent(mappedOpponents, myPosition.right()) ||
                    this._hasOpponent(mappedOpponents, myPosition.front()) ||
                    this._hasOpponent(mappedOpponents, myPosition)) {
                    done = true;
                    reward = -5;
                    // console.log(`Done because got to close to an opponent`)
                }
                else if (mePreviously.getPosition().getX() > lugo4node_1.SPECS.MAX_X_COORDINATE * 0.9) {
                    done = true;
                    // console.log(`Done because it is too far ${mePreviously.getPosition().getX()}`)
                }
                if (reward === 0) {
                    reward = -1;
                }
                // console.log(`Reward : `, reward)
                return [2 /*return*/, { done: done, reward: reward }];
            });
        });
    };
    MyBotTrainer.prototype._randomPlayerPos = function (mapper, side, number) {
        return __awaiter(this, void 0, void 0, function () {
            var minCol, maxCol, minRow, maxRow, randomVelocity, randomCol, randomRow, randomPosition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        minCol = 10;
                        maxCol = 17;
                        minRow = 4;
                        maxRow = 16;
                        randomVelocity = new lugo4node_1.Lugo.Velocity();
                        randomVelocity.setSpeed(0);
                        randomVelocity.setDirection(lugo4node_1.ORIENTATION.NORTH); // irrelevant
                        randomCol = randomInteger(minCol, maxCol);
                        randomRow = randomInteger(minRow, maxRow);
                        randomPosition = mapper.getRegion(randomCol, randomRow).getCenter();
                        return [4 /*yield*/, this.remoteControl.setPlayerProps(side, number, randomPosition, randomVelocity)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {GameSnapshotReader} reader
     * @private
     */
    MyBotTrainer.prototype._findOpponent = function (reader) {
        var getOpponents = reader.getTeam(reader.getOpponentSide()).getPlayersList();
        var mappedOpponents = [];
        for (var _i = 0, getOpponents_1 = getOpponents; _i < getOpponents_1.length; _i++) {
            var opponent = getOpponents_1[_i];
            var opponentRegion = this.mapper.getRegionFromPoint(opponent.getPosition());
            if (mappedOpponents[opponentRegion.getCol()] === undefined) {
                mappedOpponents[opponentRegion.getCol()] = [];
            }
            mappedOpponents[opponentRegion.getCol()][opponentRegion.getRow()] = true;
        }
        return mappedOpponents;
    };
    /**
     *
     * @param mappedOpponents
     * @param {Region} region
     * @returns {boolean}
     * @private
     */
    MyBotTrainer.prototype._hasOpponent = function (mappedOpponents, region) {
        return mappedOpponents[region.getCol()] !== undefined && mappedOpponents[region.getCol()][region.getRow()] === true;
    };
    return MyBotTrainer;
}());
exports.MyBotTrainer = MyBotTrainer;
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.delay = delay;
