"use strict";
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
exports.sum = exports.mean = exports.asyncToSync = exports.SaveablePolicyNetwork = void 0;
var tf = require("@tensorflow/tfjs-node");
var inputCount = 3;
var outputCount = 4;
var PolicyNetwork = /** @class */ (function () {
    /**
     * Constructor of PolicyNetwork.
     * @param {number | number[] | tf.LayersModel} hiddenLayerSizes
     *   Can be any of the following
     *   - Size of the hidden layer, as a single number (for a single hidden
     *     layer)
     *   - An Array of numbers (for any number of hidden layers).
     *   - An instance of tf.LayersModel.
     */
    function PolicyNetwork(hiddenLayerSizesOrModel) {
        if (hiddenLayerSizesOrModel instanceof tf.LayersModel) {
            this.policyNet = hiddenLayerSizesOrModel;
        }
        else {
            console.log("CREAD TE");
            this.createPolicyNetwork(hiddenLayerSizesOrModel);
        }
    }
    /**
     * Create the underlying model of this policy network.
     *
     * @param {number | number[]} hiddenLayerSizes Size of the hidden layer, as
     *   a single number (for a single hidden layer) or an Array of numbers (for
     *   any number of hidden layers).
     */
    PolicyNetwork.prototype.createPolicyNetwork = function (hiddenLayerSizes) {
        var _this = this;
        if (!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }
        this.policyNet = tf.sequential();
        hiddenLayerSizes.forEach(function (hiddenLayerSize, i) {
            _this.policyNet.add(tf.layers.dense({
                units: hiddenLayerSize,
                activation: 'relu',
                // `inputShape` is required only for the first layer.
                inputShape: i === 0 ? [inputCount] : undefined
            }));
        });
        this.policyNet.add(tf.layers.dense({ units: outputCount, activation: 'softmax' }));
    };
    /**
     * Train the policy network's model.
     *
     * @param {rl.TrainingController} trainingCtrl
     * @param {tf.train.Optimizer} optimizer An instance of TensorFlow.js
     *   Optimizer to use for training.
     * @param {number} discountRate Reward discounting rate: a number between 0
     *   and 1.
     * @param {number} numGames Number of game to play for each model parameter
     *   update.
     * @param {number} maxStepsPerGame Maximum number of steps to perform during
     *   a game. If this number is reached, the game will end immediately.
     * @returns {Promise<number[]>} The number of steps completed in the `numGames` games
     *   in this round of training.
     */
    PolicyNetwork.prototype.train = function (trainingCtrl, optimizer, discountRate, numGames, maxStepsPerGame) {
        return __awaiter(this, void 0, void 0, function () {
            var allGradients, allRewards, gameScore, i, gameRewards, gameGradients, j, gradients, _a, _b, _c, done, reward, isDone;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        allGradients = [];
                        allRewards = [];
                        gameScore = [];
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < numGames)) return [3 /*break*/, 10];
                        console.log("Starting game ".concat(i, "/").concat(numGames));
                        return [4 /*yield*/, trainingCtrl.setRandomState()];
                    case 2:
                        _d.sent();
                        gameRewards = [];
                        gameGradients = [];
                        j = 0;
                        _d.label = 3;
                    case 3:
                        if (!(j < maxStepsPerGame)) return [3 /*break*/, 7];
                        _b = (_a = tf).tidy;
                        return [4 /*yield*/, asyncToSync(function () { return __awaiter(_this, void 0, void 0, function () {
                                var inputTensor;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, trainingCtrl.getInputs()];
                                        case 1:
                                            inputTensor = _a.sent();
                                            return [2 /*return*/, this.getGradientsAndSaveActions(inputTensor).grads];
                                    }
                                });
                            }); })];
                    case 4:
                        gradients = _b.apply(_a, [_d.sent()]);
                        this.pushGradients(gameGradients, gradients);
                        return [4 /*yield*/, trainingCtrl.update(this.currentActions_)];
                    case 5:
                        _c = _d.sent(), done = _c.done, reward = _c.reward;
                        isDone = done;
                        // console.log(`game ${i}, step ${j}, reward`, reward)
                        gameRewards.push(reward);
                        if (isDone) {
                            //   When the game ends before max step count is reached, a reward of
                            //   0 is given.
                            return [3 /*break*/, 7];
                        }
                        _d.label = 6;
                    case 6:
                        ++j;
                        return [3 /*break*/, 3];
                    case 7:
                        gameScore.push({ game: i, score: sum(gameRewards) });
                        this.pushGradients(allGradients, gameGradients);
                        allRewards.push(gameRewards);
                        return [4 /*yield*/, tf.nextFrame()];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9:
                        ++i;
                        return [3 /*break*/, 1];
                    case 10:
                        tf.tidy(function () {
                            // The following line does three things:
                            // 1. Performs reward discounting, i.e., make recent rewards count more
                            //    than rewards from the further past. The effect is that the reward
                            //    values from a game with many steps become larger than the values
                            //    from a game with fewer steps.
                            // 2. Normalize the rewards, i.e., subtract the global mean value of the
                            //    rewards and divide the result by the global standard deviation of
                            //    the rewards. Together with step 1, this makes the rewards from
                            //    long-lasting games positive and rewards from short-lasting
                            //    negative.
                            // 3. Scale the gradients with the normalized reward values.
                            var normalizedRewards = discountAndNormalizeRewards(allRewards, discountRate);
                            // Add the scaled gradients to the weights of the policy network. This
                            // step makes the policy network more likely to make choices that lead
                            // to long-lasting games in the future (i.e., the crux of this RL
                            // algorithm.)
                            optimizer.applyGradients(scaleAndAverageGradients(allGradients, normalizedRewards));
                        });
                        tf.dispose(allGradients);
                        return [2 /*return*/, gameScore];
                }
            });
        });
    };
    PolicyNetwork.prototype.getGradientsAndSaveActions = function (inputTensor) {
        var _this = this;
        return tf.variableGrads(function () {
            return tf.tidy(function () {
                var _a = _this.getLogitsAndActions(inputTensor), logits = _a[0], actions = _a[1];
                //  console.log(`ACTION: `, actions, logits)
                _this.currentActions_ = actions.argMax(-1).dataSync()[0];
                var labels = tf.sub(1, tf.tensor2d(actions.dataSync(), actions.shape));
                return tf.losses.sigmoidCrossEntropy(labels, logits);
            });
        });
    };
    PolicyNetwork.prototype.getCurrentActions = function () {
        return this.currentActions_;
    };
    /**
     * Get policy-network logits and the action based on state-tensor inputs.
     *
     * @param {tf.Tensor} inputs A tf.Tensor instance of shape `[batchSize, 4]`.
     * @returns {[tf.Tensor, tf.Tensor]}
     *   1. The logits tensor, of shape `[batchSize, 1]`.
     *   2. The actions tensor, of shape `[batchSize, 1]`.
     */
    PolicyNetwork.prototype.getLogitsAndActions = function (inputs) {
        var _this = this;
        return tf.tidy(function () {
            var logits = _this.policyNet.predict(inputs);
            // Get the probability of the leftward action.
            var probabilities = tf.sigmoid(logits);
            // Probabilites of the left and right actions.
            // const leftRightProbs = tf.concat([leftProb, tf.sub(1, leftProb)], 1);
            // const actions = tf.multinomial(leftRightProbs, 1, null, false);
            return [logits, probabilities];
        });
    };
    /**
     * Get actions based on a state-tensor input.
     *
     * @param {tf.Tensor} inputs A tf.Tensor instance of shape `[batchSize, 4]`.
     * @param {Float32Array} inputs The actions for the inputs, with length
     *   `batchSize`.
     */
    PolicyNetwork.prototype.getActions = function (inputs) {
        return this.getLogitsAndActions(inputs)[1].dataSync();
    };
    /**
     * Push a new dictionary of gradients into records.
     *
     * @param {{[varName: string]: tf.Tensor[]}} record The record of variable
     *   gradient: a map from variable name to the Array of gradient values for
     *   the variable.
     * @param {{[varName: string]: tf.Tensor}} gradients The new gradients to push
     *   into `record`: a map from variable name to the gradient Tensor.
     */
    PolicyNetwork.prototype.pushGradients = function (record, gradients) {
        for (var key in gradients) {
            if (key in record) {
                record[key].push(gradients[key]);
            }
            else {
                record[key] = [gradients[key]];
            }
        }
    };
    return PolicyNetwork;
}());
/**
 * A subclass of PolicyNetwork that supports saving and loading.
 */
