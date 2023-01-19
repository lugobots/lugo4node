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
exports.delay = exports.MyBotTrainer = exports.PLAYER_NUM = void 0;
var lugo4node_1 = require("@lugobots/lugo4node");
var tf = require("@tensorflow/tfjs-node");
exports.PLAYER_NUM = 1;
var MyBotTrainer = /** @class */ (function () {
    function MyBotTrainer(remoteControl) {
        this.remoteControl = remoteControl;
    }
    MyBotTrainer.prototype.createNewInitialState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var randomVelocity, ballPos, newVelocity, ballTarget, vect1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mapper = new lugo4node_1.Mapper(20, 20, lugo4node_1.Lugo.Team.Side.HOME);
                        randomVelocity = new lugo4node_1.Lugo.Velocity();
                        randomVelocity.setSpeed(0);
                        randomVelocity.setDirection(lugo4node_1.ORIENTATION.NORTH); // irrelevant
                        return [4 /*yield*/, this.remoteControl.setPlayerProps(lugo4node_1.Lugo.Team.Side.HOME, exports.PLAYER_NUM, lugo4node_1.homeGoal.getCenter(), randomVelocity)];
                    case 1:
                        _a.sent();
                        ballPos = new lugo4node_1.Lugo.Point();
                        ballPos.setX(Math.round(randomInteger(lugo4node_1.SPECS.GOAL_ZONE_RANGE + lugo4node_1.SPECS.PLAYER_SIZE, lugo4node_1.SPECS.GOAL_ZONE_RANGE + (lugo4node_1.SPECS.PLAYER_SIZE * 4))));
                        ballPos.setY(randomInteger(lugo4node_1.homeGoal.getBottomPole().getY() - (lugo4node_1.SPECS.FIELD_HEIGHT / 4), lugo4node_1.homeGoal.getTopPole().getY() + (lugo4node_1.SPECS.FIELD_HEIGHT / 4)));
                        newVelocity = new lugo4node_1.Lugo.Velocity();
                        newVelocity.setSpeed(lugo4node_1.SPECS.BALL_MAX_SPEED);
                        ballTarget = new lugo4node_1.Lugo.Point();
                        ballTarget.setX(0);
                        ballTarget.setY(randomInteger(lugo4node_1.homeGoal.getBottomPole().getY(), lugo4node_1.homeGoal.getTopPole().getY()));
                        this.target_point_y = ballTarget.getY();
                        vect1 = new lugo4node_1.Lugo.Vector();
                        vect1.setX(ballTarget.getX() - ballPos.getX());
                        vect1.setY(ballTarget.getY() - ballPos.getY());
                        newVelocity.setDirection(vect1);
                        return [4 /*yield*/, this.remoteControl.setTurn(1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.remoteControl.setBallProps(ballPos, newVelocity)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MyBotTrainer.prototype.getInputs = function (snapshot) {
        var reader = new lugo4node_1.GameSnapshotReader(snapshot, lugo4node_1.Lugo.Team.Side.HOME);
        var me = reader.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, exports.PLAYER_NUM);
        if (!me) {
            throw new Error("did not find myself in the game");
        }
        var ballPos = reader.getBall().getPosition();
        // Distand to bottom pole
        var x = me.getPosition().getY(); // SPECS.FIELD_HEIGHT;
        // ball distanc in X axis
        var xDot = ballPos.getX(); // SPECS.FIELD_WIDTH;
        // ball distanc in Y axis
        var theta = ballPos.getY(); // SPECS.FIELD_HEIGHT;
        // ball velocity in X aix
        var thetaDot = reader.getBall().getVelocity().getDirection().getX(); // SPECS.FIELD_WIDTH;
        // console.log(`Inputs: `, [x, xDot, theta, thetaDot])
        return tf.tensor2d([[x, xDot, theta, thetaDot]]);
    };
    MyBotTrainer.prototype.play = function (orderSet, snapshot, action) {
        return __awaiter(this, void 0, void 0, function () {
            var reader, me, dir;
            return __generator(this, function (_a) {
                reader = new lugo4node_1.GameSnapshotReader(snapshot, lugo4node_1.Lugo.Team.Side.HOME);
                me = reader.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, exports.PLAYER_NUM);
                if (!me) {
                    throw new Error("did not find myself in the game");
                }
                dir = new lugo4node_1.Lugo.Vector();
                if (action === 0) {
                    dir.setX(1);
                }
                else if (action > 0) {
                    dir.setY(-1);
                }
                else if (action < 0) {
                    dir.setY(1);
                }
                // await delay(2000)
                // console.log()
                // console.log('========')
                console.log("dir: ", action, dir.getX(), dir.getY());
                orderSet.setDebugMessage("update");
                return [2 /*return*/, orderSet.setOrdersList([reader.makeOrderMoveFromVector(dir, lugo4node_1.SPECS.PLAYER_MAX_SPEED)])];
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
            var readerPrevious, reader, me, mePreviously, previousYDist, newYDist, done, reward;
            return __generator(this, function (_a) {
                readerPrevious = new lugo4node_1.GameSnapshotReader(previousSnapshot, lugo4node_1.Lugo.Team.Side.HOME);
                reader = new lugo4node_1.GameSnapshotReader(newSnapshot, lugo4node_1.Lugo.Team.Side.HOME);
                me = reader.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, exports.PLAYER_NUM);
                if (!me) {
                    throw new Error("did not find myself in the game");
                }
                mePreviously = readerPrevious.getPlayer(lugo4node_1.Lugo.Team.Side.HOME, exports.PLAYER_NUM);
                if (!mePreviously) {
                    throw new Error("did not find myself in the game");
                }
                previousYDist = Math.abs(mePreviously.getPosition().getY() - this.target_point_y);
                newYDist = Math.abs(me.getPosition().getY() - this.target_point_y);
                done = false;
                reward = 1;
                if (reader.getBall().getPosition().getX() <= lugo4node_1.SPECS.PLAYER_SIZE) {
                    done = true;
                    // if (newYDist < SPECS.PLAYER_SIZE) {
                    //     reward += 3;
                    // }
                }
                if (previousYDist <= newYDist) {
                    reward = -1;
                }
                // console.log({done, reward});
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
                        return [4 /*yield*/, this.remoteControl.setPlayerProps(side, number, randomPosition, randomVelocity)
                            // return new Promise(resolve => {resolve(true)})
                        ];
                    case 1: return [2 /*return*/, _a.sent()
                        // return new Promise(resolve => {resolve(true)})
                    ];
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
    return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
}
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
exports.delay = delay;
