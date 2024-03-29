import {GameSnapshot, OrderSet} from '../pb/server_pb.js'

export type TrainingFunction = (trainingCtr: TrainingController) => Promise<void>;

/**
 * The TrainingController is passed to your Training function to give you control of the game flow.
 */
export interface TrainingController {
    /**
     * This method should be called whenever your need to reset the game to an initial state.
     *
     * @param {any} data - Pass any data you need to during the training session
     */
    setEnvironment: (data: any) => Promise<void>;

    /**
     * Use this method to get the inputs that will be used by your model. E.g. if you are using tensor flow, you may
     * return the tensors used to feed your network.
     */
    getState: () => any;

    /**
     * Use this method to pass that action picked by you model. It will return the reward and `done` values got from
     * your BotTrainer.
     * @param action
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    update: (action: any) => Promise<{ reward: number, done: boolean }>;

    /**
     * Stops the training
     */
    stop: () => Promise<void>;
}

/**
 * The BotTrainer is used by the Gym class to play the game as a bot and to control the game state when needed.
 * It is NOT your learning agent!
 */
export interface BotTrainer {

    /**
     * createNewInitialState should create the initial scenario for each game.
     *
     * IMPORTANT!! Note that this method should define the new state directly on the game server. So you MUST
     * use the remote control client to change the game elements' position/state
     *
     * @param {any} data - Pass any data you need to during the training session
     */
    createNewInitialState: (data: any) => Promise<GameSnapshot>;

    /**
     * getInputs is called in each training step.
     * The training function will call this method to receive whatever inputs you want to use in your neural network.
     * Example, if you have 3 sensors, or 3 tensors, etc.
     *
     * This method must read the game snapshot and define input values and return it
     *
     * @param {GameSnapshot} snapshot - The current game state
     */
    getState: (snapshot: GameSnapshot) => any;

    /**
     * play define the orders that will be sent to the game server based on the `action` sent by your training function.
     *
     * IMPORTANT:
     * Do not confuse this method role with an agent! Your agent will define the `action` inside your training function.
     * This method is only responsible to translate the action to orders and send them
     *
     * @param {OrderSet} orderSet - used to define the orders that will be sent to the server. Your bot should set the orders
     *                      and return it to the server.
     * @param {GameSnapshot} snapshot - The current game state
     * @param {any} action - Value passed by your training function to the TrainingController `update` method
     *
     */
    play: (orderSet: OrderSet, snapshot: GameSnapshot, action: any) => Promise<OrderSet>;

    /**
     * This method is called by the TrainingController right after your bot play a turn of the game.
     * It must compare the two states and return the reward and a boolean `done` to indicate that the game each the end.
     *
     * Your bot may evaluate turn by turn, or comparing the final game state to the initial state.
     * However, if you want to compare with the initial state, your bot trainer will have to store the initial
     * state when the method `createNewInitialState` is called.
     *
     * @param {GameSnapshot} previousSnapshot - The current game state
     * @param {GameSnapshot} newSnapshot - The current game state
     */
    evaluate: (previousSnapshot: GameSnapshot, newSnapshot: GameSnapshot) => Promise<{ reward: number, done: boolean }>;
}
