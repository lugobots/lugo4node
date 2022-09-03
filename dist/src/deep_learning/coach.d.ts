export class Coach {
    /**
     * @param {RemoteControl} remoteControl
     * @param {TrainableBot} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl: RemoteControl, bot: TrainableBot, onReadyCallback: Function);
    debugging_log: boolean;
    /**
     * Set the state of match randomly.
     */
    setRandomState(): Promise<void>;
    getStateTensor(): Promise<tf.Tensor>;
    update(action: any): Promise<{
        done: boolean;
        reward: number;
    }>;
    _gotNextState: () => void;
    gettingReady(snapshot: any): Promise<void>;
    gameTurnHandler(orderSet: any, snapshot: any): Promise<any>;
    stop(): Promise<void>;
    _debug(msg: any): void;
    #private;
}
export function delay(ms: any): Promise<any>;
import { RemoteControl } from "./remote_control";
import { TrainableBot } from "./stubs";
