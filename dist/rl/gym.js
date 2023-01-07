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
exports.Gym = void 0;
var trainingCrl_1 = require("./trainingCrl");
var zombie_1 = require("./zombie");
var server_pb_js_1 = require("../pb/server_pb.js");
var Gym = /** @class */ (function () {
    function Gym(remoteControl, trainer, trainingFunction, options) {
        if (options === void 0) { options = { debugging_log: false }; }
        this.remoteControl = remoteControl;
        this.trainingCrl = new trainingCrl_1.TrainingCrl(remoteControl, trainer, trainingFunction);
        this.trainingCrl.debugging_log = options.debugging_log;
    }
    Gym.prototype.start = function (lugoClient) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lugoClient.setGettingReadyHandler(function (snapshot) {
                            return _this.trainingCrl.onGettingReadyState(snapshot);
                        }).play(function (orderSet, snapshot) {
                            return _this.trainingCrl.gameTurnHandler(orderSet, snapshot);
                        }, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!this.gameServerAddress) return [3 /*break*/, 2];
                                        return [4 /*yield*/, completeWithZombies(this.gameServerAddress)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gym.prototype.withZombiePlayers = function (gameServerAddress) {
        this.gameServerAddress = gameServerAddress;
        return this;
    };
    return Gym;
}());
exports.Gym = Gym;
function completeWithZombies(gameServerAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i <= 11)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, zombie_1.newZombiePlayer)(server_pb_js_1.Team.Side.HOME, i, gameServerAddress)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, trainingCrl_1.delay)(50)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, zombie_1.newZombiePlayer)(server_pb_js_1.Team.Side.AWAY, i, gameServerAddress)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, trainingCrl_1.delay)(50)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
