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
var tf = require("@tensorflow/tfjs-node");
var lugo4node_1 = require("@lugobots/lugo4node");
var my_bot_1 = require("./my_bot");
var model_1 = require("./model");
// training settings
var trainIterations = 100;
var gamesPerIteration = 15;
var maxStepsPerGame = 60;
var hiddenLayerSizes = [16, 16];
var learningRate = 0.01;
var discountRate = 0.95;
var testingGames = 20;
var grpcAddress = "localhost:5000";
var grpcInsecure = true;
var model_path = "file://./model_output";
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var teamSide, playerNumber, map, initialRegion, lugoClient, rc, bot, gym;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                teamSide = lugo4node_1.Lugo.Team.Side.HOME;
                playerNumber = 5;
                map = new lugo4node_1.Mapper(10, 6, lugo4node_1.Lugo.Team.Side.HOME);
                initialRegion = map.getRegion(1, 1);
                lugoClient = new lugo4node_1.Client(grpcAddress, grpcInsecure, "", teamSide, playerNumber, initialRegion.getCenter());
                rc = new lugo4node_1.rl.RemoteControl();
                return [4 /*yield*/, rc.connect(grpcAddress)];
            case 1:
                _a.sent();
                bot = new my_bot_1.MyBotTrainer(rc);
                gym = new lugo4node_1.rl.Gym(rc, bot, myTrainingFunction, { debugging_log: false });
                return [4 /*yield*/, gym.withZombiePlayers(grpcAddress).start(lugoClient)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
function myTrainingFunction(trainingCtrl) {
    return __awaiter(this, void 0, void 0, function () {
        var policyNet, optimizer, iterationGamesMeans, t0, stopRequested, i, gameScores, t1, e_1, testingScores, _loop_1, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Let's training");
                    return [4 /*yield*/, model_1.SaveablePolicyNetwork.checkStoredModelStatus("".concat(model_path, "/model.json"))];
                case 1:
                    if (!((_a.sent()) != null)) return [3 /*break*/, 3];
                    console.log('Reloading model');
                    return [4 /*yield*/, model_1.SaveablePolicyNetwork.loadModel(model_path)];
                case 2:
                    policyNet = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    policyNet = new model_1.SaveablePolicyNetwork(hiddenLayerSizes);
                    console.log('DONE constructing new instance of SaveablePolicyNetwork');
                    _a.label = 4;
                case 4:
                    optimizer = tf.train.adam(learningRate);
                    iterationGamesMeans = [];
                    t0 = new Date().getTime();
                    stopRequested = false;
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < trainIterations)) return [3 /*break*/, 12];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 10, , 11]);
                    console.log("Starting iteration ".concat(i, " of ").concat(trainIterations));
                    return [4 /*yield*/, policyNet.train(trainingCtrl, optimizer, discountRate, gamesPerIteration, maxStepsPerGame)];
                case 7:
                    gameScores = _a.sent();
                    t1 = new Date().getTime();
                    t0 = t1;
                    console.log("iteration ".concat(i, "/").concat(trainIterations, " done, total score:"), gameScores);
                    iterationGamesMeans.push({ iteration: i + 1, means: gameScores });
                    // console.log(`# of tensors: ${tf.memory().numTensors}`);
                    return [4 /*yield*/, tf.nextFrame()];
                case 8:
                    // console.log(`# of tensors: ${tf.memory().numTensors}`);
                    _a.sent();
                    return [4 /*yield*/, policyNet.saveModel(model_path)];
                case 9:
                    _a.sent();
                    if (stopRequested) {
                        console.log('Training stopped by user.');
                        return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 11];
                case 11:
                    ++i;
                    return [3 /*break*/, 5];
                case 12:
                    if (!stopRequested) {
                        console.log('Training completed.');
                    }
                    console.log('Starting tests');
                    testingScores = [];
                    _loop_1 = function (i) {
                        var isDone_1, gameScores_1, _b, _c, testScore, e_2;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 6, , 7]);
                                    return [4 /*yield*/, trainingCtrl.setRandomState()];
                                case 1:
                                    _d.sent();
                                    isDone_1 = false;
                                    gameScores_1 = [];
                                    _d.label = 2;
                                case 2:
                                    if (!!isDone_1) return [3 /*break*/, 5];
                                    _c = (_b = tf).tidy;
                                    return [4 /*yield*/, (0, model_1.asyncToSync)(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var action, _a, _b, _c, done, reward;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        _b = (_a = policyNet).getActions;
                                                        return [4 /*yield*/, trainingCtrl.getInputs()];
                                                    case 1:
                                                        action = _b.apply(_a, [_d.sent()])[0];
                                                        return [4 /*yield*/, trainingCtrl.update(action)];
                                                    case 2:
                                                        _c = _d.sent(), done = _c.done, reward = _c.reward;
                                                        isDone_1 = done;
                                                        gameScores_1.push(reward);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 3:
                                    _c.apply(_b, [_d.sent()]);
                                    return [4 /*yield*/, tf.nextFrame()];
                                case 4:
                                    _d.sent(); // Unblock UI thread.
                                    return [3 /*break*/, 2];
                                case 5:
                                    testScore = (0, model_1.sum)(gameScores_1);
                                    testingScores.push({ test: i, mean: testScore.toFixed(2) });
                                    console.log("Test done, Score: ", testScore.toFixed(2));
                                    return [3 /*break*/, 7];
                                case 6:
                                    e_2 = _d.sent();
                                    console.error(e_2);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 13;
                case 13:
                    if (!(i < testingGames)) return [3 /*break*/, 16];
                    return [5 /*yield**/, _loop_1(i)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    ++i;
                    return [3 /*break*/, 13];
                case 16: return [4 /*yield*/, trainingCtrl.stop()];
                case 17:
                    _a.sent();
                    console.log("Testing scores: ", testingScores);
                    return [2 /*return*/];
            }
        });
    });
}
