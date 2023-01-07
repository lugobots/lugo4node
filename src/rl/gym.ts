import {Trainer, delay} from "./trainer";
import {newZombiePlayer} from "./zombie";
import {RemoteControl} from "./remote_control"
import {TrainableBot, TrainingFunction} from "./interfaces";
import {Client} from '../client'
import {OrderSet, Team} from "../pb/server_pb.js"

export class Gym {

    private trainer : Trainer;

    private gameServerAddress : string;

    private remoteControl : RemoteControl

    constructor(remoteControl: RemoteControl, trainableBot : TrainableBot, trainingFunction : TrainingFunction, options = {debugging_log: false}) {
        this.remoteControl = remoteControl
        this.trainer = new Trainer(remoteControl, trainableBot, trainingFunction)
        this.trainer.debugging_log = options.debugging_log
    }

    async start(lugoClient: Client) {
        console.log(`START1`)
        await lugoClient.setGettingReadyHandler((snapshot) => {
            console.log(`START vai handler`)
            return this.trainer.onGettingReadyState(snapshot)
        }).play((orderSet, snapshot) :Promise<OrderSet> => {
            console.log(`PLAY PLAY PLAY`);
            return this.trainer.gameTurnHandler(orderSet, snapshot)
        }, async () => {
            if(this.gameServerAddress) {
                await completeWithZombies(this.gameServerAddress)
            }
            // await this.remoteControl.pauseResume()
        })
    }

    withZombiePlayers(gameServerAddress) {
        this.gameServerAddress = gameServerAddress
        console.log(`WAHT???`)
        return this
    }
}

async function completeWithZombies(gameServerAddress) {
    console.log(`W CHAAAAAMA@@@`)
    for (let i = 1; i <= 11; i++) {
        console.log(`Connected ${i}`)
        await newZombiePlayer(Team.Side.HOME, i, gameServerAddress)
        console.log(`WAIT 1`)
        await delay(100)
        await newZombiePlayer(Team.Side.AWAY, i, gameServerAddress)
        console.log(`WAIT 2`)
        await delay(100)
    }
}