import * as tf from '@tensorflow/tfjs-node';
import {Mapper, Client, rl, Lugo} from "@lugobots/lugo4node";

import {MyBotTrainer, PLAYER_NUM} from "./my_bot";
import {SaveablePolicyNetwork, mean, sum} from "./model";

// training settings
const trainIterations = 500;
const gamesPerIteration = 10;
const maxStepsPerGame = 60;
const hiddenLayerSizes = [4, 4]
const learningRate = 0.95;
const discountRate = 0.05;
const testingGames = 20

const grpcAddress = "localhost:5000"
const grpcInsecure = true
const model_path = `file://./model_output`;

(async () => {

    const teamSide = Lugo.Team.Side.HOME
    const playerNumber = PLAYER_NUM

    // the map will help us to see the field in quadrants (called regions) instead of working with coordinates
    const map = new Mapper(10, 6, Lugo.Team.Side.HOME)

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

    const rc = new rl.RemoteControl();
    await rc.connect(grpcAddress)

    const bot = new MyBotTrainer(rc)
    const gym = new rl.Gym(rc, bot, myTrainingFunction, {debugging_log: false})

    await gym.withZombiePlayers(grpcAddress).start(lugoClient)
})();


async function myTrainingFunction(trainingCtrl: rl.TrainingController) : Promise<void> {
    console.log(`Let's training`)
    // first, creating the model
    let policyNet
    if (await SaveablePolicyNetwork.checkStoredModelStatus(`${model_path}/model.json`) != null) {
        console.log('Reloading model')
        policyNet = await SaveablePolicyNetwork.loadModel(model_path);
    } else {
        hiddenLayerSizes.unshift(4);// adds the first layer
        policyNet = new SaveablePolicyNetwork(hiddenLayerSizes);
        console.log('DONE constructing new instance of SaveablePolicyNetwork');
    }

    // ready to train
    const optimizer = tf.train.adam(learningRate);

    let meanStepValues = [];
    // onIterationEnd(0, trainIterations);
    let t0 = new Date().getTime();
    // stopRequested = false;
    for (let i = 0; i < trainIterations; ++i) {
        console.log('train iteration ', i);
        const gameSteps = await policyNet.train(
            trainingCtrl, optimizer, discountRate, gamesPerIteration,
            maxStepsPerGame);
        const t1 = new Date().getTime();
        const stepsPerSecond = sum(gameSteps) / ((t1 - t0) / 1e3);
        t0 = t1;
        // trainSpeed.textContent = `${stepsPerSecond.toFixed(1)} steps/s`
        meanStepValues.push({x: i + 1, y: mean(gameSteps)});
     //   console.log(`# of tensors: ${tf.memory().numTensors}`);
        // plotSteps();
        // onIterationEnd(i + 1, trainIterations);
        await tf.nextFrame();  // Unblock UI thread.
        await policyNet.saveModel(model_path);
        // await updateUIControlState();

        // if (stopRequested) {
        //     logStatus('Training stopped by user.');
        //     break;
        // }
    }


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
    await trainingCtrl.stop()
    // console.log(`Testing scores: `, testingScores)
}

