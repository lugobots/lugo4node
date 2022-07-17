import {Client, NewClientFromConfig} from './client'
import {EnvVarLoader} from './configurator'
import {Goal} from './goal'
import {Map, Region} from './mapper'
import * as ORIENTATION from './orentation'
import * as Lugo from './proto_exported'
import {SPECS} from "./specs";
import {Bot, PLAYER_STATE} from './stub'
import * as vectors from "./vector";
// imports actually used in this file
import {Ball, Catch, GameSnapshot, Jump, Kick, Move, Order, Player, Team,} from "./pb/server_pb";
import {Point, Vector, Velocity} from './pb/physics_pb'


export {
    Client,NewClientFromConfig,
    EnvVarLoader,
    Goal,
    Map, Region,
    ORIENTATION,
    Lugo,
    SPECS,
    Bot, PLAYER_STATE,
    vectors,
}


const homeGoalCenter = new Point()
homeGoalCenter.setX(0)
homeGoalCenter.setY(SPECS.MAX_Y_COORDINATE / 2)

const homeGoalTopPole = new Point()
homeGoalTopPole.setX(0)
homeGoalTopPole.setY(SPECS.GOAL_MAX_Y)

const homeGoalBottomPole = new Point()
homeGoalBottomPole.setX(0)
homeGoalBottomPole.setY(SPECS.GOAL_MIN_Y)


const awayGoalCenter = new Point()
awayGoalCenter.setX(SPECS.MAX_X_COORDINATE)
awayGoalCenter.setY(SPECS.MAX_Y_COORDINATE / 2)


const awayGoalTopPole = new Point()
awayGoalTopPole.setX(SPECS.MAX_X_COORDINATE)
awayGoalTopPole.setY(SPECS.GOAL_MAX_Y)

const awayGoalBottomPole = new Point()
awayGoalBottomPole.setX(SPECS.MAX_X_COORDINATE)
awayGoalBottomPole.setY(SPECS.GOAL_MIN_Y)


export class GameSnapshotReader {
    readonly mySide;

    /**
     * @type {GameSnapshot}
     */
    readonly snapshot;

    constructor(snapshot: GameSnapshot, mySide: Team.Side) {
        this.snapshot = snapshot
        this.mySide = mySide
    }

    /**
     *
     * @returns {Team}
     */
    getMyTeam(): Team {
        return this.getTeam(this.mySide)
    }

    /**
     * @param { Team.Side} side
     * @returns {Team}
     */
    getTeam(side): Team {
        if (side === Team.Side.HOME) {
            return this.snapshot.getHomeTeam()
        }
        return this.snapshot.getAwayTeam()
    }


    /**
     *
     * @param { Player} player
     * @returns {boolean}
     */
    isBallHolder(player: Player): boolean {
        const ball = this.snapshot.getBall()

        return ball.getHolder() != null && ball.getHolder().getTeamSide() === player.getTeamSide() && ball.getHolder().getNumber() === player.getNumber()
    }

    /**
     *
     * @returns {Team.Side}
     */
    getOpponentSide(): Team.Side {
        if (this.mySide === Team.Side.HOME) {
            return Team.Side.AWAY
        }
        return Team.Side.HOME
    }

    /**
     *
     * @returns {Goal}
     */
    getMyGoal(): Goal {
        if (this.mySide === Team.Side.HOME) {
            return homeGoal
        }
        return awayGoal
    }

    /**
     *
     * @returns {Ball}
     */
    getBall(): Ball {
        return this.snapshot.getBall()
    }

    /**
     *
     * @returns {Goal}
     */
    getOpponentGoal(): Goal {
        if (this.mySide === Team.Side.HOME) {
            return awayGoal
        }
        return homeGoal
    }

    /**
     *
     * @param {.Team.Side} side
     * @param {number} number
     * @returns {.Player}
     */
    getPlayer(side: Team.Side, number: number): Player | null {
        const team = this.getTeam(side)
        if (team == null) {
            return null
        }
        for (const player of team.getPlayersList()) {
            if (player.getNumber() === number) {
                return player
            }
        }
        return null
    }

    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @return {Order}
     */
    makeOrderMoveMaxSpeed(origin: Point, target: Point): Order {
        return this.makeOrderMove(origin, target, SPECS.PLAYER_MAX_SPEED)
    }

    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @param speed
     * @returns {Order}
     */
    makeOrderMove(origin: Point, target: Point, speed: number): Order {
        if (origin.getX() === target.getX() && origin.getY() === target.getY()) {
            // a vector cannot have zeroed direction. In this case, the player will just be stopped
            return this._makeOrderMoveFromVector(ORIENTATION.NORTH, 0)
        }

        let direction = vectors.NewVector(origin, target)
        direction = vectors.normalize(direction)
        return this._makeOrderMoveFromVector(direction, speed)
    }

