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
var _Gym_coach, _Gym_gameServerAddress, _Gym_remoteControl;
var _a = require("./coach"), Coach = _a.Coach, delay = _a.delay;
var newZombiePlayer = require("./zombie").newZombiePlayer;
var Gym = /** @class */ (function () {
    /**
     *
     * @param {RemoteControl} remoteControl
     * @param trainableBot
     * @param {function(CoachStub):Promise} trainingFunction
     */
    function Gym(remoteControl, trainableBot, trainingFunction, options) {
        if (options === void 0) { options = { debugging_log: false }; }
        _Gym_coach.set(this, void 0);
        _Gym_gameServerAddress.set(this, void 0);
        /**
         * @type {RemoteControl}
         */
        _Gym_remoteControl.set(this, void 0);
        __classPrivateFieldSet(this, _Gym_remoteControl, remoteControl, "f");
        __classPrivateFieldSet(this, _Gym_coach, new Coach(remoteControl, trainableBot, trainingFunction), "f");
        __classPrivateFieldGet(this, _Gym_coach, "f").debugging_log = options.debugging_log;
    }
    Gym.prototype.start = function (lugoClient) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lugoClient.setGettingReadyHandler(function (snapshot) {
                            return __classPrivateFieldGet(_this, _Gym_coach, "f").gettingReady(snapshot);
                        }).play(function (orderSet, snapshot) {
                            return __classPrivateFieldGet(_this, _Gym_coach, "f").gameTurnHandler(orderSet, snapshot);
                        }, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!__classPrivateFieldGet(this, _Gym_gameServerAddress, "f")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, completeWithZombies(__classPrivateFieldGet(this, _Gym_gameServerAddress, "f"))];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [4 /*yield*/, __classPrivateFieldGet(this, _Gym_remoteControl, "f").nextTurn()];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
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
        __classPrivateFieldSet(this, _Gym_gameServerAddress, gameServerAddress, "f");
        return this;
    };
    return Gym;
}());
_Gym_coach = new WeakMap(), _Gym_gameServerAddress = new WeakMap(), _Gym_remoteControl = new WeakMap();
function completeWithZombies(gameServerAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i <= 11)) return [3 /*break*/, 5];
                    return [4 /*yield*/, newZombiePlayer(proto.lugo.Team.Side.HOME, i, gameServerAddress)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, newZombiePlayer(proto.lugo.Team.Side.AWAY, i, gameServerAddress)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
module.exports = { Gym: Gym };
