import {GameClient} from "./pb/ServerServiceClientPb.js"
import {Point} from "./pb/physics_pb.js"
import {GameSnapshot, JoinRequest, OrderSet, Team} from "./pb/server_pb.js"
import {Bot, PLAYER_STATE} from './stub.js'
import {EnvVarLoader} from './configurator.js'
import {defineState} from './main.js'

export const PROTOCOL_VERSION = "1.0.0"

/**
 *
 * @param {EnvVarLoader} config
 * @param {Point} initialPosition
 * @returns {Client}
 */
export function NewClientFromConfig(config: EnvVarLoader, initialPosition: Point): Client {
    return new Client(
        config.getGrpcUrl(),
        config.getGrpcInsecure(),
        config.getBotToken(),
        config.getBotTeamSide(),
        config.getBotNumber(),
        initialPosition,
    )
}

export class Client {
    private readonly serverAdd: string
    private grpc_insecure: boolean
    private readonly token: string
    private readonly teamSide: Team.Side
    private readonly number: number
    /**
     * @type {Point}
     */
    private readonly init_position: Point

    private client: GameClient;

    /**
     * @type {function(GameSnapshot)}
     */
    private gettingReadyHandler = function (gs: GameSnapshot) {
    }

    /**
     *
     * @param server_add {string}
     * @param grpc_insecure {boolean}
     * @param token {string}
     * @param teamSide {number}
     * @param number {number}
     * @param init_position {Point}
     * @return {Promise<void>}
     */
    constructor(server_add, grpc_insecure, token, teamSide, number, init_position) {
        this.serverAdd = server_add
        this.grpc_insecure = grpc_insecure
        this.token = token
        this.teamSide = teamSide
        this.number = number
        this.init_position = init_position
    }


    /**
     *
     * @param {BotStub} bot
     * @param {function()} onJoin
     * @returns {Promise<void>}
     */
    async playAsBot(bot: Bot, onJoin = () => {
    }) {
        return this.setGettingReadyHandler(s => {
            bot.gettingReady(s)
        })._start((ordersSet, snapshot) => {
            const playerState = defineState(snapshot, this.number, this.teamSide)
            if (this.number === 1) {
                return bot.asGoalkeeper(ordersSet, snapshot, playerState);
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
        }, onJoin)
    }

    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} raw_processor
     * @param {function()} onJoin
     */
    async play(raw_processor, onJoin = () => {
    }) {
        return this._start(raw_processor, onJoin)
    }

    /**
     *
     * @param {function(GameSnapshot)} handler
     *
     * @returns {Client}
     */
    setGettingReadyHandler(handler) {
        this.gettingReadyHandler = handler
        return this
    }

    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} bot
     * @param {function()} onJoin
     */
    async _start(bot, onJoin = () => {
    }) {
        await new Promise((resolve, reject) => {
            // the random guarantee that we will have multiple connections instead of using pool of connections
            this.client = new GameClient(`${this.serverAdd}?random=${Math.random()}`)
            const deadline = new Date();


            deadline.setSeconds(deadline.getSeconds() + 5);
            // this.client.waitForReady(deadline, (err) => {
            //     if (err) {
            //         reject(new Error(`failed to connect to the Game Server: ${err}`))
            //     }
            //     console.log(`connect to the gRPC server ${this.teamSide === Team.Side.HOME ? "HOME" : "AWAY"}-${this.number}`)

            const req = new JoinRequest()
            req.setToken(this.token)
            req.setProtocolVersion(PROTOCOL_VERSION)
            req.setTeamSide(this.teamSide)
            req.setNumber(this.number)
            req.setInitPosition(this.init_position)
            const running = this.client.joinATeam(req)
            onJoin()

            running.on('data', async (snapshot) => {
                try {
                    switch (snapshot.getState()) {
                        case GameSnapshot.State.LISTENING:
                            let orderSet = new OrderSet()
                            orderSet.setTurn(snapshot.getTurn())
                            try {
                                orderSet = await bot(orderSet, snapshot)
                            } catch (e) {
                                console.error(`bot error`, e)
                            }
                            if (orderSet) {
                                await this.orderSetSender(orderSet)
                            } else {
                                console.log(`[turn #${snapshot.getTurn()}] bot did not return orders`)
                            }
                            break;
                        case GameSnapshot.State.GET_READY:
                            this.gettingReadyHandler(snapshot)
                            break;

                    }
                } catch (e) {
                    console.error(`internal error processing turn`, e)
                }

            });
            running.on('status', function () {
                // process status
                // console.log('status', status);
            });

            running.on('error', async (e) => {
                reject(new Error(`error on team connection: ${e}`))
            });
            running.on('end', function () {
                console.log('communication done');
                resolve(null)
            });
        })
        // })
    }

    /**
     *
     * @param {OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    async orderSetSender(orderSet) {
        /** @type {module:grpc.ClientUnaryCall} response */
        const response = await this.client.sendOrders(orderSet, null)

        // console.log(response.getPeer())
    }
}

