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
exports.Client = exports.NewClientFromConfig = exports.PROTOCOL_VERSION = void 0;
var server_pb_js_1 = require("./pb/server_pb.js");
var server_grpc_pb_1 = require("./pb/server_grpc_pb");
var grpc_js_1 = require("@grpc/grpc-js");
var stub_js_1 = require("./stub.js");
var index_js_1 = require("./index.js");
exports.PROTOCOL_VERSION = "1.0.0";
/**
 *
 * @param {EnvVarLoader} config
 * @param {Point} initialPosition
 * @returns {Client}
 */
function NewClientFromConfig(config, initialPosition) {
    return new Client(config.getGrpcUrl(), config.getGrpcInsecure(), config.getBotToken(), config.getBotTeamSide(), config.getBotNumber(), initialPosition);
}
exports.NewClientFromConfig = NewClientFromConfig;
var Client = /** @class */ (function () {
    /**
     *
     * @param server_add {string}
     * @param grpc_insecure {boolean}
     * @param token {string}
     * @param teamSide {number}
     * @param number {number}
     * @param init_position {Point}
     * @return {Promise<void>}
     */
    function Client(server_add, grpc_insecure, token, teamSide, number, init_position) {
        /**
         * @type {function(GameSnapshot)}
         */
        this.gettingReadyHandler = function (gs) {
        };
        this.serverAdd = server_add;
        this.grpc_insecure = grpc_insecure;
        this.token = token;
        this.teamSide = teamSide;
        this.number = number;
        this.init_position = init_position;
    }
    /**
     *
     * @param {Bot} bot
     * @param {function()} onJoin
     * @returns {Promise<void>}
     */
    Client.prototype.playAsBot = function (bot, onJoin) {
        if (onJoin === void 0) { onJoin = function () {
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.setGettingReadyHandler(function (s) {
                        bot.gettingReady(s);
                    })._start(function (ordersSet, snapshot) {
                        return new Promise(function (resolve, reject) {
                            var playerState = (0, index_js_1.defineState)(snapshot, _this.number, _this.teamSide);
                            if (_this.number === 1) {
                                resolve(bot.asGoalkeeper(ordersSet, snapshot, playerState));
                                return;
                            }
                            switch (playerState) {
                                case stub_js_1.PLAYER_STATE.DISPUTING_THE_BALL:
                                    resolve(bot.onDisputing(ordersSet, snapshot));
                                    break;
                                case stub_js_1.PLAYER_STATE.DEFENDING:
                                    resolve(bot.onDefending(ordersSet, snapshot));
                                    break;
                                case stub_js_1.PLAYER_STATE.SUPPORTING:
                                    resolve(bot.onSupporting(ordersSet, snapshot));
                                    break;
                                case stub_js_1.PLAYER_STATE.HOLDING_THE_BALL:
                                    resolve(bot.onHolding(ordersSet, snapshot));
                                    break;
                            }
                        });
                    }, onJoin)];
            });
        });
    };
    /**
     *
     * @param {function} raw_processor
     * @param {function()} onJoin
     */
    Client.prototype.play = function (raw_processor, onJoin) {
        if (onJoin === void 0) { onJoin = function () {
        }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._start(raw_processor, onJoin)];
            });
        });
    };
    /**
     *
     * @param {function(GameSnapshot)} handler
     *
     * @returns {Client}
     */
    Client.prototype.setGettingReadyHandler = function (handler) {
        this.gettingReadyHandler = handler;
        return this;
    };
    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} processor
     * @param {function()} onJoin
     */
    Client.prototype._start = function (processor, onJoin) {
        if (onJoin === void 0) { onJoin = function () {
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var serverURL = "".concat(_this.serverAdd);
                            // the random guarantee that we will have multiple connections instead of using pool of connections
                            _this.client = new server_grpc_pb_1.GameClient(serverURL, grpc_js_1.credentials.createInsecure(), { "primary_user_agent": "agent ".concat(Math.random()) });
                            var deadline = new Date();
                            deadline.setSeconds(deadline.getSeconds() + 10);
                            _this.client.waitForReady(deadline, function (err) {
                                if (err) {
                                    reject(new Error("failed to connect to the Game Server at '".concat(serverURL, "': ").concat(err)));
                                }
                                console.log("connect to the gRPC server ".concat(_this.teamSide === server_pb_js_1.Team.Side.HOME ? "HOME" : "AWAY", "-").concat(_this.number));
                                var req = new server_pb_js_1.JoinRequest();
                                req.setToken(_this.token);
                                req.setProtocolVersion(exports.PROTOCOL_VERSION);
                                req.setTeamSide(_this.teamSide);
                                req.setNumber(_this.number);
                                req.setInitPosition(_this.init_position);
                                var running = _this.client.joinATeam(req);
                                onJoin();
                                running.on('data', function (snapshot) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, orderSet, e_1, e_2;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 11, , 12]);
                                                _a = snapshot.getState();
                                                switch (_a) {
                                                    case server_pb_js_1.GameSnapshot.State.LISTENING: return [3 /*break*/, 1];
                                                    case server_pb_js_1.GameSnapshot.State.GET_READY: return [3 /*break*/, 9];
                                                }
                                                return [3 /*break*/, 10];
                                            case 1:
                                                orderSet = new server_pb_js_1.OrderSet();
                                                orderSet.setTurn(snapshot.getTurn());
                                                _b.label = 2;
                                            case 2:
                                                _b.trys.push([2, 4, , 5]);
                                                return [4 /*yield*/, processor(orderSet, snapshot)];
                                            case 3:
                                                orderSet = _b.sent();
                                                return [3 /*break*/, 5];
                                            case 4:
                                                e_1 = _b.sent();
                                                console.error("bot error", e_1.message);
                                                return [3 /*break*/, 5];
                                            case 5:
                                                if (!orderSet) return [3 /*break*/, 7];
                                                return [4 /*yield*/, this.orderSetSender(orderSet)];
                                            case 6:
                                                _b.sent();
                                                return [3 /*break*/, 8];
                                            case 7:
                                                console.log("[turn #".concat(snapshot.getTurn(), "] bot did not return orders"));
                                                _b.label = 8;
                                            case 8: return [3 /*break*/, 10];
                                            case 9:
                                                this.gettingReadyHandler(snapshot);
                                                return [3 /*break*/, 10];
                                            case 10: return [3 /*break*/, 12];
                                            case 11:
                                                e_2 = _b.sent();
                                                console.error("internal error processing turn", e_2);
                                                return [3 /*break*/, 12];
                                            case 12: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                running.on('status', function () {
                                    // process status
                                    // console.log('status', status);
                                });
                                running.on('error', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        reject(new Error("error on team connection: ".concat(e)));
                                        return [2 /*return*/];
                                    });
                                }); });
                                running.on('end', function () {
                                    console.log("[".concat(_this.teamSide === server_pb_js_1.Team.Side.HOME ? "HOME" : "AWAY", "-").concat(_this.number, "] communication done"));
                                    resolve(null);
                                });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param {OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    Client.prototype.orderSetSender = function (orderSet) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.sendOrders(orderSet, function () {
                        })
                        // console.log(response.getPeer())
                    ];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
