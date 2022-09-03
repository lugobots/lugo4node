var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _Coach_remoteControl, _Coach_onReady, _Coach_trainingHasStarted, _Coach_lastSnapshot, _Coach_waitingForAction, _Coach_cycle_seq, _Coach_bot, _Coach_stopRequested, _Coach_gotNewAction;
var RemoteControl = require("./remote_control").RemoteControl;
var BotStub = require('../stub').BotStub;
var TrainableBot = require('./stubs').TrainableBot;
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var Coach = /** @class */ (function (_super) {
    __extends(Coach, _super);
    /**
     * @param {RemoteControl} remoteControl
     * @param {TrainableBot} bot
     * @param {function} onReadyCallback
     */
    function Coach(remoteControl, bot, onReadyCallback) {
        var _this = _super.call(this) || this;
        /**
         * @type {RemoteControl}
         */
        _Coach_remoteControl.set(_this, void 0);
        _Coach_onReady.set(_this, void 0);
        _Coach_trainingHasStarted.set(_this, false
        /**
         * @type {proto.lugo.GameSnapshot}
         */
        );
        /**
         * @type {proto.lugo.GameSnapshot}
         */
        _Coach_lastSnapshot.set(_this, void 0);
        _Coach_waitingForAction.set(_this, false);
        _Coach_cycle_seq.set(_this, 0
        /**
         * @type {TrainableBot}
         */
        );
        /**
         * @type {TrainableBot}
         */
        _Coach_bot.set(_this, void 0);
        _this.debugging_log = true;
        _Coach_stopRequested.set(_this, false
        /**
         *
         * @param action
         * @returns {Promise<proto.lugo.GameSnapshot>}
         */
        );
        /**
         *
         * @param action
         * @returns {Promise<proto.lugo.GameSnapshot>}
         */
        _Coach_gotNewAction.set(_this, function (action) {
            console.error('gotNewAction not defined yet');
            return Promise.reject();
        }
        /**
         * @param {RemoteControl} remoteControl
         * @param {TrainableBot} bot
         * @param {function} onReadyCallback
         */
        );
        _this._gotNextState = function () {
            _this._debug("No one waiting for the next state");
        };
        __classPrivateFieldSet(_this, _Coach_onReady, onReadyCallback, "f");
        __classPrivateFieldSet(_this, _Coach_bot, bot, "f");
        __classPrivateFieldSet(_this, _Coach_remoteControl, remoteControl, "f");
        return _this;
    }
    /**
     * Set the state of match randomly.
     */
    Coach.prototype.setRandomState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._debug("Reset state");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = [this, _Coach_lastSnapshot];
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Coach_bot, "f").createNewInitialState()];
                    case 2:
                        __classPrivateFieldSet.apply(void 0, _a.concat([_b.sent(), "f"]));
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error("failed to set a random state", e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Coach.prototype.getStateTensor = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                try {
                    __classPrivateFieldSet(this, _Coach_cycle_seq, (_a = __classPrivateFieldGet(this, _Coach_cycle_seq, "f"), _a++, _a), "f");
                    this._debug("get state");
                    return [2 /*return*/, __classPrivateFieldGet(this, _Coach_bot, "f").getInputs(__classPrivateFieldGet(this, _Coach_lastSnapshot, "f"))];
                }
                catch (e) {
                    console.error("failed to get the new state", e);
                }
                return [2 /*return*/];
            });
        });
    };
    Coach.prototype.update = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var previousState, _a, _b, done, reward;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this._debug("UPDATE");
                        if (!__classPrivateFieldGet(this, _Coach_waitingForAction, "f")) {
                            throw new Error("faulty synchrony - got a new action when was still processing the last one");
                        }
                        previousState = __classPrivateFieldGet(this, _Coach_lastSnapshot, "f");
                        this._debug("got action for turn ".concat(__classPrivateFieldGet(this, _Coach_lastSnapshot, "f").getTurn()));
                        _a = [this, _Coach_lastSnapshot];
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Coach_gotNewAction, "f").call(this, action)];
                    case 1:
                        __classPrivateFieldSet.apply(void 0, _a.concat([_c.sent(), "f"]));
                        this._debug("got new snapshot after order has been sent");
                        if (__classPrivateFieldGet(this, _Coach_stopRequested, "f")) {
                            return [2 /*return*/, { done: true, reward: 0 }];
                        }
                        // TODO: if I want to skip the net N turns? I should be able too
                        this._debug("update finished (turn ".concat(__classPrivateFieldGet(this, _Coach_lastSnapshot, "f").getTurn(), " waiting for next action}"));
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Coach_bot, "f").evaluate(previousState, __classPrivateFieldGet(this, _Coach_lastSnapshot, "f"))];
                    case 2:
                        _b = _c.sent(), done = _b.done, reward = _b.reward;
                        return [2 /*return*/, { done: done, reward: reward }];
                }
            });
        });
    };
    Coach.prototype.gettingReady = function (snapshot) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!__classPrivateFieldGet(this, _Coach_trainingHasStarted, "f")) return [3 /*break*/, 2];
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Coach_remoteControl, "f").nextTurn()["catch"](function (e) {
                                console.error("could not request next turnB", e);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Coach.prototype.gameTurnHandler = function (orderSet, snapshot) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._debug("new turn");
                        if (__classPrivateFieldGet(this, _Coach_waitingForAction, "f")) {
                            throw new Error("faulty synchrony - got new turn while waiting for order (check the lugo 'timer-mode')");
                        }
                        this._gotNextState(snapshot);
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var maxWait;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    maxWait = setTimeout(function () {
                                        if (__classPrivateFieldGet(_this, _Coach_stopRequested, "f")) {
                                            return resolve(orderSet);
                                        }
                                        console.log("max wait for a new action");
                                        reject();
                                    }, 5000);
                                    if (__classPrivateFieldGet(this, _Coach_stopRequested, "f")) {
                                        this._debug("stop requested - will not defined call back for new actions");
                                        resolve(orderSet);
                                        clearTimeout(maxWait);
                                        return [2 /*return*/, null];
                                    }
                                    __classPrivateFieldSet(this, _Coach_gotNewAction, function (newAction) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            this._debug("sending new action");
                                            clearTimeout(maxWait);
                                            return [2 /*return*/, new Promise(function (resolveTurn, rejectTurn) {
                                                    try {
                                                        __classPrivateFieldSet(_this, _Coach_waitingForAction, false, "f");
                                                        _this._gotNextState = function (newState) {
                                                            _this._debug("Returning result for new action (snapshot of turn ".concat(newState.getTurn(), ")"));
                                                            resolveTurn(newState);
                                                        };
                                                        _this._debug("sending order for turn ".concat(snapshot.getTurn(), " based on action"));
                                                        __classPrivateFieldGet(_this, _Coach_bot, "f").play(orderSet, snapshot, newAction).then(function (orderSet) {
                                                            resolve(orderSet);
                                                            _this._debug("order sent, calling next turn", orderSet);
                                                            return delay(80);
                                                        }).then(function () {
                                                            __classPrivateFieldGet(_this, _Coach_remoteControl, "f").nextTurn();
                                                        });
                                                    }
                                                    catch (e) {
                                                        reject();
                                                        rejectTurn();
                                                        console.error("failed to send the orders to the server", e);
                                                    }
                                                })];
                                        });
                                    }); }, "f");
                                    __classPrivateFieldSet(this, _Coach_waitingForAction, true, "f");
                                    this._debug("gotNewAction defined, waiting for action (has started: ".concat(__classPrivateFieldGet(this, _Coach_trainingHasStarted, "f"), ")"));
                                    if (!__classPrivateFieldGet(this, _Coach_trainingHasStarted, "f")) {
                                        __classPrivateFieldGet(this, _Coach_onReady, "f").call(this, this);
                                        __classPrivateFieldSet(this, _Coach_trainingHasStarted, true, "f");
                                        this._debug("the training has started");
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Coach.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                __classPrivateFieldSet(this, _Coach_stopRequested, true, "f");
                return [2 /*return*/];
            });
        });
    };
    Coach.prototype._debug = function (msg) {
        if (this.debugging_log) {
            console.log("[".concat(__classPrivateFieldGet(this, _Coach_cycle_seq, "f"), "] ").concat(msg));
        }
    };
    return Coach;
}(BotStub));
_Coach_remoteControl = new WeakMap(), _Coach_onReady = new WeakMap(), _Coach_trainingHasStarted = new WeakMap(), _Coach_lastSnapshot = new WeakMap(), _Coach_waitingForAction = new WeakMap(), _Coach_cycle_seq = new WeakMap(), _Coach_bot = new WeakMap(), _Coach_stopRequested = new WeakMap(), _Coach_gotNewAction = new WeakMap();
function asyncToSync(asyncOriginalFunc) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, asyncOriginalFunc()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, function () {
                            return result;
                        }];
            }
        });
    });
}
module.exports = { Coach: Coach, delay: delay };