    /**
     *
     * @param {Vector} direction
     * @param {number} speed
     * @returns {Order}
     * @private
     */
    private _makeOrderMoveFromVector(direction: Vector, speed: number): Order {
        const velocity = new Velocity()
        velocity.setDirection(direction)
        velocity.setSpeed(speed)

        const moveOrder = new Move()
        moveOrder.setVelocity(velocity)
        return new Order().setMove(moveOrder)
    }

    makeOrderMoveByDirection(direction: DIRECTION): Order {
        let directionTarget;
        switch (direction) {
            case DIRECTION.FORWARD:
                directionTarget = ORIENTATION.EAST
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.WEST
                }
                break;
            case DIRECTION.BACKWARD:
                directionTarget = ORIENTATION.WEST
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.EAST
                }
                break;
            case DIRECTION.LEFT:
                directionTarget = ORIENTATION.NORTH
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH
                }
                break;
            case DIRECTION.RIGHT:
                directionTarget = ORIENTATION.SOUTH
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH
                }
                break;
            case DIRECTION.BACKWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_WEST
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_EAST
                }
                break;
            case DIRECTION.BACKWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_WEST
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_EAST
                }
                break;
            case DIRECTION.FORWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_EAST
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_WEST
                }
                break;
            case DIRECTION.FORWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_EAST
                if (this.mySide === Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_WEST
                }
                break;
            default:
                throw new Error(`unknown direction ${direction}`)

        }
        return this._makeOrderMoveFromVector(directionTarget, SPECS.PLAYER_MAX_SPEED)
    }


    makeOrderJump(origin: Point, target: Point, speed: number): Order {
        let direction = ORIENTATION.EAST
        if (origin.getX() !== target.getX() || origin.getY() !== target.getY()) {
            // a vector cannot have zeroed direction. In this case, the player will just be stopped
            direction = vectors.NewVector(origin, target)
            direction = vectors.normalize(direction)
        }
        const velocity = new Velocity()
        velocity.setDirection(direction)
        velocity.setSpeed(speed)

        const jump = new Jump()
        jump.setVelocity(velocity)

        return new Order().setJump(jump)
    }

    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @param {number} speed
     * @returns {Order}
     */
    makeOrderKick(ball: Ball, target: Point, speed: number): Order {
        const ballExpectedDirection = vectors.NewVector(ball.getPosition(), target)

        // the ball velocity is summed to the kick velocity, so we have to consider the current ball direction
        const diffVector = vectors.sub(ballExpectedDirection, ball.getVelocity().getDirection())

        const newVelocity = new Velocity()
        newVelocity.setSpeed(speed)
        newVelocity.setDirection(vectors.normalize(diffVector))
        return new Order().setKick(new Kick().setVelocity(newVelocity))
    }

    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @returns {Order}
     */
    makeOrderKickMaxSpeed(ball: Ball, target: Point): Order {
        return this.makeOrderKick(ball, target, SPECS.BALL_MAX_SPEED)
    }

    /**
     *
     * @returns {!Order}
     */
    makeOrderCatch(): Order {
        return new Order().setCatch(new Catch())
    }

}

export const awayGoal = new Goal(
    Team.Side.AWAY,
    awayGoalCenter,
    awayGoalTopPole,
    awayGoalBottomPole
)
export const homeGoal = new Goal(
    Team.Side.HOME,
    homeGoalCenter,
    homeGoalTopPole,
    homeGoalBottomPole
)

export enum DIRECTION {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT,
    BACKWARD_LEFT,
    BACKWARD_RIGHT,
    FORWARD_LEFT,
    FORWARD_RIGHT,
}


/**
 *
 * @param {GameSnapshot}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
export function defineState(snapshot: GameSnapshot, playerNumber: number, side: Team.Side): PLAYER_STATE {
    if (!snapshot || !snapshot.getBall()) {
        throw new Error('invalid snapshot state - cannot define player state')
    }

    const reader = new GameSnapshotReader(snapshot, side)
    const me = reader.getPlayer(side, playerNumber)
    if (!me) {
        throw new Error('could not find the bot in the snapshot - cannot define player state')
    }

    const ballHolder = snapshot.getBall().getHolder()
    if (!ballHolder) {
        return PLAYER_STATE.DISPUTING_THE_BALL
    } else if (ballHolder.getTeamSide() === side) {
        if (ballHolder.getNumber() === playerNumber) {
            return PLAYER_STATE.HOLDING_THE_BALL
        }
        return PLAYER_STATE.SUPPORTING
    }
    return PLAYER_STATE.DEFENDING
}
