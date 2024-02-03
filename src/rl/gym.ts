import { Client } from '../client';
import GameSnapshotInspector from "../game-snapshot-inspector";
import { Order, Team } from "../pb/server_pb.js";
import {
    newChaserHelperPlayer,
    newRandomMotionHelperPlayer,
    newZombieHelperPlayer
} from "./helper_bots";
import { BotTrainer, TrainingFunction } from "./interfaces";
import { RemoteControl } from "./remoteControl";
import { delay, TrainingCrl } from "./trainingCrl";

export class Gym {

    private trainingCrl: TrainingCrl;

    private gameServerAddress: string;

    private helperPlayers: (string) => void;

    private remoteControl: RemoteControl

    constructor(remoteControl: RemoteControl, trainer: BotTrainer, trainingFunction: TrainingFunction, options = {debugging_log: false}) {
        this.remoteControl = remoteControl
        this.trainingCrl = new TrainingCrl(remoteControl, trainer, trainingFunction)
        this.trainingCrl.debugging_log = options.debugging_log
    }

    async start(lugoClient: Client) {
        // If the game was started in a previous training session, the game server will be stuck on the listening phase.
        // so we check if the game has started, if now, we try to resume the server
        let hasStarted = false;
        await lugoClient.play((snapshot: GameSnapshotInspector): Promise<Order[] | {orders: Order[], debug_message: string} | null> => {
            hasStarted = true;
            return this.trainingCrl.gameTurnHandler(snapshot)
        }, async () => {
            if (this.gameServerAddress) {
                await this.helperPlayers(this.gameServerAddress)
            }
            setTimeout(() => {
                if (!hasStarted) {
                    this.remoteControl.resumeListening()
                }
            }, 1000);
        })
    }

    withZombiePlayers(gameServerAddress) {
        this.gameServerAddress = gameServerAddress
        this.helperPlayers = async (gameServerAddress) => {
            for (let i = 1; i <= 11; i++) {
                await newZombieHelperPlayer(Team.Side.HOME, i, gameServerAddress)
                await delay(50)
                await newZombieHelperPlayer(Team.Side.AWAY, i, gameServerAddress)
                await delay(50)
            }
        }
        return this
    }

    withChasersPlayers(gameServerAddress) {
        this.gameServerAddress = gameServerAddress
        this.helperPlayers = async (gameServerAddress) => {
            for (let i = 1; i <= 11; i++) {
                await newChaserHelperPlayer(Team.Side.HOME, i, gameServerAddress)
                await delay(50)
                await newChaserHelperPlayer(Team.Side.AWAY, i, gameServerAddress)
                await delay(50)
            }
        }
        return this
    }

    withRandomMotionPlayers(gameServerAddress, turnsToChangeDirection = 60) {
        this.gameServerAddress = gameServerAddress
        this.helperPlayers = async (gameServerAddress) => {
            for (let i = 1; i <= 11; i++) {
                await newRandomMotionHelperPlayer(Team.Side.HOME, i, gameServerAddress, turnsToChangeDirection)
                await delay(50)
                await newRandomMotionHelperPlayer(Team.Side.AWAY, i, gameServerAddress, turnsToChangeDirection)
                await delay(50)
            }
        }

        return this
    }

    // TODO design the best way to create a customizable helper player
    // withCustomPlayers(gameServerAddress, turnHandler: RawTurnProcessor) {
    //     this.gameServerAddress = gameServerAddress
    //     this.helperPlayers = async (gameServerAddress) => {
    //         for (let i = 1; i <= 11; i++) {
    //             await newCustomHelperPlayer(Team.Side.HOME, i, gameServerAddress, turnHandler)
    //             await delay(50)
    //             await newCustomHelperPlayer(Team.Side.AWAY, i, gameServerAddress, turnHandler)
    //             await delay(50)
    //         }
    //     }
    //
    //     return this
    // }
}




