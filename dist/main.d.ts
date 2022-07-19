import { Client, NewClientFromConfig } from './client.js';
import { EnvVarLoader } from './configurator.js';
import { Goal } from './goal.js';
import { Mapper, Region } from './mapper.js';
import * as ORIENTATION from './orentation.js';
import { Ball, Catch, GameSnapshot, Jump, Kick, Move, Order, Player, Team, JoinRequest, OrderSet, ShotClock, OrderResponse, WatcherRequest, StartRequest, GameEvent, GameSetup, TeamSettings, TeamColors, TeamColor, EventNewPlayer, EventLostPlayer, EventStateChange, EventGoal, EventGameOver, EventDebugBreakpoint, EventDebugReleased, CommandResponse, GameProperties, PlayerProperties, BallProperties, NextOrderRequest, PauseResumeRequest, NextTurnRequest, BroadcastClient, RemoteClient, GameClient } from './proto_exported.js';
import { SPECS } from "./specs.js";
import { Bot, PLAYER_STATE } from './stub.js';
import { sub, NewVector, getScaledVector, normalize, getLength } from "./vector.js";
import { Point, Vector, Velocity } from './pb/physics_pb.js';
export declare const vectors: {
    sub: typeof sub;
    NewVector: typeof NewVector;
    getScaledVector: typeof getScaledVector;
    normalize: typeof normalize;
    getLength: typeof getLength;
};
export { Client, NewClientFromConfig, EnvVarLoader, Goal, Mapper, Region, ORIENTATION, SPECS, Bot, PLAYER_STATE, Point, Vector, Velocity, };
export { Ball, Catch, GameSnapshot, Jump, Kick, Move, Order, Player, Team, JoinRequest, OrderSet, ShotClock, OrderResponse, WatcherRequest, StartRequest, GameEvent, GameSetup, TeamSettings, TeamColors, TeamColor, EventNewPlayer, EventLostPlayer, EventStateChange, EventGoal, EventGameOver, EventDebugBreakpoint, EventDebugReleased, CommandResponse, GameProperties, PlayerProperties, BallProperties, NextOrderRequest, PauseResumeRequest, NextTurnRequest, BroadcastClient, RemoteClient, GameClient, };
export declare class GameSnapshotReader {
    readonly mySide: any;
    /**
     * @type {GameSnapshot}
     */
    readonly snapshot: any;
    constructor(snapshot: GameSnapshot, mySide: Team.Side);
    /**
     *
     * @returns {Team}
     */
    getMyTeam(): Team;
    /**
     * @param { Team.Side} side
     * @returns {Team}
     */
    getTeam(side: any): Team;
    /**
     *
     * @param { Player} player
     * @returns {boolean}
     */
    isBallHolder(player: Player): boolean;
    /**
     *
     * @returns {Team.Side}
     */
    getOpponentSide(): Team.Side;
    /**
     *
     * @returns {Goal}
     */
    getMyGoal(): Goal;
    /**
     *
     * @returns {Ball}
     */
    getBall(): Ball;
    /**
     *
     * @returns {Goal}
     */
    getOpponentGoal(): Goal;
    /**
     *
     * @param {.Team.Side} side
     * @param {number} number
     * @returns {.Player}
     */
    getPlayer(side: Team.Side, number: number): Player | null;
    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @return {Order}
     */
    makeOrderMoveMaxSpeed(origin: Point, target: Point): Order;
    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @param speed
     * @returns {Order}
     */
    makeOrderMove(origin: Point, target: Point, speed: number): Order;
    /**
     *
     * @param {Vector} direction
     * @param {number} speed
     * @returns {Order}
     * @private
     */
    private _makeOrderMoveFromVector;
    makeOrderMoveByDirection(direction: DIRECTION): Order;
    makeOrderJump(origin: Point, target: Point, speed: number): Order;
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @param {number} speed
     * @returns {Order}
     */
    makeOrderKick(ball: Ball, target: Point, speed: number): Order;
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @returns {Order}
     */
    makeOrderKickMaxSpeed(ball: Ball, target: Point): Order;
    /**
     *
     * @returns {!Order}
     */
    makeOrderCatch(): Order;
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
export declare function defineState(snapshot: GameSnapshot, playerNumber: number, side: Team.Side): PLAYER_STATE;
