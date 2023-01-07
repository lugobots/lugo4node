import {RemoteControl} from "./remote_control"
import {BotTrainer, TrainableBot, TrainingFunction} from './interfaces'
import {GameSnapshot, OrderSet} from "../pb/server_pb"

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export class Trainer implements BotTrainer {
    /**
     * @type {RemoteControl}
     */
    private remoteControl: RemoteControl;

    private readonly onReady;

    private trainingHasStarted: boolean = false;

    private lastSnapshot: GameSnapshot;

    private waitingForAction: boolean = false

    private cycleSeq: number = 0

    /**
     * @type {TrainableBot}
     */
    private bot: TrainableBot;

    debugging_log = true
    private stopRequested = false

    private gotNewAction: (action) => Promise<GameSnapshot> = (action: any) => {
        console.error('gotNewAction not defined yet - should wait the initialise it on the first "update" call')
        return Promise.reject()
    }

    /**
     * @param {RemoteControl} remoteControl
     * @param {TrainableBot} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl: RemoteControl, bot: TrainableBot, onReadyCallback: TrainingFunction) {
        this.onReady = onReadyCallback
        this.bot = bot
        this.remoteControl = remoteControl
    }

    /**
     * Set the state of match randomly.
     */
    async setRandomState(): Promise<void> {
        this._debug(`Reset state`)
        try {
            this.lastSnapshot = await this.bot.createNewInitialState()
        } catch (e) {
            console.error(`trainable bot failed to create initial state`, e)
            throw e;
        }
    }

    async getStateTensor(): Promise<any> {
        try {
            this.cycleSeq++
            this._debug(`get state`)
            return this.bot.getInputs(this.lastSnapshot)
        } catch (e) {
            console.error(`trainable bot failed to return inputs from a particular state`, e)
            throw e
        }
    }

    async update(action: any): Promise<{ reward: number; done: boolean }> {
        this._debug(`UPDATE`)
        if (!this.waitingForAction) {
            throw new Error("faulty synchrony - got a new action when was still processing the last one")
        }

        const previousState = this.lastSnapshot
        this._debug(`got action for turn ${this.lastSnapshot.getTurn()}`)
        this.lastSnapshot = await this.gotNewAction(action)
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
            console.error(`trainable bot failed to evaluate game state`, e)
            throw e
        }
    }

    _gotNextState = (newState: GameSnapshot) => {
        this._debug(`No one waiting for the next state`)
    };

    async onGettingReadyState(snapshot) {
        if (!this.trainingHasStarted) {
            // await this.remoteControl.nextTurn().catch(e => {
            //     console.error(`could not request next turn`, e)
            // })
        }
    }

    async gameTurnHandler(orderSet, snapshot): Promise<OrderSet> {
        this._debug(`new turn`)
        if (this.waitingForAction) {
            throw new Error("faulty synchrony - got new turn while waiting for order (check the lugo 'timer-mode')")
        }
        this._gotNextState(snapshot)

        return await new Promise(async (resolve, reject) => {
            const maxWait = setTimeout(() => {
                if (this.stopRequested) {
                    return resolve(orderSet)
                }
                console.error(`max wait for a new action`)
                reject()
            }, 5000)
            if (this.stopRequested) {
                this._debug(`stop requested - will not defined call back for new actions`)
                resolve(orderSet)
                clearTimeout(maxWait)
                return null
            }

            this.gotNewAction = async (newAction) => {
                this._debug(`sending new action`)
                clearTimeout(maxWait)
                return new Promise<GameSnapshot>((resolveTurn, rejectTurn) => {
                    try {
                        this.waitingForAction = false
                        this._gotNextState = (newState) => {
                            this._debug(`Returning result for new action (snapshot of turn ${newState.getTurn()})`)
                            resolveTurn(newState)
                        }
                        this._debug(`sending order for turn ${snapshot.getTurn()} based on action`)
                        this.bot.play(orderSet, snapshot, newAction).then((orderSet) => {
                            resolve(orderSet)// sending the orders wh
                            this._debug(`order sent, calling next turn`)
                            return delay(80)// why? ensure the server got the order?
                        }).then(() => {
                            this._debug(`RESUME NOW!`)
                            return this.remoteControl.resumeListening();
                        }).then(() => {
                            this._debug(`listening resumed`)
                        })
                    } catch (e) {
                        reject()
                        rejectTurn()
                        console.error(`failed to send the orders to the server`, e)
                    }
                })
            }
            this.waitingForAction = true
            this._debug(`gotNewAction defined, waiting for action (has started: ${this.trainingHasStarted})`)
            if (!this.trainingHasStarted) {
                this.onReady(this)
                this.trainingHasStarted = true
                this._debug(`the training has started`)
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
