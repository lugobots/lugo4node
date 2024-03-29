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
exports.RemoteControl = void 0;
var grpc = require("@grpc/grpc-js");
var remote = require("../pb/remote_grpc_pb");
var remote_pb_1 = require("../pb/remote_pb");
var RemoteControl = /** @class */ (function () {
    function RemoteControl() {
    }
    RemoteControl.prototype.connect = function (grpcAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            _this.client = new remote.RemoteClient(grpcAddress, grpc.credentials.createInsecure());
                            var deadline = new Date();
                            deadline.setSeconds(deadline.getSeconds() + 5);
                            _this.client.waitForReady(deadline, function (err) {
                                if (err) {
                                    console.log("ERROR: ", err);
                                    reject(err);
                                    return;
                                }
                                resolve();
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
                pauseReq = new remote_pb_1.PauseResumeRequest();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = _this.client.pauseOrResume(pauseReq, function (err) {
                            if (err) {
                                console.log("ERROR: ", err);
                                reject(err);
                                return;
                            }
                            resolve();
                        });
                    })];
            });
        });
    };
    RemoteControl.prototype.resumeListening = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            var _this = this;
            return __generator(this, function (_a) {
                req = new remote_pb_1.ResumeListeningRequest();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = _this.client.resumeListeningPhase(req, function (err) {
                            if (err) {
                                console.log("ERROR: ", err);
                                reject(err);
                                return;
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
                nextTurnReq = new remote_pb_1.NextTurnRequest();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = _this.client.nextTurn(nextTurnReq, function (err) {
                            if (err) {
                                console.log("ERROR: ", err);
                                reject(err);
                                return;
                            }
                            resolve();
                        });
                    })];
            });
        });
    };
    RemoteControl.prototype.setBallProps = function (position, velocity) {
        return __awaiter(this, void 0, void 0, function () {
            var ballPropReq;
            var _this = this;
            return __generator(this, function (_a) {
                ballPropReq = new remote_pb_1.BallProperties();
                ballPropReq.setVelocity(velocity);
                ballPropReq.setPosition(position);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = _this.client.setBallProperties(ballPropReq, function (err, commandResponse) {
                            if (err) {
                                console.log("ERROR: ballPropReq", ballPropReq, err);
                                reject(err);
                                return;
                            }
                            resolve(commandResponse.getGameSnapshot());
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
                playerProperties = new remote_pb_1.PlayerProperties();
                playerProperties.setVelocity(newVelocity);
                playerProperties.setPosition(newPosition);
                playerProperties.setSide(teamSide);
                playerProperties.setNumber(playerNumber);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = _this.client.setPlayerProperties(playerProperties, function (err, commandResponse) {
                            if (err) {
                                console.log("ERROR: (playerProperties)", err);
                                reject(err);
                                return;
                            }
                            resolve(commandResponse.getGameSnapshot());
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
                gameProp = new remote_pb_1.GameProperties();
                gameProp.setTurn(turnNumber);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var resp = _this.client.setGameProperties(gameProp, function (err, commandResponse) {
                            if (err) {
                                console.log("ERROR: ", err);
                                reject(err);
                                return;
                            }
                            resolve(commandResponse.getGameSnapshot());
                        });
                    })];
            });
        });
    };
    return RemoteControl;
}());
exports.RemoteControl = RemoteControl;
