var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GameClient } from "./pb/ServerServiceClientPb";
import { GameSnapshot, JoinRequest, OrderSet, Team } from "./pb/server_pb";
import { PLAYER_STATE } from './stub';
import { defineState } from './main';
export const PROTOCOL_VERSION = "1.0.0";
/**
 *
 * @param {EnvVarLoader} config
 * @param {Point} initialPosition
 * @returns {Client}
 */
export function NewClientFromConfig(config, initialPosition) {
    return new Client(config.grpcUrl, config.grpcInsecure, config.botToken, config.botTeamSide, config.botNumber, initialPosition);
}
export class Client {
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
        /**
         * @type {function(GameSnapshot)}
         */
        this.gettingReadyHandler = function (gs) {
        };
        this.serverAdd = server_add;
        this.grpc_insecure = grpc_insecure;
        this.token = token;
        this.teamSide = teamSide;
        this.number = number;
        this.init_position = init_position;
    }
    /**
     *
     * @param {BotStub} bot
     * @param {function()} onJoin
     * @returns {Promise<void>}
     */
    playAsBot(bot, onJoin = () => {
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.setGettingReadyHandler(s => {
                bot.gettingReady(s);
            })._start((ordersSet, snapshot) => {
                const playerState = defineState(snapshot, this.number, this.teamSide);
                if (this.number === 1) {
                    return bot.asGoalkeeper(ordersSet, snapshot, playerState);
                }
                switch (playerState) {
                    case PLAYER_STATE.DISPUTING_THE_BALL:
                        return bot.onDisputing(ordersSet, snapshot);
                    case PLAYER_STATE.DEFENDING:
                        return bot.onDefending(ordersSet, snapshot);
                    case PLAYER_STATE.SUPPORTING:
                        return bot.onSupporting(ordersSet, snapshot);
                    case PLAYER_STATE.HOLDING_THE_BALL:
                        return bot.onHolding(ordersSet, snapshot);
                }
            }, onJoin);
        });
    }
    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} raw_processor
     * @param {function()} onJoin
     */
    play(raw_processor, onJoin = () => {
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._start(raw_processor, onJoin);
        });
    }
    /**
     *
     * @param {function(GameSnapshot)} handler
     *
     * @returns {Client}
     */
    setGettingReadyHandler(handler) {
        this.gettingReadyHandler = handler;
        return this;
    }
    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} bot
     * @param {function()} onJoin
     */
    _start(bot, onJoin = () => {
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                // the random guarantee that we will have multiple connections instead of using pool of connections
                this.client = new GameClient(`${this.serverAdd}?random=${Math.random()}`);
                const deadline = new Date();
                deadline.setSeconds(deadline.getSeconds() + 5);
                this.client.waitForReady(deadline, (err) => {
                    if (err) {
                        reject(new Error(`failed to connect to the Game Server: ${err}`));
                    }
                    console.log(`connect to the gRPC server ${this.teamSide === Team.Side.HOME ? "HOME" : "AWAY"}-${this.number}`);
                    const req = new JoinRequest();
                    req.setToken(this.token);
                    req.setProtocolVersion(PROTOCOL_VERSION);
                    req.setTeamSide(this.teamSide);
                    req.setNumber(this.number);
                    req.setInitPosition(this.init_position);
                    const running = this.client.joinATeam(req);
                    onJoin();
                    running.on('data', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            switch (snapshot.getState()) {
                                case GameSnapshot.State.LISTENING:
                                    let orderSet = new OrderSet();
                                    orderSet.setTurn(snapshot.getTurn());
                                    try {
                                        orderSet = yield bot(orderSet, snapshot);
                                    }
                                    catch (e) {
                                        console.error(`bot error`, e);
                                    }
                                    if (orderSet) {
                                        this.orderSetSender(orderSet);
                                    }
                                    else {
                                        console.log(`[turn #${snapshot.getTurn()}] bot did not return orders`);
                                    }
                                    break;
                                case GameSnapshot.State.GET_READY:
                                    this.gettingReadyHandler(snapshot);
                                    break;
                            }
                        }
                        catch (e) {
                            console.error(`internal error processing turn`, e);
                        }
                    }));
                    running.on('status', function () {
                        // process status
                        // console.log('status', status);
                    });
                    running.on('error', (e) => __awaiter(this, void 0, void 0, function* () {
                        this.client.close();
                        reject(new Error(`error on team connection: ${e}`));
                    }));
                    running.on('end', function () {
                        console.log('communication done');
                        resolve(null);
                    });
                });
            });
        });
    }
    /**
     *
     * @param {OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    orderSetSender(orderSet) {
        /** @type {module:grpc.ClientUnaryCall} response */
        const response = this.client.sendOrders(orderSet, (res) => {
            // console.log(`Eu odeio JS`, res)
        });
        // console.log(response.getPeer())
    }
}
