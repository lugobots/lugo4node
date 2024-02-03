import { Client } from '../client';
import { BotTrainer, TrainingFunction } from "./interfaces";
import { RemoteControl } from "./remoteControl";
export declare class Gym {
    private trainingCrl;
    private gameServerAddress;
    private helperPlayers;
    private remoteControl;
    constructor(remoteControl: RemoteControl, trainer: BotTrainer, trainingFunction: TrainingFunction, options?: {
        debugging_log: boolean;
    });
    start(lugoClient: Client): Promise<void>;
    withZombiePlayers(gameServerAddress: any): this;
    withChasersPlayers(gameServerAddress: any): this;
    withRandomMotionPlayers(gameServerAddress: any, turnsToChangeDirection?: number): this;
}
