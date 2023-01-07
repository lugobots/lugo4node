import { RemoteControl } from "./remote_control";
import { TrainingController, TrainableBot, TrainingFunction } from './interfaces';
import { GameSnapshot, OrderSet } from "../pb/server_pb";
export declare const delay: (ms: any) => Promise<unknown>;
export declare class TrainingCrl implements TrainingController {
    /**
     * @type {RemoteControl}
     */
    private remoteControl;
    private readonly onReady;
    private trainingHasStarted;
    private lastSnapshot;
    private waitingForAction;
    private cycleSeq;
    /**
     * @type {TrainableBot}
     */
    private bot;
    debugging_log: boolean;
    private stopRequested;
    private gotNewAction;
    /**
     * @param {RemoteControl} remoteControl
     * @param {TrainableBot} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl: RemoteControl, bot: TrainableBot, onReadyCallback: TrainingFunction);
    /**
     * Set the state of match randomly.
     */
    setRandomState(): Promise<void>;
    getInputs(): Promise<any>;
    update(action: any): Promise<{
        reward: number;
        done: boolean;
    }>;
    _gotNextState: (newState: GameSnapshot) => void;
    onGettingReadyState(snapshot: any): Promise<void>;
    gameTurnHandler(orderSet: any, snapshot: any): Promise<OrderSet>;
    stop(): Promise<void>;
    _debug(msg: any): void;
}