var SaveablePolicyNetwork = /** @class */ (function (_super) {
    __extends(SaveablePolicyNetwork, _super);
    /**
     * Constructor of SaveablePolicyNetwork
     *
     * @param {number | number[]} hiddenLayerSizesOrModel
     */
    function SaveablePolicyNetwork(hiddenLayerSizesOrModel) {
        return _super.call(this, hiddenLayerSizesOrModel) || this;
    }
    /**
     * Save the model to IndexedDB.
     */
    SaveablePolicyNetwork.prototype.saveModel = function (modelPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.policyNet.save(modelPath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Load the model fom IndexedDB.
     *
     * @returns {SaveablePolicyNetwork} The instance of loaded
     *   `SaveablePolicyNetwork`.
     * @throws {Error} If no model can be found in IndexedDB.
     */
    SaveablePolicyNetwork.loadModel = function (modelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tf.loadLayersModel("".concat(modelPath, "/model.json"))];
                    case 1:
                        model = _a.sent();
                        console.log("Loaded model from ".concat(modelPath));
                        return [2 /*return*/, new SaveablePolicyNetwork(model)];
                }
            });
        });
    };
    /**
     * Check the status of locally saved model.
     *
     * @returns If the locally saved model exists, the model info as a JSON
     *   object. Else, `undefined`.
     */
    SaveablePolicyNetwork.checkStoredModelStatus = function (modelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tf.loadLayersModel(modelPath)["catch"](function (ee) {
                            console.log("did not load the model", ee);
                        })];
                    case 1:
                        model = _a.sent();
                        return [2 /*return*/, model];
                }
            });
        });
    };
    /**
     * Remove the locally saved model from IndexedDB.
     */
    SaveablePolicyNetwork.prototype.removeModel = function (modelPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tf.io.removeModel(modelPath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the sizes of the hidden layers.
     *
     * @returns {number | number[]} If the model has only one hidden layer,
     *   return the size of the layer as a single number. If the model has
     *   multiple hidden layers, return the sizes as an Array of numbers.
     */
    SaveablePolicyNetwork.prototype.hiddenLayerSizes = function () {
        var sizes = [];
        for (var i = 0; i < this.policyNet.layers.length - 1; ++i) {
            sizes.push(this.policyNet.layers[i].units);
        }
        return sizes.length === 1 ? sizes[0] : sizes;
    };
    return SaveablePolicyNetwork;
}(PolicyNetwork));
exports.SaveablePolicyNetwork = SaveablePolicyNetwork;
/**
 * Discount the reward values.
 *
 * @param {number[]} rewards The reward values to be discounted.
 * @param {number} discountRate Discount rate: a number between 0 and 1, e.g.,
 *   0.95.
 * @returns {tf.Tensor} The discounted reward values as a 1D tf.Tensor.
 */
