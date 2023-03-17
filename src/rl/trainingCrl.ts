import {RemoteControl} from "./remoteControl"
import {BotTrainer, TrainingController, TrainingFunction} from './interfaces'
import {GameSnapshot, OrderSet} from "../pb/server_pb"

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export class TrainingCrl implements TrainingController {
    /**
     * @type {RemoteControl}
     */
    private remoteControl: RemoteControl;

    private readonly onReady;

    protected trainingHasStarted: boolean = false;

    private lastSnapshot: GameSnapshot;

    private onListeningMode: boolean = false

    private OrderSet: OrderSet

    private cycleSeq: number = 0

    /**
     * @type {BotTrainer}
     */
    private bot: BotTrainer;

    debugging_log = true
    private stopRequested = false

    private onGetNewAction: (action) => void = (action: any) => {
        console.error('onGetNewAction not defined yet - should wait the initialise it on the first "update" call')
    }

    /**
     * @param {RemoteControl} remoteControl
     * @param {BotTrainer} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl: RemoteControl, bot: BotTrainer, onReadyCallback: TrainingFunction) {
        this.onReady = onReadyCallback
        this.bot = bot
        this.remoteControl = remoteControl
    }

    /**
     * Set the state of match randomly.
     */
    async setEnvironment(data: any): Promise<void> {
        this._debug(`Reset state`)
        try {
            this.lastSnapshot = await this.bot.createNewInitialState(data)
        } catch (e) {
            console.error(`bot trainer failed to create initial state`, e)
            throw e;
        }
    }

    getState(): any {
        try {
            this.cycleSeq++
            this._debug(`got state`)
            return this.bot.getState(this.lastSnapshot)
        } catch (e) {
            console.error(`bot trainer failed to return inputs from a particular state`, e)
            throw e
        }
    }

    async update(action: any): Promise<{ reward: number; done: boolean }> {
        this._debug(`UPDATE`)
        if (!this.onListeningMode) {
            throw new Error("faulty synchrony - got a new action when was still processing the last one")
        }

        const previousState = this.lastSnapshot;
        this.OrderSet.setTurn(this.lastSnapshot.getTurn());
        const updatedOrderSet = this.bot.play(this.OrderSet, this.lastSnapshot, action)

        this._debug(`got order set, passing down`)
        this.onGetNewAction(updatedOrderSet)

        this.lastSnapshot = await this.waitUntilNextListeningState()

        await delay(80)// why? ensure the server got the order?
        this._debug(`got new snapshot after order has been sent`)

        if (this.stopRequested) {
            return {done: true, reward: 0};
        }

        // TODO: if I want to skip the net N turns? I should be able too
        this._debug(`update finished (turn ${this.lastSnapshot.getTurn()} waiting for next action}`)
        try {
            const {done, reward} = await this.bot.evaluate(previousState, this.lastSnapshot)
            return {done, reward};
        } catch (e) {
            console.error(`bot trainer failed to evaluate game state`, e)
            throw e
        }
    }

    _gotNextState = (newGameSnapshot: GameSnapshot) => {
        this._debug(`No one waiting for the next state`)
    };

    async gameTurnHandler(orderSet, snapshot): Promise<OrderSet> {
        /**
         * This method is called when the game is on the `LISTENING` state.
         * When the game starts it takes a while to enter this state.
         *
         * When the status enter, we want to hold the game in the LISTENING state until the learning bot submit the action
         *
         * Then we create the promise below that will only be resolved when the `onGetNewAction` is resolved.
         *
         * Read the following comments to understand the flow.
         */


        this._debug(`new turn`)
        if (this.onListeningMode) {
            throw new Error("faulty synchrony - got new turn while the trainer already was in listening mode  (check the lugo 'timer-mode')")
        }
        this._gotNextState(snapshot)

        // [explaining flow] this promise will ensure that we will only return the bot order after onGetNewAction has been called.
        return await new Promise(async (resolve, reject) => {
            const maxWait = setTimeout(() => {
                if (this.stopRequested) {
                    return resolve(orderSet)
                }
                console.error(`max wait for a new action`)
                reject()
            }, 30000)
            if (this.stopRequested) {
                this._debug(`stop requested - will not defined call back for new actions`)

                resolve(orderSet)

                clearTimeout(maxWait)
                return null
            }

            this.OrderSet = orderSet


            // [explaining flow] here we will define the callback called when the bot returns the action.
            // note that the `onGetNewAction` is executed within `update` method.
            // this method also must be async because it calls async methods
            this.onGetNewAction = (updatedOrderSet) => {
                this._debug(`sending new action`)
                clearTimeout(maxWait)

                resolve(updatedOrderSet)
            }
            this.onListeningMode = true
            this._debug(`onGetNewAction defined, waiting for action (has started: ${this.trainingHasStarted})`)
            if (!this.trainingHasStarted) {
                this.onReady(this)
                this.trainingHasStarted = true
                this._debug(`the training has started`)
            }

        })
    }

    async waitUntilNextListeningState() {
        return new Promise<GameSnapshot>((resolveTurn, rejectTurn) => {
            try {
                this.onListeningMode = false
                this._gotNextState = (newGameSnapshot) => {
                    resolveTurn(newGameSnapshot)
                }

                this._debug(`resumeListening: ${this.lastSnapshot.getTurn()}`)
                this.remoteControl.resumeListening()
            } catch (e) {
                rejectTurn()
                console.error(`failed to send the orders to the server`, e)
            }
        })
    }


    async stop() {
        this.stopRequested = true
    }

    _debug(msg) {
        if (this.debugging_log) {
            console.log(`[${this.cycleSeq}] ${msg}`)
        }

    }


}

async function asyncToSync(asyncOriginalFunc) {
    const result = await asyncOriginalFunc()
    return () => {
        return result;
    }
}
