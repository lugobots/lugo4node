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
var lugo4node_1 = require("@lugobots/lugo4node");
var my_bot_1 = require("./my_bot");
// training settings
var trainIterations = 50;
var stepsPerIteration = 240;
var grpcAddress = "localhost:5000";
var grpcInsecure = true;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var teamSide, map, initialRegion, lugoClient, rc, bot, gym;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                teamSide = lugo4node_1.Lugo.Team.Side.HOME;
                map = new lugo4node_1.Mapper(20, 10, lugo4node_1.Lugo.Team.Side.HOME);
                initialRegion = map.getRegion(5, 4);
                lugoClient = new lugo4node_1.Client(grpcAddress, grpcInsecure, "", teamSide, my_bot_1.TRAINING_PLAYER_NUMBER, initialRegion.getCenter());
                rc = new lugo4node_1.rl.RemoteControl();
                return [4 /*yield*/, rc.connect(grpcAddress)];
            case 1:
                _a.sent();
                bot = new my_bot_1.MyBotTrainer(rc);
                gym = new lugo4node_1.rl.Gym(rc, bot, myTrainingFunction, { debugging_log: false });
                // First, starting the game server
                // If you want to train playing against another bot, then you should start the other team first.
                // If you want to train using two teams, you should start the away team, then start the training bot, and finally start the home team
                // await gym.start(lugoClient)
                // if you want to train controlling all players, use the withZombiePlayers players to create zombie players.
                return [4 /*yield*/, gym.withZombiePlayers(grpcAddress).start(lugoClient)
                    // if you want to train against bots running randomly, you can use this helper
                    // await gym.withRandomMotionPlayers(grpcAddress, 10).start(lugoClient)
                    // if you want to train against bots chasing the ball, you can use this helper
                    // await gym.withChasersPlayers(grpcAddress).start(lugoClient)
                ];
            case 2:
                // First, starting the game server
                // If you want to train playing against another bot, then you should start the other team first.
                // If you want to train using two teams, you should start the away team, then start the training bot, and finally start the home team
                // await gym.start(lugoClient)
                // if you want to train controlling all players, use the withZombiePlayers players to create zombie players.
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
function myTrainingFunction(trainingCtrl) {
    return __awaiter(this, void 0, void 0, function () {
        var possibleAction, scores, i, j, sensors, action, _a, reward, done, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Let's training");
                    possibleAction = [
                        lugo4node_1.DIRECTION.FORWARD,
                        lugo4node_1.DIRECTION.BACKWARD,
                        lugo4node_1.DIRECTION.LEFT,
                        lugo4node_1.DIRECTION.RIGHT,
                        lugo4node_1.DIRECTION.BACKWARD_LEFT,
                        lugo4node_1.DIRECTION.BACKWARD_RIGHT,
                        lugo4node_1.DIRECTION.FORWARD_RIGHT,
                        lugo4node_1.DIRECTION.FORWARD_LEFT,
                    ];
                    scores = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < trainIterations)) return [3 /*break*/, 11];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 9, , 10]);
                    scores[i] = 0;
                    return [4 /*yield*/, trainingCtrl.setEnvironment({ iteration: i })];
                case 3:
                    _b.sent();
                    j = 0;
                    _b.label = 4;
                case 4:
                    if (!(j < stepsPerIteration)) return [3 /*break*/, 8];
                    return [4 /*yield*/, trainingCtrl.getState()];
                case 5:
                    sensors = _b.sent();
                    action = possibleAction[Math.floor(Math.random() * possibleAction.length)];
                    return [4 /*yield*/, trainingCtrl.update(action)];
                case 6:
                    _a = _b.sent(), reward = _a.reward, done = _a.done;
                    // now we should reward our model with the reward value
                    scores[i] += reward;
                    if (done) {
                        // no more steps
                        console.log("End of trainIteration ".concat(i, ", score: "), scores[i]);
                        return [3 /*break*/, 8];
                    }
                    _b.label = 7;
                case 7:
                    ++j;
                    return [3 /*break*/, 4];
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_1 = _b.sent();
                    console.error(e_1);
                    return [3 /*break*/, 10];
                case 10:
                    ++i;
                    return [3 /*break*/, 1];
                case 11: return [4 /*yield*/, trainingCtrl.stop()];
                case 12:
                    _b.sent();
                    console.log("Training is over, scores: ", scores);
                    return [2 /*return*/];
            }
        });
    });
}
