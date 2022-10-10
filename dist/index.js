"use strict";
exports.__esModule = true;
exports.defineState = exports.DIRECTION = exports.homeGoal = exports.awayGoal = exports.GameSnapshotReader = exports.geo = exports.Lugo = exports.PLAYER_STATE = exports.SPECS = exports.ORIENTATION = exports.Region = exports.Mapper = exports.Goal = exports.EnvVarLoader = exports.NewClientFromConfig = exports.Client = void 0;
var client_js_1 = require("./client.js");
exports.Client = client_js_1.Client;
exports.NewClientFromConfig = client_js_1.NewClientFromConfig;
var configurator_js_1 = require("./configurator.js");
exports.EnvVarLoader = configurator_js_1.EnvVarLoader;
var goal_js_1 = require("./goal.js");
exports.Goal = goal_js_1.Goal;
var mapper_js_1 = require("./mapper.js");
exports.Mapper = mapper_js_1.Mapper;
exports.Region = mapper_js_1.Region;
var ORIENTATION = require("./orentation.js");
exports.ORIENTATION = ORIENTATION;
var Lugo = require("./proto_exported.js");
exports.Lugo = Lugo;
var specs_js_1 = require("./specs.js");
exports.SPECS = specs_js_1.SPECS;
var stub_js_1 = require("./stub.js");
exports.PLAYER_STATE = stub_js_1.PLAYER_STATE;
var geo = require("./geo.js");
exports.geo = geo;
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
var GameSnapshotReader = /** @class */ (function () {
    function GameSnapshotReader(snapshot, mySide) {
        this.snapshot = snapshot;
        this.mySide = mySide;
    }
    /**
     *
     * @returns {Team}
     */
    GameSnapshotReader.prototype.getMyTeam = function () {
        return this.getTeam(this.mySide);
    };
    /**
     * Returns the opponent team
     * @returns {Lugo.Team}
     */
    GameSnapshotReader.prototype.getOpponentTeam = function () {
        return this.getTeam(this.getOpponentSide());
    };
    /**
     * @param { Lugo.Team.Side} side
     * @returns {Team}
     */
    GameSnapshotReader.prototype.getTeam = function (side) {
        if (side === Lugo.Side.HOME) {
            return this.snapshot.getHomeTeam();
        }
        return this.snapshot.getAwayTeam();
    };
    /**
     *
     * @param { Player} player
     * @returns {boolean}
     */
    GameSnapshotReader.prototype.isBallHolder = function (player) {
        var ball = this.snapshot.getBall();
        return ball.getHolder() != null && ball.getHolder().getTeamSide() === player.getTeamSide() && ball.getHolder().getNumber() === player.getNumber();
    };
    /**
     *
     * @returns {Lugo.Team.Side}
     */
    GameSnapshotReader.prototype.getOpponentSide = function () {
        if (this.mySide === Lugo.Team.Side.HOME) {
            return Lugo.Team.Side.AWAY;
        }
        return Lugo.Team.Side.HOME;
    };
    /**
     *
     * @returns {Goal}
     */
    GameSnapshotReader.prototype.getMyGoal = function () {
        if (this.mySide === Lugo.Team.Side.HOME) {
            return exports.homeGoal;
        }
        return exports.awayGoal;
    };
    /**
     *
     * @returns {Lugo.Ball}
     */
    GameSnapshotReader.prototype.getBall = function () {
        return this.snapshot.getBall();
    };
    /**
     *
     * @returns {Goal}
     */
    GameSnapshotReader.prototype.getOpponentGoal = function () {
        if (this.mySide === Lugo.Team.Side.HOME) {
            return exports.awayGoal;
        }
        return exports.homeGoal;
    };
    /**
     *
     * @param {.Lugo.Team.Side} side
     * @param {number} number
     * @returns {.Player}
     */
    GameSnapshotReader.prototype.getPlayer = function (side, number) {
        var team = this.getTeam(side);
        if (team == null) {
            return null;
        }
        for (var _i = 0, _a = team.getPlayersList(); _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.getNumber() === number) {
                return player;
            }
        }
        return null;
    };
    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @return {Order}
     */
    GameSnapshotReader.prototype.makeOrderMoveMaxSpeed = function (origin, target) {
        return this.makeOrderMove(origin, target, specs_js_1.SPECS.PLAYER_MAX_SPEED);
    };
    /**
     *
     * @param {Point} origin
     * @param {Point} target
     * @param speed
     * @returns {Order}
     */
    GameSnapshotReader.prototype.makeOrderMove = function (origin, target, speed) {
        if (origin.getX() === target.getX() && origin.getY() === target.getY()) {
            // a vector cannot have zeroed direction. In this case, the player will just be stopped
            return this._makeOrderMoveFromVector(ORIENTATION.NORTH, 0);
        }
        var direction = geo.NewVector(origin, target);
        direction = geo.normalize(direction);
        return this._makeOrderMoveFromVector(direction, speed);
    };
    /**
     *
     * @param {Vector} direction
     * @param {number} speed
     * @returns {Order}
     * @private
     */
    GameSnapshotReader.prototype._makeOrderMoveFromVector = function (direction, speed) {
        var velocity = new Lugo.Velocity();
        velocity.setDirection(direction);
        velocity.setSpeed(speed);
        var moveOrder = new Lugo.Move();
        moveOrder.setVelocity(velocity);
        return new Lugo.Order().setMove(moveOrder);
    };
    GameSnapshotReader.prototype.makeOrderMoveByDirection = function (direction) {
        var directionTarget;
        switch (direction) {
            case DIRECTION.FORWARD:
                directionTarget = ORIENTATION.EAST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.WEST;
                }
                break;
            case DIRECTION.BACKWARD:
                directionTarget = ORIENTATION.WEST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.EAST;
                }
                break;
            case DIRECTION.LEFT:
                directionTarget = ORIENTATION.NORTH;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH;
                }
                break;
            case DIRECTION.RIGHT:
                directionTarget = ORIENTATION.SOUTH;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH;
                }
                break;
            case DIRECTION.BACKWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_WEST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_EAST;
                }
                break;
            case DIRECTION.BACKWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_WEST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_EAST;
                }
                break;
            case DIRECTION.FORWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_EAST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_WEST;
                }
                break;
            case DIRECTION.FORWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_EAST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_WEST;
                }
                break;
            default:
                throw new Error("unknown direction ".concat(direction));
        }
        return this._makeOrderMoveFromVector(directionTarget, specs_js_1.SPECS.PLAYER_MAX_SPEED);
    };
    GameSnapshotReader.prototype.makeOrderJump = function (origin, target, speed) {
        var direction = ORIENTATION.EAST;
        if (origin.getX() !== target.getX() || origin.getY() !== target.getY()) {
            // a vector cannot have zeroed direction. In this case, the player will just be stopped
            direction = geo.NewVector(origin, target);
            direction = geo.normalize(direction);
        }
        var velocity = new Lugo.Velocity();
        velocity.setDirection(direction);
        velocity.setSpeed(speed);
        var jump = new Lugo.Jump();
        jump.setVelocity(velocity);
        return new Lugo.Order().setJump(jump);
    };
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @param {number} speed
     * @returns {Order}
     */
    GameSnapshotReader.prototype.makeOrderKick = function (ball, target, speed) {
        var ballExpectedDirection = geo.NewVector(ball.getPosition(), target);
        // the ball velocity is summed to the kick velocity, so we have to consider the current ball direction
        var diffVector = geo.subVector(ballExpectedDirection, ball.getVelocity().getDirection());
        var newVelocity = new Lugo.Velocity();
        newVelocity.setSpeed(speed);
        newVelocity.setDirection(geo.normalize(diffVector));
        return new Lugo.Order().setKick(new Lugo.Kick().setVelocity(newVelocity));
    };
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @returns {Order}
     */
    GameSnapshotReader.prototype.makeOrderKickMaxSpeed = function (ball, target) {
        return this.makeOrderKick(ball, target, specs_js_1.SPECS.BALL_MAX_SPEED);
    };
    /**
     *
     * @returns {!Order}
     */
    GameSnapshotReader.prototype.makeOrderCatch = function () {
        return new Lugo.Order().setCatch(new Lugo.Catch());
    };
    return GameSnapshotReader;
}());
exports.GameSnapshotReader = GameSnapshotReader;
exports.awayGoal = new goal_js_1.Goal(Lugo.Team.Side.AWAY, awayGoalCenter, awayGoalTopPole, awayGoalBottomPole);
exports.homeGoal = new goal_js_1.Goal(Lugo.Team.Side.HOME, homeGoalCenter, homeGoalTopPole, homeGoalBottomPole);
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
 * @param {GameSnapshot}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
function defineState(snapshot, playerNumber, side) {
    if (!snapshot || !snapshot.getBall()) {
        throw new Error('invalid snapshot state - cannot define player state');
    }
    var reader = new GameSnapshotReader(snapshot, side);
    var me = reader.getPlayer(side, playerNumber);
    if (!me) {
        throw new Error('could not find the bot in the snapshot - cannot define player state');
    }
    var ballHolder = snapshot.getBall().getHolder();
    if (!ballHolder) {
        return stub_js_1.PLAYER_STATE.DISPUTING_THE_BALL;
    }
    else if (ballHolder.getTeamSide() === side) {
        if (ballHolder.getNumber() === playerNumber) {
            return stub_js_1.PLAYER_STATE.HOLDING_THE_BALL;
        }
        return stub_js_1.PLAYER_STATE.SUPPORTING;
    }
    return stub_js_1.PLAYER_STATE.DEFENDING;
}
exports.defineState = defineState;
