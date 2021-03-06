const tf = require('@tensorflow/tfjs-node');

const inputCount = 3
const outputCount = 8

class PolicyNetwork {

    /**
     * Constructor of PolicyNetwork.
     *
     * @param {number | number[] | tf.LayersModel} hiddenLayerSizes
     *   Can be any of the following
     *   - Size of the hidden layer, as a single number (for a single hidden
     *     layer)
     *   - An Array of numbers (for any number of hidden layers).
     *   - An instance of tf.LayersModel.
     */
    constructor(hiddenLayerSizesOrModel) {
        if (hiddenLayerSizesOrModel instanceof tf.LayersModel) {
            this.policyNet = hiddenLayerSizesOrModel;
        } else {
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
    createPolicyNetwork(hiddenLayerSizes) {
        if (!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }
        this.policyNet = tf.sequential();
        hiddenLayerSizes.forEach((hiddenLayerSize, i) => {
            this.policyNet.add(tf.layers.dense({
                units: hiddenLayerSize,
                activation: 'elu',
                // `inputShape` is required only for the first layer.
                inputShape: i === 0 ? [inputCount] : undefined
            }));
        });
        this.policyNet.add(tf.layers.dense({units: outputCount}));
    }

    /**
     * Train the policy network's model.
     *
     * @param {CoachStub} coach A trainable Lugo bot.
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
    async train(
        coach, optimizer, discountRate, numGames, maxStepsPerGame) {
        const allGradients = [];
        const allRewards = [];
        const gameScore = [];
        // this.policyNet .summary()

        // console.log(`Starting iteration=======================`)
        // for(const i in this.policyNet.layers) {
            // console.log(`Layer ${i}`)
            // this.policyNet.layers[i].getWeights()[0].print()
        // }
        // console.log(`=======================`)


        for (let i = 0; i < numGames; ++i) {


            await coach.setRandomState();
            const gameRewards = [];
            const gameGradients = [];
            for (let j = 0; j < maxStepsPerGame; ++j) {
                // For every step of the game, remember gradients of the policy
                // network's weights with respect to the probability of the action
                // choice that lead to the reward.
                const gradients = tf.tidy(await asyncToSync(async () => {
                    // console.log(`BLA BLA XXXXX`)
                    const inputTensor = await coach.getStateTensor();
                    // console.log(`BLA BLA YYY`)
                    return this.getGradientsAndSaveActions(inputTensor).grads;
                }));
                this.pushGradients(gameGradients, gradients);
                // console.log(`BLA BLA 2`, this.currentActions_)
                // const action = [0];
                const {done, reward} = await coach.update(this.currentActions_);
                const isDone = done
                // console.log(`game ${i}`, reward)
                gameRewards.push(reward);
                if (isDone) {
                    //   When the game ends before max step count is reached, a reward of
                    //   0 is given.

                    break;
                }
                // As long as the game doesn't end, each step leads to a reward of 1.
                // These reward values will later be "discounted", leading to
                // higher reward values for longer-lasting games.
                // gameRewards.push(1);
                // }
            }

            gameScore.push({game: i, score: sum(gameRewards)});
            this.pushGradients(allGradients, gameGradients);
            allRewards.push(gameRewards);
            await tf.nextFrame();
        }
        tf.tidy(() => {
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
            const normalizedRewards =
                discountAndNormalizeRewards(allRewards, discountRate);
            // Add the scaled gradients to the weights of the policy network. This
            // step makes the policy network more likely to make choices that lead
            // to long-lasting games in the future (i.e., the crux of this RL
            // algorithm.)
            optimizer.applyGradients(
                scaleAndAverageGradients(allGradients, normalizedRewards));
        });
        tf.dispose(allGradients);
        return gameScore;
    }

    getGradientsAndSaveActions(inputTensor) {
        const f = () => tf.tidy(() => {
            const [logits, actions] = this.getLogitsAndActions(inputTensor);
             // console.log(`----------------------`)
             // console.log(`TODOD`, actions.dataSync())
             // console.log(`INDEX`, actions.argMax(-1).dataSync()[0])


            this.currentActions_ = actions.argMax(-1).dataSync()[0];
            // // console.log(`YYYYYY2`, this.currentActions_)
            // // console.log(`YYYYYY2`, actions.dataSync())
            const labels =
                tf.sub(1, tf.tensor2d(actions.dataSync(), actions.shape));
            // console.log(`YYYYYY 4`,this.currentActions_, actions.shape)
            return tf.losses.sigmoidCrossEntropy(labels, logits);
        });
        return tf.variableGrads(f);
    }

    getCurrentActions() {
        return this.currentActions_;
    }

    /**
     * Get policy-network logits and the action based on state-tensor inputs.
     *
     * @param {tf.Tensor} inputs A tf.Tensor instance of shape `[batchSize, 4]`.
     * @returns {[tf.Tensor, tf.Tensor]}
     *   1. The logits tensor, of shape `[batchSize, 1]`.
     *   2. The actions tensor, of shape `[batchSize, 1]`.
     */
    getLogitsAndActions(inputs) {
        return tf.tidy(() => {
            // console.log(`XXXX 1`, inputs.arraySync())
            const logits = this.policyNet.predict(inputs);
            // Get the probability of the leftward action.
            const probabilities = tf.sigmoid(logits);
            // // console.log(`XXXX 3`, )
            // Probabilites of the left and right actions.
            // const leftRightProbs = tf.concat([leftProb, tf.sub(1, leftProb)], 1);
            // // console.log(`XXXX 4`)
            // const actions = tf.multinomial(leftRightProbs, 1, null, false);
            // // console.log(`XXXX 5`)
            return [logits, probabilities];
        });
    }

    /**
     * Get actions based on a state-tensor input.
     *
     * @param {tf.Tensor} inputs A tf.Tensor instance of shape `[batchSize, 4]`.
     * @param {Float32Array} inputs The actions for the inputs, with length
     *   `batchSize`.
     */
    getActions(inputs) {
        return this.getLogitsAndActions(inputs)[1].dataSync();
    }

    /**
     * Push a new dictionary of gradients into records.
     *
     * @param {{[varName: string]: tf.Tensor[]}} record The record of variable
     *   gradient: a map from variable name to the Array of gradient values for
     *   the variable.
     * @param {{[varName: string]: tf.Tensor}} gradients The new gradients to push
     *   into `record`: a map from variable name to the gradient Tensor.
     */
    pushGradients(record, gradients) {
        for (const key in gradients) {
            if (key in record) {
                record[key].push(gradients[key]);
            } else {
                record[key] = [gradients[key]];
            }
        }
    }
}

/**
 * A subclass of PolicyNetwork that supports saving and loading.
 */
class SaveablePolicyNetwork extends PolicyNetwork {
    /**
     * Constructor of SaveablePolicyNetwork
     *
     * @param {number | number[]} hiddenLayerSizesOrModel
     */
    constructor(hiddenLayerSizesOrModel) {
        super(hiddenLayerSizesOrModel);
    }

    /**
     * Save the model to IndexedDB.
     */
    async saveModel(modelPath) {
        return await this.policyNet.save(modelPath);
    }

    /**
     * Load the model fom IndexedDB.
     *
     * @returns {SaveablePolicyNetwork} The instance of loaded
     *   `SaveablePolicyNetwork`.
     * @throws {Error} If no model can be found in IndexedDB.
     */
    static async loadModel(modelPath) {
        const model = await tf.loadLayersModel(`${modelPath}/model.json`);
        console.log(`Loaded model from ${modelPath}`);
        return new SaveablePolicyNetwork(model);
    }

    /**
     * Check the status of locally saved model.
     *
     * @returns If the locally saved model exists, the model info as a JSON
     *   object. Else, `undefined`.
     */
    static async checkStoredModelStatus(modelPath) {
        const model = await tf.loadLayersModel(modelPath).catch(ee => {
            console.log(`did not load the model`, ee)
        });
        return model
    }

    /**
     * Remove the locally saved model from IndexedDB.
     */
    async removeModel(modelPath) {
        return await tf.io.removeModel(modelPath);
    }

    /**
     * Get the sizes of the hidden layers.
     *
     * @returns {number | number[]} If the model has only one hidden layer,
     *   return the size of the layer as a single number. If the model has
     *   multiple hidden layers, return the sizes as an Array of numbers.
     */
    hiddenLayerSizes() {
        const sizes = [];
        for (let i = 0; i < this.policyNet.layers.length - 1; ++i) {
            sizes.push(this.policyNet.layers[i].units);
        }
        return sizes.length === 1 ? sizes[0] : sizes;
    }
}

/**
 * Discount the reward values.
 *
 * @param {number[]} rewards The reward values to be discounted.
 * @param {number} discountRate Discount rate: a number between 0 and 1, e.g.,
 *   0.95.
 * @returns {tf.Tensor} The discounted reward values as a 1D tf.Tensor.
 */
function discountRewards(rewards, discountRate) {
    const discountedBuffer = tf.buffer([rewards.length]);
    let prev = 0;
    for (let i = rewards.length - 1; i >= 0; --i) {
        const current = discountRate * prev + rewards[i];
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
    return tf.tidy(() => {
        const discounted = [];
        for (const sequence of rewardSequences) {
            discounted.push(discountRewards(sequence, discountRate))
        }
        // Compute the overall mean and stddev.
        const concatenated = tf.concat(discounted);
        const mean = tf.mean(concatenated);
        const std = tf.sqrt(tf.mean(tf.square(concatenated.sub(mean))));
        // Normalize the reward sequences using the mean and std.
        const normalized = discounted.map(rs => rs.sub(mean).div(std));
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
    return tf.tidy(() => {
        const gradients = {};
        for (const varName in allGradients) {
            gradients[varName] = tf.tidy(() => {
                // Stack gradients together.
                const varGradients = allGradients[varName].map(
                    varGameGradients => tf.stack(varGameGradients));
                // Expand dimensions of reward tensors to prepare for multiplication
                // with broadcasting.
                const expandedDims = [];
                for (let i = 0; i < varGradients[0].rank - 1; ++i) {
                    expandedDims.push(1);
                }
                const reshapedNormalizedRewards = normalizedRewards.map(
                    rs => rs.reshape(rs.shape.concat(expandedDims)));
                for (let g = 0; g < varGradients.length; ++g) {
                    // This mul() call uses broadcasting.
                    varGradients[g] = varGradients[g].mul(reshapedNormalizedRewards[g]);
                }
                // Concatenate the scaled gradients together, then average them across
                // all the steps of all the games.
                return tf.mean(tf.concat(varGradients, 0), 0);
            });
        }
        return gradients;
    });
}

async function asyncToSync(asyncOriginalFunc) {
    const result = await asyncOriginalFunc()
    return () => {
        return result;
    }
}

/**
 * Calculate the mean of an Array of numbers.
 *
 * @param {number[]} xs
 * @returns {number} The arithmetic mean of `xs`
 */
function mean(xs) {
    return sum(xs) / xs.length;
}

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
    } else {
        return xs.reduce((x, prev) => prev + x);
    }
}

module.exports = {SaveablePolicyNetwork, asyncToSync, mean, sum}



