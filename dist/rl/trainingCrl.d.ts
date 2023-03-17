import { RemoteControl } from "./remoteControl";
import { BotTrainer, TrainingController, TrainingFunction } from './interfaces';
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
    private onListeningMode;
    private OrderSet;
    private cycleSeq;
    /**
     * @type {BotTrainer}
     */
    private bot;
    debugging_log: boolean;
    private stopRequested;
    private onGetNewAction;
    /**
     * @param {RemoteControl} remoteControl
     * @param {BotTrainer} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl: RemoteControl, bot: BotTrainer, onReadyCallback: TrainingFunction);
    /**
     * Set the state of match randomly.
     */
    setEnvironment(data: any): Promise<void>;
    getState(): any;
    update(action: any): Promise<{
        reward: number;
        done: boolean;
    }>;
    _gotNextState: (newGameSnapshot: GameSnapshot) => void;
    gameTurnHandler(orderSet: any, snapshot: any): Promise<OrderSet>;
    waitUntilNextListeningState(): Promise<GameSnapshot>;
    stop(): Promise<void>;
    _debug(msg: any): void;
}
