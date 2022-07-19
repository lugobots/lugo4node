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
        while (_) try {
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RemoteControl_client;
"use strict";
var grpc = require("grpc");
var remote = require("../pb/remote_grpc_pb");
require("../pb/server_pb");
var RemoteControl = /** @class */ (function () {
    function RemoteControl() {
        _RemoteControl_client.set(this, void 0);
    }
    RemoteControl.prototype.connect = function (grpcAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            __classPrivateFieldSet(_this, _RemoteControl_client, new remote.RemoteClient(grpcAddress, grpc.credentials.createInsecure()), "f");
                            var deadline = new Date();
                            deadline.setSeconds(deadline.getSeconds() + 5);
                            __classPrivateFieldGet(_this, _RemoteControl_client, "f").waitForReady(deadline, function (err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve();
                                }
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RemoteControl.prototype.pauseResume = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pauseReq;
            var _this = this;
            return __generator(this, function (_a) {
                pauseReq = new proto.lugo.PauseResumeRequest();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = __classPrivateFieldGet(_this, _RemoteControl_client, "f").pauseOrResume(pauseReq, function (err) {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        });
                    })];
            });
        });
    };
    RemoteControl.prototype.nextTurn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextTurnReq;
            var _this = this;
            return __generator(this, function (_a) {
                nextTurnReq = new proto.lugo.NextTurnRequest();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = __classPrivateFieldGet(_this, _RemoteControl_client, "f").nextTurn(nextTurnReq, function (err) {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        });
                    })];
            });
        });
    };
    /**
     *
     * @param {proto.lugo.Point} position
     * @param {proto.lugo.Velocity} velocity
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    RemoteControl.prototype.setBallProps = function (position, velocity) {
        return __awaiter(this, void 0, void 0, function () {
            var ballPropReq;
            var _this = this;
            return __generator(this, function (_a) {
                ballPropReq = new proto.lugo.BallProperties();
                ballPropReq.setVelocity(velocity);
                ballPropReq.setPosition(position);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = __classPrivateFieldGet(_this, _RemoteControl_client, "f").setBallProperties(ballPropReq, function (err, commandResponsee) {
                            if (err) {
                                reject(err);
                            }
                            resolve(commandResponsee.getGameSnapshot());
                        });
                    })];
            });
        });
    };
    RemoteControl.prototype.setPlayerProps = function (teamSide, playerNumber, newPosition, newVelocity) {
        return __awaiter(this, void 0, void 0, function () {
            var playerProperties;
            var _this = this;
            return __generator(this, function (_a) {
                playerProperties = new proto.lugo.PlayerProperties();
                playerProperties.setVelocity(newVelocity);
                playerProperties.setPosition(newPosition);
                playerProperties.setSide(teamSide);
                playerProperties.setNumber(playerNumber);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = __classPrivateFieldGet(_this, _RemoteControl_client, "f").setPlayerProperties(playerProperties, function (err, commandResponsee) {
                            if (err) {
                                reject(err);
                            }
                            resolve(commandResponsee.getGameSnapshot());
                        });
                    })];
            });
        });
    };
    RemoteControl.prototype.setTurn = function (turnNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var gameProp;
            var _this = this;
            return __generator(this, function (_a) {
                gameProp = new proto.lugo.GameProperties();
                gameProp.setTurn(turnNumber);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = __classPrivateFieldGet(_this, _RemoteControl_client, "f").setGameProperties(gameProp, function (err, commandResponsee) {
                            if (err) {
                                reject(err);
                            }
                            resolve(commandResponsee.getGameSnapshot());
                        });
                    })];
            });
        });
    };
    return RemoteControl;
}());
_RemoteControl_client = new WeakMap();
module.exports = { RemoteControl: RemoteControl };
