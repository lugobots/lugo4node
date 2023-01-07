import {TrainingCrl, delay} from "./trainingCrl";
import {newZombiePlayer} from "./zombie";
import {RemoteControl} from "./remoteControl"
import {BotTrainer, TrainingFunction} from "./interfaces";
import {Client} from '../client'
import {OrderSet, Team} from "../pb/server_pb.js"

export class Gym {

    private trainingCrl : TrainingCrl;

    private gameServerAddress : string;

    private remoteControl : RemoteControl

    constructor(remoteControl: RemoteControl, trainer : BotTrainer, trainingFunction : TrainingFunction, options = {debugging_log: false}) {
        this.remoteControl = remoteControl
        this.trainingCrl = new TrainingCrl(remoteControl, trainer, trainingFunction)
        this.trainingCrl.debugging_log = options.debugging_log
    }

    async start(lugoClient: Client) {
        await lugoClient.setGettingReadyHandler((snapshot) => {
            return this.trainingCrl.onGettingReadyState(snapshot)
        }).play((orderSet, snapshot) :Promise<OrderSet> => {
            return this.trainingCrl.gameTurnHandler(orderSet, snapshot)
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