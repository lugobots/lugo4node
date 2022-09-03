const {RemoteControl} = require("./remote_control");
const {BotStub} = require('../stub')
const {TrainableBot} = require('./stubs')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class Coach extends BotStub {
    /**
     * @type {RemoteControl}
     */
    #remoteControl;

    #onReady;

    #trainingHasStarted = false

    /**
     * @type {proto.lugo.GameSnapshot}
     */
    #lastSnapshot

    #waitingForAction = false

    #cycle_seq = 0

    /**
     * @type {TrainableBot}
     */
    #bot;

    debugging_log = true
    #stopRequested = false

    /**
     *
     * @param action
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    #gotNewAction = (action) => {
        console.error('gotNewAction not defined yet')
        return Promise.reject()
    }

    /**
     * @param {RemoteControl} remoteControl
     * @param {TrainableBot} bot
     * @param {function} onReadyCallback
     */
    constructor(remoteControl, bot, onReadyCallback) {
        super()
        this.#onReady = onReadyCallback
        this.#bot = bot
        this.#remoteControl = remoteControl
    }

    /**
     * Set the state of match randomly.
     */
    async setRandomState() {
        this._debug(`Reset state`)
        try {
            this.#lastSnapshot = await this.#bot.createNewInitialState()
        } catch (e) {
            console.error(`failed to set a random state`, e)
        }
    }

    async getStateTensor() {
        try {
            this.#cycle_seq++
            this._debug(`get state`)
            return this.#bot.getInputs(this.#lastSnapshot)
        } catch (e) {
            console.error("failed to get the new state", e)
        }
    }

    async update(action) {
        this._debug(`UPDATE`)
        if (!this.#waitingForAction) {
            throw new Error("faulty synchrony - got a new action when was still processing the last one")
        }

        const previousState = this.#lastSnapshot
        this._debug(`got action for turn ${this.#lastSnapshot.getTurn()}`)
        this.#lastSnapshot = await this.#gotNewAction(action)
        this._debug(`got new snapshot after order has been sent`)

        if (this.#stopRequested) {

            return {done: true, reward: 0};
        }

        // TODO: if I want to skip the net N turns? I should be able too


        this._debug(`update finished (turn ${this.#lastSnapshot.getTurn()} waiting for next action}`)
        const {done, reward} = await this.#bot.evaluate(previousState, this.#lastSnapshot)

        return {done, reward};
    }

    _gotNextState = () => {
        this._debug(`No one waiting for the next state`)
    };

    async gettingReady(snapshot) {
        if (!this.#trainingHasStarted) {
            await this.#remoteControl.nextTurn().catch(e => {
                console.error(`could not request next turnB`, e)
            })
        }
    }

    async gameTurnHandler(orderSet, snapshot) {
        this._debug(`new turn`)
        if (this.#waitingForAction) {
            throw new Error("faulty synchrony - got new turn while waiting for order (check the lugo 'timer-mode')")
        }
        this._gotNextState(snapshot)

        return await new Promise(async (resolve, reject) => {
            const maxWait = setTimeout(() => {
                if (this.#stopRequested) {
                    return resolve(orderSet)
                }
                console.log(`max wait for a new action`)
                reject()
            }, 5000)
            if (this.#stopRequested) {
                this._debug(`stop requested - will not defined call back for new actions`)
                resolve(orderSet)
                clearTimeout(maxWait)
                return null
            }

            this.#gotNewAction = async (newAction) => {
                this._debug(`sending new action`)
                clearTimeout(maxWait)
                return new Promise((resolveTurn, rejectTurn) => {
                    try {
                        this.#waitingForAction = false
                        this._gotNextState = (newState) => {
                            this._debug(`Returning result for new action (snapshot of turn ${newState.getTurn()})`)
                            resolveTurn(newState)
                        }
                        this._debug(`sending order for turn ${snapshot.getTurn()} based on action`)
                        this.#bot.play(orderSet, snapshot, newAction).then((orderSet) => {
                            resolve(orderSet)
                            this._debug(`order sent, calling next turn`, orderSet)
                            return delay(80)
                        }).then(() => {
                            this.#remoteControl.nextTurn()
                        })
                    } catch (e) {
                        reject()
                        rejectTurn()
                        console.error(`failed to send the orders to the server`, e)
                    }
                })
            }
            this.#waitingForAction = true
            this._debug(`gotNewAction defined, waiting for action (has started: ${this.#trainingHasStarted})`)
            if (!this.#trainingHasStarted) {
                this.#onReady(this)
                this.#trainingHasStarted = true
                this._debug(`the training has started`)
            }

        })
    }

    async stop() {
        this.#stopRequested = true
    }

    _debug(msg) {
        if (this.debugging_log) {
            console.log(`[${this.#cycle_seq}] ${msg}`)
        }

    }
}

async function asyncToSync(asyncOriginalFunc) {
    const result = await asyncOriginalFunc()
    return () => {
        return result;
    }
}

module.exports = {Coach, delay}
