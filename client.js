'use strict';
const grpc = require("grpc");
const game_service = require("./pb/server_grpc_pb");
require("./pb/server_pb")
const game_msg = require("./pb/server_pb")
const {BotStub, defineState, PLAYER_STATE} = require('./stub')

const PROTOCOL_VERSION = "1.0.0"

class Client {
    #serverAdd
    #token
    #teamSide
    #number
    /**
     * @type {proto.lugo.Point}
     */
    #initPosition

    #client;

    /**
     * @var {BotStub}
     */
    merda;

    /**
     *
     * @param serverAdd {string}
     * @param token {string}
     * @param teamSide {number}
     * @param number {number}
     * @param initPosition {proto.lugo.Point}
     * @return {Promise<void>}
     */
    constructor(serverAdd, token, teamSide, number, initPosition) {
        this.#serverAdd = serverAdd
        this.#token = token
        this.#teamSide = teamSide
        this.#number = number
        this.#initPosition = initPosition
    }


    /**
     *
     * @param {BotStub} bot
     * @returns {Promise<void>}
     */
    async playAsBot(bot) {
        if (!(bot instanceof BotStub)) {
            throw new Error("you must pass a BotStub child class")
        }
        return this._start((ordersSet, snapshot) => {
            const playerState = defineState(snapshot, this.#number, this.#teamSide)
            if (this.#number === 1) {
                return bot.asGoalkeeper(ordersSet, snapshot, playerState)
            }
            switch (playerState) {
                case PLAYER_STATE.DISPUTING_THE_BALL:
                    return bot.onDisputing(ordersSet, snapshot)
                case PLAYER_STATE.DEFENDING:
                    return bot.onDefending(ordersSet, snapshot)
                case PLAYER_STATE.SUPPORTING:
                    return bot.onSupporting(ordersSet, snapshot)
                case PLAYER_STATE.HOLDING_THE_BALL:
                    return bot.onHolding(ordersSet, snapshot)
            }
        })
    }

    /**
     *
     * @param {function(proto.lugo.OrderSet, proto.lugo.GameSnapshot):proto.lugo.OrderSet} rawProcessor
     */
    async play(rawProcessor) {
        return this._start(rawProcessor)
    }

    /**
     *
     * @param {function(proto.lugo.OrderSet, proto.lugo.GameSnapshot):proto.lugo.OrderSet} bot
     */
    async _start(bot) {
        await new Promise((resolve, reject) => {
            this.#client = new game_service.GameClient(this.#serverAdd, grpc.credentials.createInsecure())
            const deadline = new Date();

            deadline.setSeconds(deadline.getSeconds() + 5);
            this.#client.waitForReady(deadline, (err) => {
                if (err) {
                    reject(new Error(`failed to connect to the Game Server: ${err}`))
                }
                console.log(`connect to the gRPC server`)

                const req = new game_msg.JoinRequest()
                req.setToken(this.#token)
                req.setProtocolVersion(PROTOCOL_VERSION)
                req.setTeamSide(this.#teamSide)
                req.setNumber(this.#number)
                req.setInitPosition(this.#initPosition)
                const running = this.#client.joinATeam(req)

                console.log(`Ini position: ${this.#initPosition.getX()}x${this.#initPosition.getY()}`)

                running.on('data', async (snapshot) => {
                    try {
                        if (snapshot.getState() === game_msg.GameSnapshot.State.LISTENING) {
                            let orderSet = new proto.lugo.OrderSet()
                            orderSet.setTurn(snapshot.getTurn())
                            try {
                                orderSet = await bot(orderSet, snapshot)
                            } catch (e) {
                                console.error(`bot error`, e)
                            }
                            if (orderSet) {
                                this.orderSetSender(orderSet)
                            } else {
                                console.log(`[turne #${snapshot.getTurn()}] bot did not return orders`)
                            }
                        }
                    } catch (e) {
                        console.error(`internal error processing turn`, e)
                    }

                });
                running.on('status', function (status) {
                    // process status
                    console.log('status', status);
                });

                running.on('error', function (e) {
                    reject(new Error(`error on team connection: ${e}`))
                });
                running.on('end', function () {
                    console.log('communication done');
                    resolve()
                });
            })
        })
    }

    /**
     *
     * @param {proto.lugo.OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    orderSetSender(orderSet) {
        /** @type {module:grpc.ClientUnaryCall} response */
        const response = this.#client.sendOrders(orderSet, (res) => {
            // console.log(`Eu odeio JS`, res)
        })

        // console.log(response.getPeer())
    }
}

module.exports.Client = Client
