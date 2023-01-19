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
var trainIterations = 500;
var gamesPerIteration = 10;
var maxStepsPerGame = 60;
var hiddenLayerSizes = [4, 4];
var learningRate = 0.95;
var discountRate = 0.05;
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
                playerNumber = my_bot_1.PLAYER_NUM;
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
        var policyNet, optimizer, meanStepValues, t0, i, gameSteps, t1, stepsPerSecond;
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
                    hiddenLayerSizes.unshift(4); // adds the first layer
                    policyNet = new model_1.SaveablePolicyNetwork(hiddenLayerSizes);
                    console.log('DONE constructing new instance of SaveablePolicyNetwork');
                    _a.label = 4;
                case 4:
                    optimizer = tf.train.adam(learningRate);
                    meanStepValues = [];
                    t0 = new Date().getTime();
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < trainIterations)) return [3 /*break*/, 10];
                    console.log('train iteration ', i);
                    return [4 /*yield*/, policyNet.train(trainingCtrl, optimizer, discountRate, gamesPerIteration, maxStepsPerGame)];
                case 6:
                    gameSteps = _a.sent();
                    t1 = new Date().getTime();
                    stepsPerSecond = (0, model_1.sum)(gameSteps) / ((t1 - t0) / 1e3);
                    t0 = t1;
                    // trainSpeed.textContent = `${stepsPerSecond.toFixed(1)} steps/s`
                    meanStepValues.push({ x: i + 1, y: (0, model_1.mean)(gameSteps) });
                    //   console.log(`# of tensors: ${tf.memory().numTensors}`);
                    // plotSteps();
                    // onIterationEnd(i + 1, trainIterations);
                    return [4 /*yield*/, tf.nextFrame()];
                case 7:
                    //   console.log(`# of tensors: ${tf.memory().numTensors}`);
                    // plotSteps();
                    // onIterationEnd(i + 1, trainIterations);
                    _a.sent(); // Unblock UI thread.
                    return [4 /*yield*/, policyNet.saveModel(model_path)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    ++i;
                    return [3 /*break*/, 5];
                case 10:
                    console.log('Starting tests');
                    // let isDone = false;
                    // const cartPole = new CartPole(true);
                    // cartPole.setRandomState();
                    // let steps = 0;
                    // stopRequested = false;
                    // while (!isDone) {
                    //     steps++;
                    //     tf.tidy(() => {
                    //         const action = policyNet.getActions(cartPole.getStateTensor())[0];
                    //         logStatus(
                    //             `Test in progress. ` +
                    //             `Action: ${action === 1 ? '<--' : ' -->'} (Step ${steps})`);
                    //         isDone = cartPole.update(action);
                    //         renderCartPole(cartPole, cartPoleCanvas);
                    //     });
                    //     await tf.nextFrame();  // Unblock UI thread.
                    //     if (stopRequested) {
                    //         break;
                    //     }
                    // }
                    return [4 /*yield*/, trainingCtrl.stop()
                        // console.log(`Testing scores: `, testingScores)
                    ];
                case 11:
                    // let isDone = false;
                    // const cartPole = new CartPole(true);
                    // cartPole.setRandomState();
                    // let steps = 0;
                    // stopRequested = false;
                    // while (!isDone) {
                    //     steps++;
                    //     tf.tidy(() => {
                    //         const action = policyNet.getActions(cartPole.getStateTensor())[0];
                    //         logStatus(
                    //             `Test in progress. ` +
                    //             `Action: ${action === 1 ? '<--' : ' -->'} (Step ${steps})`);
                    //         isDone = cartPole.update(action);
                    //         renderCartPole(cartPole, cartPoleCanvas);
                    //     });
                    //     await tf.nextFrame();  // Unblock UI thread.
                    //     if (stopRequested) {
                    //         break;
                    //     }
                    // }
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
