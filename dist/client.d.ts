import { Point } from "./pb/physics_pb.js";
import { OrderSet } from "./pb/server_pb.js";
import { Bot } from './stub.js';
import { EnvVarLoader } from './configurator.js';
export declare const PROTOCOL_VERSION = "1.0.0";
export declare type RawTurnProcessor = (OrderSet: any, GameSnapshot: any) => Promise<OrderSet>;
/**
 *
 * @param {EnvVarLoader} config
 * @param {Point} initialPosition
 * @returns {Client}
 */
export declare function NewClientFromConfig(config: EnvVarLoader, initialPosition: Point): Client;
export declare class Client {
    private readonly serverAdd;
    private grpc_insecure;
    private readonly token;
    private readonly teamSide;
    private readonly number;
    /**
     * @type {Point}
     */
    private readonly init_position;
    private client;
    /**
     * @type {function(GameSnapshot)}
     */
    private gettingReadyHandler;
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
    constructor(server_add: any, grpc_insecure: any, token: any, teamSide: any, number: any, init_position: any);
    /**
     *
     * @param {Bot} bot
     * @param {function()} onJoin
     * @returns {Promise<void>}
     */
    playAsBot(bot: Bot, onJoin?: () => void): Promise<void>;
    /**
     *
     * @param {function} raw_processor
     * @param {function()} onJoin
     */
    play(raw_processor: RawTurnProcessor, onJoin?: () => void): Promise<void>;
    /**
     *
     * @param {function(GameSnapshot)} handler
     *
     * @returns {Client}
     */
    setGettingReadyHandler(handler: any): this;
    /**
     *
     * @param {function(OrderSet, GameSnapshot):OrderSet} processor
     * @param {function()} onJoin
     */
    _start(processor: RawTurnProcessor, onJoin?: () => void): Promise<void>;
    /**
     *
     * @param {OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    orderSetSender(orderSet: OrderSet): Promise<void>;
}
