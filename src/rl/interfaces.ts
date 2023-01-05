import {GameSnapshot, OrderSet} from '../pb/server_pb.js'

// export enum ACTIONS {
//     MOVE = "mode",
//     KICK = "kick",
//     CATCH = "catch",
//     JUMP = "jump"
// }

export type TrainingFunction = (trainer: BotTrainer) => void;

export interface BotTrainer {
    /**
     *
     * @returns {Promise<void>}
     */
    setRandomState: () => Promise<void>;

    /**
     *
     * TODO Any will be defined by the coach?
     */
    getStateTensor: () => Promise<any>;

    /**
     *
     * @param action
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    update: (action: any) => Promise<{reward: number, done: boolean}>;

    stop: () => Promise<void>;
}

export interface TrainableBot {
     createNewInitialState: () => Promise<GameSnapshot>;

    /**
     * TODO Any dependents on your frame work?
     */
     getInputs: (snapshot: GameSnapshot) => Promise<any>;

    /**
     * TODO confirm it should be any
     */
     play: (orderSet: OrderSet, snapshot: GameSnapshot, action: any) => Promise<OrderSet>;

     evaluate: (previousSnapshot: GameSnapshot, newSnapshot: GameSnapshot) => Promise<{reward: number, done: boolean}>;
}
