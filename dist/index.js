"use strict";
exports.__esModule = true;
exports.defineState = exports.DIRECTION = exports.subVector = exports.rl = exports.normalize = exports.getScaledVector = exports.getLength = exports.geo = exports.distanceBetweenPoints = exports.SPECS = exports.Region = exports.PLAYER_STATE = exports.ORIENTATION = exports.NewVector = exports.NewClientFromConfig = exports.Mapper = exports.Lugo = exports.Goal = exports.GameSnapshotInspector = exports.EnvVarLoader = exports.Client = void 0;
var client_1 = require("./client");
exports.Client = client_1.Client;
exports.NewClientFromConfig = client_1.NewClientFromConfig;
var configurator_1 = require("./configurator");
exports.EnvVarLoader = configurator_1.EnvVarLoader;
var game_snapshot_inspector_1 = require("./game-snapshot-inspector");
exports.GameSnapshotInspector = game_snapshot_inspector_1["default"];
var geo = require("./geo");
exports.geo = geo;
var geo_1 = require("./geo");
exports.NewVector = geo_1.NewVector;
exports.distanceBetweenPoints = geo_1.distanceBetweenPoints;
exports.getLength = geo_1.getLength;
exports.getScaledVector = geo_1.getScaledVector;
exports.normalize = geo_1.normalize;
exports.subVector = geo_1.subVector;
var goal_1 = require("./goal");
exports.Goal = goal_1.Goal;
var mapper_1 = require("./mapper");
exports.Mapper = mapper_1.Mapper;
exports.Region = mapper_1.Region;
var ORIENTATION = require("./orentation");
exports.ORIENTATION = ORIENTATION;
var Lugo = require("./proto_exported");
exports.Lugo = Lugo;
var rl = require("./rl/index");
exports.rl = rl;
var specs_js_1 = require("./specs.js");
exports.SPECS = specs_js_1.SPECS;
var stub_1 = require("./stub");
exports.PLAYER_STATE = stub_1.PLAYER_STATE;
var homeGoalCenter = new Lugo.Point();
homeGoalCenter.setX(0);
homeGoalCenter.setY(specs_js_1.SPECS.MAX_Y_COORDINATE / 2);
var homeGoalTopPole = new Lugo.Point();
homeGoalTopPole.setX(0);
homeGoalTopPole.setY(specs_js_1.SPECS.GOAL_MAX_Y);
var homeGoalBottomPole = new Lugo.Point();
homeGoalBottomPole.setX(0);
homeGoalBottomPole.setY(specs_js_1.SPECS.GOAL_MIN_Y);
var awayGoalCenter = new Lugo.Point();
awayGoalCenter.setX(specs_js_1.SPECS.MAX_X_COORDINATE);
awayGoalCenter.setY(specs_js_1.SPECS.MAX_Y_COORDINATE / 2);
var awayGoalTopPole = new Lugo.Point();
awayGoalTopPole.setX(specs_js_1.SPECS.MAX_X_COORDINATE);
awayGoalTopPole.setY(specs_js_1.SPECS.GOAL_MAX_Y);
var awayGoalBottomPole = new Lugo.Point();
awayGoalBottomPole.setX(specs_js_1.SPECS.MAX_X_COORDINATE);
awayGoalBottomPole.setY(specs_js_1.SPECS.GOAL_MIN_Y);
// export class GameSnapshotReader {
//     readonly mySide;
//     /**
//      * @type {Lugo.GameSnapshot}
//      */
//     readonly snapshot;
//     constructor(snapshot: Lugo.GameSnapshot, mySide: Lugo.Team.Side) {
//         this.snapshot = snapshot
//         this.mySide = mySide
//     }
//     /**
//      * Returns the bot team
//      * @returns {Lugo.Team}
//      */
//     getMyTeam(): Lugo.Team {
//         return this.getTeam(this.mySide)
//     }
//     /**
//      * Returns the opponent team
//      * @returns {Lugo.Team}
//      */
//     getOpponentTeam(): Lugo.Team {
//         return this.getTeam(this.getOpponentSide())
//     }
//     /**
//      * @param { Lugo.Team.Side} side
//      * @returns {Lugo.Team}
//      */
//     getTeam(side): Lugo.Team {
//         if (side === Lugo.Side.HOME) {
//             return this.snapshot.getHomeTeam()
//         }
//         return this.snapshot.getAwayTeam()
//     }
//     /**
//      *
//      * @param { Player} player
//      * @returns {boolean}
//      */
//     isBallHolder(player: Lugo.Player): boolean {
//         const ball = this.snapshot.getBall()
//         return ball.getHolder() != null && ball.getHolder().getTeamSide() === player.getTeamSide() && ball.getHolder().getNumber() === player.getNumber()
//     }
//     /**
//      *
//      * @returns {Lugo.Team.Side}
//      */
//     getOpponentSide(): Lugo.Team.Side {
//         if (this.mySide === Lugo.Team.Side.HOME) {
//             return Lugo.Team.Side.AWAY
//         }
//         return Lugo.Team.Side.HOME
//     }
//     /**
//      *
//      * @returns {Goal}
//      */
//     getMyGoal(): Goal {
//         if (this.mySide === Lugo.Team.Side.HOME) {
//             return homeGoal
//         }
//         return awayGoal
//     }
//     /**
//      *
//      * @returns {Lugo.Ball}
//      */
//     getBall(): Lugo.Ball {
//         return this.snapshot.getBall()
//     }
//     /**
//      *
//      * @returns {Goal}
//      */
//     getOpponentGoal(): Goal {
//         if (this.mySide === Lugo.Team.Side.HOME) {
//             return awayGoal
//         }
//         return homeGoal
//     }
//     /**
//      *
//      * @param {.Lugo.Team.Side} side
//      * @param {number} number
//      * @returns {.Player}
//      */
//     getPlayer(side: Lugo.Team.Side, number: number): Lugo.Player | null {
//         const team = this.getTeam(side)
//         if (team == null) {
//             return null
//         }
//         for (const player of team.getPlayersList()) {
//             if (player.getNumber() === number) {
//                 return player
//             }
//         }
//         return null
//     }
//     /**
//      *
//      * @param {Point} origin
//      * @param {Point} target
//      * @return {Order}
//      */
//     makeOrderMoveMaxSpeed(origin: Lugo.Point, target: Lugo.Point): Lugo.Order {
//         return this.makeOrderMove(origin, target, SPECS.PLAYER_MAX_SPEED)
//     }
//     /**
//      *
//      * @param {Point} origin
//      * @param {Point} target
//      * @param speed
//      * @returns {Order}
//      */
//     makeOrderMove(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order {
//         if (origin.getX() === target.getX() && origin.getY() === target.getY()) {
//             // a vector cannot have zeroed direction. In this case, the player will just be stopped
//             return this.makeOrderMoveFromVector(ORIENTATION.NORTH, 0)
//         }
//         let direction = geo.NewVector(origin, target)
//         direction = geo.normalize(direction)
//         return this.makeOrderMoveFromVector(direction, speed)
//     }
//     /**
//      *
//      * @param {Vector} direction
//      * @param {number} speed
//      * @returns {Order}
//      * @private
//      */
//     makeOrderMoveFromVector(direction: Lugo.Vector, speed: number): Lugo.Order {
//         const velocity = new Lugo.Velocity()
//         velocity.setDirection(direction)
//         velocity.setSpeed(speed)
//         const moveOrder = new Lugo.Move()
//         moveOrder.setVelocity(velocity)
//         return new Lugo.Order().setMove(moveOrder)
//     }
//     makeOrderMoveByDirection(direction: DIRECTION): Lugo.Order {
//         let directionTarget;
//         switch (direction) {
//             case DIRECTION.FORWARD:
//                 directionTarget = ORIENTATION.EAST
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.WEST
//                 }
//                 break;
//             case DIRECTION.BACKWARD:
//                 directionTarget = ORIENTATION.WEST
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.EAST
//                 }
//                 break;
//             case DIRECTION.LEFT:
//                 directionTarget = ORIENTATION.NORTH
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.SOUTH
//                 }
//                 break;
//             case DIRECTION.RIGHT:
//                 directionTarget = ORIENTATION.SOUTH
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.NORTH
//                 }
//                 break;
//             case DIRECTION.BACKWARD_LEFT:
//                 directionTarget = ORIENTATION.NORTH_WEST
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.SOUTH_EAST
//                 }
//                 break;
//             case DIRECTION.BACKWARD_RIGHT:
//                 directionTarget = ORIENTATION.SOUTH_WEST
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.NORTH_EAST
//                 }
//                 break;
//             case DIRECTION.FORWARD_LEFT:
//                 directionTarget = ORIENTATION.NORTH_EAST
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.SOUTH_WEST
//                 }
//                 break;
//             case DIRECTION.FORWARD_RIGHT:
//                 directionTarget = ORIENTATION.SOUTH_EAST
//                 if (this.mySide === Lugo.Team.Side.AWAY) {
//                     directionTarget = ORIENTATION.NORTH_WEST
//                 }
//                 break;
//             default:
//                 throw new Error(`unknown direction ${direction}`)
//         }
//         return this.makeOrderMoveFromVector(directionTarget, SPECS.PLAYER_MAX_SPEED)
//     }
//     makeOrderJump(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order {
//         let direction = ORIENTATION.EAST
//         if (origin.getX() !== target.getX() || origin.getY() !== target.getY()) {
//             // a vector cannot have zeroed direction. In this case, the player will just be stopped
//             direction = geo.NewVector(origin, target)
//             direction = geo.normalize(direction)
//         }
//         const velocity = new Lugo.Velocity()
//         velocity.setDirection(direction)
//         velocity.setSpeed(speed)
//         const jump = new Lugo.Jump()
//         jump.setVelocity(velocity)
//         return new Lugo.Order().setJump(jump)
//     }
//     /**
//      *
//      * @param {Ball} ball
//      * @param {Point} target
//      * @param {number} speed
//      * @returns {Order}
//      */
//     makeOrderKick(ball: Lugo.Ball, target: Lugo.Point, speed: number): Lugo.Order {
//         const ballExpectedDirection = geo.NewVector(ball.getPosition(), target)
//         // the ball velocity is summed to the kick velocity, so we have to consider the current ball direction
//         const diffVector = geo.subVector(ballExpectedDirection, ball.getVelocity().getDirection())
//         const newVelocity = new Lugo.Velocity()
//         newVelocity.setSpeed(speed)
//         newVelocity.setDirection(geo.normalize(diffVector))
//         return new Lugo.Order().setKick(new Lugo.Kick().setVelocity(newVelocity))
//     }
//     /**
//      *
//      * @param {Ball} ball
//      * @param {Point} target
//      * @returns {Order}
//      */
//     makeOrderKickMaxSpeed(ball: Lugo.Ball, target: Lugo.Point): Lugo.Order {
//         return this.makeOrderKick(ball, target, SPECS.BALL_MAX_SPEED)
//     }
//     /**
//      *
//      * @returns {!Order}
//      */
//     makeOrderCatch(): Lugo.Order {
//         return new Lugo.Order().setCatch(new Lugo.Catch())
//     }
// }
// export const awayGoal = new Goal(
//     Lugo.Team.Side.AWAY,
//     awayGoalCenter,
//     awayGoalTopPole,
//     awayGoalBottomPole
// )
// export const homeGoal = new Goal(
//     Lugo.Team.Side.HOME,
//     homeGoalCenter,
//     homeGoalTopPole,
//     homeGoalBottomPole
// )
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["FORWARD"] = 0] = "FORWARD";
    DIRECTION[DIRECTION["BACKWARD"] = 1] = "BACKWARD";
    DIRECTION[DIRECTION["LEFT"] = 2] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
    DIRECTION[DIRECTION["BACKWARD_LEFT"] = 4] = "BACKWARD_LEFT";
    DIRECTION[DIRECTION["BACKWARD_RIGHT"] = 5] = "BACKWARD_RIGHT";
    DIRECTION[DIRECTION["FORWARD_LEFT"] = 6] = "FORWARD_LEFT";
    DIRECTION[DIRECTION["FORWARD_RIGHT"] = 7] = "FORWARD_RIGHT";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
/**
 *
 * @param {GameSnapshotInspector}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
function defineState(snapshot, playerNumber, side) {
    if (!snapshot || !snapshot.getBall()) {
        throw new Error('invalid snapshot state - cannot define player state');
    }
    var me = snapshot.getPlayer(side, playerNumber);
    if (!me) {
        throw new Error('could not find the bot in the snapshot - cannot define player state');
    }
    var ballHolder = snapshot.getBall().getHolder();
    if (!ballHolder) {
        return stub_1.PLAYER_STATE.DISPUTING_THE_BALL;
    }
    else if (ballHolder.getTeamSide() === side) {
        if (ballHolder.getNumber() === playerNumber) {
            return stub_1.PLAYER_STATE.HOLDING_THE_BALL;
        }
        return stub_1.PLAYER_STATE.SUPPORTING;
    }
    return stub_1.PLAYER_STATE.DEFENDING;
}
exports.defineState = defineState;