function discountRewards(rewards, discountRate) {
    var discountedBuffer = tf.buffer([rewards.length]);
    var prev = 0;
    for (var i = rewards.length - 1; i >= 0; --i) {
        var current = discountRate * prev + rewards[i];
        discountedBuffer.set(current, i);
        prev = current;
    }
    return discountedBuffer.toTensor();
}
/**
 * Discount and normalize reward values.
 *
 * This function performs two steps:
 *
 * 1. Discounts the reward values using `discountRate`.
 * 2. Normalize the reward values with the global reward mean and standard
 *    deviation.
 *
 * @param {number[][]} rewardSequences Sequences of reward values.
 * @param {number} discountRate Discount rate: a number between 0 and 1, e.g.,
 *   0.95.
 * @returns {tf.Tensor[]} The discounted and normalize reward values as an
 *   Array of tf.Tensor.
 */
function discountAndNormalizeRewards(rewardSequences, discountRate) {
    return tf.tidy(function () {
        var discounted = [];
        for (var _i = 0, rewardSequences_1 = rewardSequences; _i < rewardSequences_1.length; _i++) {
            var sequence = rewardSequences_1[_i];
            discounted.push(discountRewards(sequence, discountRate));
        }
        // Compute the overall mean and stddev.
        var concatenated = tf.concat(discounted);
        var mean = tf.mean(concatenated);
        var std = tf.sqrt(tf.mean(tf.square(concatenated.sub(mean))));
        // Normalize the reward sequences using the mean and std.
        var normalized = discounted.map(function (rs) { return rs.sub(mean).div(std); });
        return normalized;
    });
}
/**
 * Scale the gradient values using normalized reward values and compute average.
 *
 * The gradient values are scaled by the normalized reward values. Then they
 * are averaged across all games and all steps.
 *
 * @param {{[varName: string]: tf.Tensor[][]}} allGradients A map from variable
 *   name to all the gradient values for the variable across all games and all
 *   steps.
 * @param {tf.Tensor[]} normalizedRewards An Array of normalized reward values
 *   for all the games. Each element of the Array is a 1D tf.Tensor of which
 *   the length equals the number of steps in the game.
 * @returns {{[varName: string]: tf.Tensor}} Scaled and averaged gradients
 *   for the variables.
 */
