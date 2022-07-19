import { Client, NewClientFromConfig } from './client.js';
import { EnvVarLoader } from './configurator.js';
import { Goal } from './goal.js';
import { Mapper, Region } from './mapper.js';
import * as ORIENTATION from './orentation.js';
import * as Lugo from './proto_exported.js';
import { SPECS } from "./specs.js";
import { Bot, PLAYER_STATE } from './stub.js';
import * as vectors from "./vector.js";
export { Client, NewClientFromConfig, EnvVarLoader, Goal, Mapper, Region, ORIENTATION, SPECS, Bot, PLAYER_STATE, Lugo, vectors, };
export declare class GameSnapshotReader {
    readonly mySide: any;
    /**
     * @type {GameSnapshot}
     */
    readonly snapshot: any;
    constructor(snapshot: Lugo.GameSnapshot, mySide: Lugo.Team.Side);
    /**
     *
     * @returns {Team}
     */
    getMyTeam(): Lugo.Team;
    /**
     * @param { Lugo.Team.Side} side
     * @returns {Team}
     */
    getTeam(side: any): Lugo.Team;
    /**
     *
     * @param { Player} player
     * @returns {boolean}
     */
    isBallHolder(player: Lugo.Player): boolean;
    /**
     *
     * @returns {Lugo.Team.Side}
     */
    getOpponentSide(): Lugo.Team.Side;
    /**
     *
     * @returns {Goal}
     */
    getMyGoal(): Goal;
    /**
     *
     * @returns {Lugo.Ball}
     */
    getBall(): Lugo.Ball;
    /**
     *
     * @returns {Goal}
     */
    getOpponentGoal(): Goal;
    /**
     *
     * @param {.Lugo.Team.Side} side
     * @param {number} number
     * @returns {.Player}
     */
    getPlayer(side: Lugo.Team.Side, number: number): Lugo.Player | null;
    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @return {Order}
     */
    makeOrderMoveMaxSpeed(origin: Lugo.Point, target: Lugo.Point): Lugo.Order;
    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @param speed
     * @returns {Order}
     */
    makeOrderMove(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order;
    /**
     *
     * @param {Vector} direction
     * @param {number} speed
     * @returns {Order}
     * @private
     */
    private _makeOrderMoveFromVector;
    makeOrderMoveByDirection(direction: DIRECTION): Lugo.Order;
    makeOrderJump(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order;
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @param {number} speed
     * @returns {Order}
     */
    makeOrderKick(ball: Lugo.Ball, target: Lugo.Point, speed: number): Lugo.Order;
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @returns {Order}
     */
    makeOrderKickMaxSpeed(ball: Lugo.Ball, target: Lugo.Point): Lugo.Order;
    /**
     *
     * @returns {!Order}
     */
    makeOrderCatch(): Lugo.Order;
}
export declare const awayGoal: Goal;
export declare const homeGoal: Goal;
export declare enum DIRECTION {
    FORWARD = 0,
    BACKWARD = 1,
    LEFT = 2,
    RIGHT = 3,
    BACKWARD_LEFT = 4,
    BACKWARD_RIGHT = 5,
    FORWARD_LEFT = 6,
    FORWARD_RIGHT = 7
}
/**
 *
 * @param {GameSnapshot}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
export declare function defineState(snapshot: Lugo.GameSnapshot, playerNumber: number, side: Lugo.Team.Side): PLAYER_STATE;
