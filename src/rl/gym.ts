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
        await lugoClient.setGettingReadyHandler((snapshot) => {
            return this.trainer.onGettingReadyState(snapshot)
        }).play((orderSet, snapshot) :Promise<OrderSet> => {
            return this.trainer.gameTurnHandler(orderSet, snapshot)
        }, async () => {
            if(this.gameServerAddress) {
                await completeWithZombies(this.gameServerAddress)
            }
        })
    }

    withZombiePlayers(gameServerAddress) {
        this.gameServerAddress = gameServerAddress
        return this
    }
}

async function completeWithZombies(gameServerAddress) {
    for (let i = 1; i <= 11; i++) {
        await newZombiePlayer(Team.Side.HOME, i, gameServerAddress)
        await delay(50)
        await newZombiePlayer(Team.Side.AWAY, i, gameServerAddress)
        await delay(50)
    }
}