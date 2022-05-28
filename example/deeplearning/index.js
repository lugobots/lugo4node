const tf = require("@tensorflow/tfjs-node");
const {Mapper, Client, deep_learning} = require("lugo4node");

const {GoalKeeperTrainable} = require("./my_bot");
const {SaveablePolicyNetwork, asyncToSync, mean,sum} = require("./model");

// training settings
const trainIterations = 25;
const gamesPerIteration = 10;
const maxStepsPerGame = 80;
const hiddenLayerSizes = [128]
const learningRate = 0.08
const discountRate = 0.20;
const testingGames = 20

const grpcAddress = "localhost:5000"
const grpcInsecure = true
const model_path = `file://${__dirname}/model_output`;

(async () => {

    const teamSide = proto.lugo.Team.Side.HOME
    const playerNumber = 5

    // the map will help us to see the field in quadrants (called regions) instead of working with coordinates
    const map = new Mapper(10, 6, proto.lugo.Team.Side.HOME)

    // our bot strategy defines our bot initial position based on its number
    const initialRegion = map.getRegion(1, 1)

    // now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
    // client constructor as well
    const lugoClient = new Client(
        grpcAddress,
        grpcInsecure,
        "",
        teamSide,
        playerNumber,
        initialRegion.getCenter())

    const rc = new deep_learning.RemoteControl();
    await rc.connect(grpcAddress)
    const bot = new GoalKeeperTrainable(rc)

    const gym = new deep_learning.Gym(rc, bot, myTrainingFunction, {debugging_log: false})
    await gym.withZombiePlayers(grpcAddress).start(lugoClient)

})();

/**
 *
 * @param {CoachStub} coach
 * @returns {Promise<void>}
 */
async function myTrainingFunction(coach) {
    console.log(`Let's training`)

    // first, creating the model
    let policyNet
    if (await SaveablePolicyNetwork.checkStoredModelStatus(`${model_path}/model.json`) != null) {
        console.log('Reloading model')
        policyNet = await SaveablePolicyNetwork.loadModel(model_path);
    } else {
        policyNet = new SaveablePolicyNetwork(hiddenLayerSizes);
        console.log('DONE constructing new instance of SaveablePolicyNetwork');
    }

    // ready to train
    const optimizer = tf.train.adam(learningRate);

    let iterationGamesMeans = [];
    let t0 = new Date().getTime();
    let stopRequested = false;
    for (let i = 0; i < trainIterations; ++i) {
        const gameScores = await policyNet.train(
            coach, optimizer, discountRate, gamesPerIteration,
            maxStepsPerGame);
        const t1 = new Date().getTime();
        t0 = t1;
        console.log(`iteration ${i}/${trainIterations} done, total score:`, gameScores)
        iterationGamesMeans.push({iteration: i + 1, means: gameScores});
        console.log(`# of tensors: ${tf.memory().numTensors}`);

        await tf.nextFrame();
        await policyNet.saveModel(model_path);
        if (stopRequested) {
            console.log('Training stopped by user.');
            break;
        }
    }
    if (!stopRequested) {
        console.log('Training completed.');
    }

    console.log('Starting tests');
    const testingScores = [];
    for (let i = 0; i < testingGames; ++i) {
        await coach.setRandomState()
        let isDone = false
        const gameScores = []
        while (!isDone) {
            tf.tidy(await asyncToSync(async () => {
                const action = policyNet.getActions(await coach.getStateTensor())[0];
                const {done, reward} = await coach.update(action);
                isDone = done
                gameScores.push(reward)
                // console.log(`Testing Means: `, gameScores)
            }));
            await tf.nextFrame();  // Unblock UI thread.
        }
        const testScore = sum(gameScores)
        testingScores.push({test: i, mean: testScore.toFixed(2)})
        console.log(`Test done, Score: `, testScore.toFixed(2))
    }
    await coach.stop()
    console.log(`Testing scores: `, testingScores)
}

