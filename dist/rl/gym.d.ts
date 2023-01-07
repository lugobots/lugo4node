import { RemoteControl } from "./remote_control";
import { TrainableBot, TrainingFunction } from "./interfaces";
import { Client } from '../client';
export declare class Gym {
    private trainer;
    private gameServerAddress;
    private remoteControl;
    constructor(remoteControl: RemoteControl, trainableBot: TrainableBot, trainingFunction: TrainingFunction, options?: {
        debugging_log: boolean;
    });
    start(lugoClient: Client): Promise<void>;
    withZombiePlayers(gameServerAddress: any): this;
}
