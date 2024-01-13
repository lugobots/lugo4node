import { Client, NewClientFromConfig } from './client';
import { EnvVarLoader } from './configurator';
import { Goal } from './goal';
import { Mapper, Region } from './mapper';
import * as ORIENTATION from './orentation';
import * as Lugo from './proto_exported';
import { SPECS } from "./specs.js";
import { Bot, PLAYER_STATE } from './stub';
import * as geo from "./geo";
import { normalize, distanceBetweenPoints, getLength, subVector, getScaledVector, NewVector } from "./geo";
import * as rl from "./rl/index";
import GameSnapshotInspector from './game-snapshot-inspector';
export { rl, Client, NewClientFromConfig, EnvVarLoader, Goal, Mapper, Region, ORIENTATION, SPECS, Bot, PLAYER_STATE, Lugo, geo, // keeping backward compatibility
normalize, distanceBetweenPoints, getLength, subVector, getScaledVector, NewVector, };
export declare class GameSnapshotReader {
    readonly mySide: any;
    /**
     * @type {Lugo.GameSnapshot}
     */
    readonly snapshot: any;
    constructor(snapshot: Lugo.GameSnapshot, mySide: Lugo.Team.Side);
    /**
     * Returns the bot team
     * @returns {Lugo.Team}
     */
    getMyTeam(): Lugo.Team;
    /**
     * Returns the opponent team
     * @returns {Lugo.Team}
     */
    getOpponentTeam(): Lugo.Team;
    /**
     * @param { Lugo.Team.Side} side
     * @returns {Lugo.Team}
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
    makeOrderMoveFromVector(direction: Lugo.Vector, speed: number): Lugo.Order;
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
export declare function defineState(snapshot: GameSnapshotInspector, playerNumber: number, side: Lugo.Team.Side): PLAYER_STATE;