function scaleAndAverageGradients(allGradients, normalizedRewards) {
    return tf.tidy(function () {
        var gradients = {};
        var _loop_1 = function (varName) {
            gradients[varName] = tf.tidy(function () {
                // Stack gradients together.
                var varGradients = allGradients[varName].map(function (varGameGradients) { return tf.stack(varGameGradients); });
                // Expand dimensions of reward tensors to prepare for multiplication
                // with broadcasting.
                var expandedDims = [];
                for (var i = 0; i < varGradients[0].rank - 1; ++i) {
                    expandedDims.push(1);
                }
                var reshapedNormalizedRewards = normalizedRewards.map(function (rs) { return rs.reshape(rs.shape.concat(expandedDims)); });
                for (var g = 0; g < varGradients.length; ++g) {
                    // This mul() call uses broadcasting.
                    varGradients[g] = varGradients[g].mul(reshapedNormalizedRewards[g]);
                }
                // Concatenate the scaled gradients together, then average them across
                // all the steps of all the games.
                return tf.mean(tf.concat(varGradients, 0), 0);
            });
        };
        for (var varName in allGradients) {
            _loop_1(varName);
        }
        return gradients;
    });
}
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
exports.asyncToSync = asyncToSync;
/**
 * Calculate the mean of an Array of numbers.
 *
 * @param {number[]} xs
 * @returns {number} The arithmetic mean of `xs`
 */
function mean(xs) {
    return sum(xs) / xs.length;
}
exports.mean = mean;
/**
 * Calculate the sum of an Array of numbers.
 *
 * @param {number[]} xs
 * @returns {number} The sum of `xs`.
 * @throws Error if `xs` is empty.
 */
function sum(xs) {
    if (xs.length === 0) {
        throw new Error('Expected xs to be a non-empty Array.');
    }
    else {
        return xs.reduce(function (x, prev) { return prev + x; });
    }
}
exports.sum = sum;
module.exports = { SaveablePolicyNetwork: SaveablePolicyNetwork, asyncToSync: asyncToSync, mean: mean, sum: sum };
