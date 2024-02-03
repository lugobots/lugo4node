import { credentials } from '@grpc/grpc-js'
import { Point } from "./pb/physics_pb.js"
import { GameClient } from './pb/server_grpc_pb'
import { GameSnapshot, JoinRequest, Order, OrderSet, Team } from "./pb/server_pb.js"

import { EnvVarLoader } from './configurator.js'
import GameSnapshotInspector from "./game-snapshot-inspector.js"
import { defineState } from './index'
import { Bot, PLAYER_STATE } from './stub.js'


export const PROTOCOL_VERSION = "1.0.0"

export type RawTurnProcessorReturn = Order[] | { orders: Order[], debug_message: string } | null;
export type RawTurnProcessor = (inspector: GameSnapshotInspector) => Promise<RawTurnProcessorReturn>

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
     * @type {function(GameSnapshotInspector)}
     */
    private gettingReadyHandler = function (gs: GameSnapshotInspector) {
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
     * @param {Bot} bot
     * @param {function()} onJoin
     * @returns {Promise<void>}
     */
    async playAsBot(bot: Bot, onJoin = () => {
    }) {
        return this.setGettingReadyHandler(s => {
            bot.gettingReady(s)
        })._start((inspector: GameSnapshotInspector): Promise<RawTurnProcessorReturn> => {
            return new Promise((resolve, reject) => {
                const playerState = defineState(inspector, this.number, this.teamSide)
                if (this.number === 1) {
                    resolve(bot.asGoalkeeper(inspector, playerState));
                    return
                }
                switch (playerState) {
                    case PLAYER_STATE.DISPUTING_THE_BALL:
                        resolve(bot.onDisputing(inspector));
                        break;
                    case PLAYER_STATE.DEFENDING:
                        resolve(bot.onDefending(inspector));
                        break;
                    case PLAYER_STATE.SUPPORTING:
                        resolve(bot.onSupporting(inspector));
                        break;
                    case PLAYER_STATE.HOLDING_THE_BALL:
                        resolve(bot.onHolding(inspector));
                        break;
                }
            });
        }, onJoin)
    }

    /**
     *
     * @param {function} raw_processor
     * @param {function()} onJoin
     */
    async play(raw_processor: RawTurnProcessor, onJoin = () => {
    }) {
        return this._start(raw_processor, onJoin)
    }

    /**
     *
     * @param {function(GameSnapshotInspector)} handler
     *
     * @returns {Client}
     */
    setGettingReadyHandler(handler: (s: GameSnapshotInspector) => void) {
        this.gettingReadyHandler = handler
        return this
    }

    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} processor
     * @param {function()} onJoin
     */
    async _start(processor: RawTurnProcessor, onJoin = () => {
    }) {
        await new Promise((resolve, reject) => {
            const serverURL = `${this.serverAdd}`
            // the random guarantee that we will have multiple connections instead of using pool of connections
            this.client = new GameClient(serverURL, credentials.createInsecure(), {"primary_user_agent" : `agent ${Math.random()}`})
            const deadline = new Date();


            deadline.setSeconds(deadline.getSeconds() + 10);
            this.client.waitForReady(deadline, (err) => {
                if (err) {
                    reject(new Error(`failed to connect to the Game Server at '${serverURL}': ${err}`))
                }
                console.log(`connect to the gRPC server ${this.teamSide === Team.Side.HOME ? "HOME" : "AWAY"}-${this.number}`)

                const req = new JoinRequest()
                req.setToken(this.token)
                req.setProtocolVersion(PROTOCOL_VERSION)
                req.setTeamSide(this.teamSide)
                req.setNumber(this.number)
                req.setInitPosition(this.init_position)
                const running = this.client.joinATeam(req)
                onJoin()

                running.on('data', async (snapshot: GameSnapshot) => {
                    try {
                        const inspector = new GameSnapshotInspector(this.teamSide, this.number, snapshot);
                        switch (snapshot.getState()) {
                            case GameSnapshot.State.LISTENING:
                                let orderSet = new OrderSet()
                                orderSet.setTurn(snapshot.getTurn())
                                try {
                                     const botReturn = await processor(inspector);

                                    if(!botReturn) {
                                        orderSet.setOrdersList([]);
                                    }

                                    if(Array.isArray(botReturn)) {
                                        orderSet.setOrdersList(botReturn);
                                    } else {
                                        orderSet.setOrdersList(botReturn.orders);
                                        orderSet.setDebugMessage(botReturn.debug_message);
                                    }
                                } catch (e) {
                                    console.error(`bot error`, e.message)
                                }
                                if (orderSet) {
                                    await this.orderSetSender(orderSet)
                                } else {
                                    console.log(`[turn #${snapshot.getTurn()}] bot did not return orders`)
                                }
                                break;
                            case GameSnapshot.State.GET_READY:
                                this.gettingReadyHandler(inspector)
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
                running.on('end',  () => {
                    console.log(`[${this.teamSide === Team.Side.HOME ? "HOME" : "AWAY"}-${this.number}] communication done`);
                    resolve(null)
                });
            })
        })
    }

    /**
     *
     * @param {OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    async orderSetSender(orderSet: OrderSet) {
        /** @type {module:grpc.ClientUnaryCall} response */
        const response = await this.client.sendOrders(orderSet, () => {
        })

        // console.log(response.getPeer())
    }
}

