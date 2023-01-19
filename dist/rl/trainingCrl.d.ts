import { RemoteControl } from "./remoteControl";
import { TrainingController, BotTrainer, TrainingFunction } from './interfaces';
import { GameSnapshot, OrderSet } from "../pb/server_pb";
export declare const delay: (ms: any) => Promise<unknown>;
export declare class TrainingCrl implements TrainingController {
    /**
     * @type {RemoteControl}
     */
    private remoteControl;
    private readonly onReady;
    protected trainingHasStarted: boolean;
    private lastSnapshot;
    private waitingForAction;
    private cycleSeq;
    /**
     * @type {BotTrainer}
     */
    private bot;
    debugging_log: boolean;
    private stopRequested;
    private gotNewAction;
    /**
     * @param {RemoteControl} remoteControl
     * @param {BotTrainer} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl: RemoteControl, bot: BotTrainer, onReadyCallback: TrainingFunction);
    /**
     * Set the state of match randomly.
     */
    setRandomState(): Promise<void>;
    getInputs(): any;
    update(action: any): Promise<{
        reward: number;
        done: boolean;
    }>;
    _gotNextState: (newState: GameSnapshot) => void;
    gameTurnHandler(orderSet: any, snapshot: any): Promise<OrderSet>;
    stop(): Promise<void>;
    _debug(msg: any): void;
}
