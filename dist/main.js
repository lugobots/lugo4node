"use strict";
exports.__esModule = true;
exports.GameClient = exports.RemoteClient = exports.BroadcastClient = exports.NextTurnRequest = exports.PauseResumeRequest = exports.NextOrderRequest = exports.BallProperties = exports.PlayerProperties = exports.GameProperties = exports.CommandResponse = exports.EventDebugReleased = exports.EventDebugBreakpoint = exports.EventGameOver = exports.EventGoal = exports.EventStateChange = exports.EventLostPlayer = exports.EventNewPlayer = exports.TeamColor = exports.TeamColors = exports.TeamSettings = exports.GameSetup = exports.GameEvent = exports.StartRequest = exports.WatcherRequest = exports.OrderResponse = exports.ShotClock = exports.OrderSet = exports.JoinRequest = exports.Team = exports.Player = exports.Order = exports.Move = exports.Kick = exports.Jump = exports.GameSnapshot = exports.Catch = exports.Ball = exports.Velocity = exports.Vector = exports.Point = exports.PLAYER_STATE = exports.SPECS = exports.ORIENTATION = exports.Region = exports.Mapper = exports.Goal = exports.EnvVarLoader = exports.NewClientFromConfig = exports.Client = exports.vectors = void 0;
exports.defineState = exports.DIRECTION = exports.homeGoal = exports.awayGoal = exports.GameSnapshotReader = void 0;
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
var proto_exported_js_1 = require("./proto_exported.js");
exports.Ball = proto_exported_js_1.Ball;
exports.Catch = proto_exported_js_1.Catch;
exports.GameSnapshot = proto_exported_js_1.GameSnapshot;
exports.Jump = proto_exported_js_1.Jump;
exports.Kick = proto_exported_js_1.Kick;
exports.Move = proto_exported_js_1.Move;
exports.Order = proto_exported_js_1.Order;
exports.Player = proto_exported_js_1.Player;
exports.Team = proto_exported_js_1.Team;
exports.JoinRequest = proto_exported_js_1.JoinRequest;
exports.OrderSet = proto_exported_js_1.OrderSet;
exports.ShotClock = proto_exported_js_1.ShotClock;
exports.OrderResponse = proto_exported_js_1.OrderResponse;
exports.WatcherRequest = proto_exported_js_1.WatcherRequest;
exports.StartRequest = proto_exported_js_1.StartRequest;
exports.GameEvent = proto_exported_js_1.GameEvent;
exports.GameSetup = proto_exported_js_1.GameSetup;
exports.TeamSettings = proto_exported_js_1.TeamSettings;
exports.TeamColors = proto_exported_js_1.TeamColors;
exports.TeamColor = proto_exported_js_1.TeamColor;
exports.EventNewPlayer = proto_exported_js_1.EventNewPlayer;
exports.EventLostPlayer = proto_exported_js_1.EventLostPlayer;
exports.EventStateChange = proto_exported_js_1.EventStateChange;
exports.EventGoal = proto_exported_js_1.EventGoal;
exports.EventGameOver = proto_exported_js_1.EventGameOver;
exports.EventDebugBreakpoint = proto_exported_js_1.EventDebugBreakpoint;
exports.EventDebugReleased = proto_exported_js_1.EventDebugReleased;
exports.CommandResponse = proto_exported_js_1.CommandResponse;
exports.GameProperties = proto_exported_js_1.GameProperties;
exports.PlayerProperties = proto_exported_js_1.PlayerProperties;
exports.BallProperties = proto_exported_js_1.BallProperties;
exports.NextOrderRequest = proto_exported_js_1.NextOrderRequest;
exports.PauseResumeRequest = proto_exported_js_1.PauseResumeRequest;
exports.NextTurnRequest = proto_exported_js_1.NextTurnRequest;
exports.BroadcastClient = proto_exported_js_1.BroadcastClient;
exports.RemoteClient = proto_exported_js_1.RemoteClient;
exports.GameClient = proto_exported_js_1.GameClient;
var specs_js_1 = require("./specs.js");
exports.SPECS = specs_js_1.SPECS;
var stub_js_1 = require("./stub.js");
exports.PLAYER_STATE = stub_js_1.PLAYER_STATE;
var vector_js_1 = require("./vector.js");
// imports actually used in this file
var physics_pb_js_1 = require("./pb/physics_pb.js");
exports.Point = physics_pb_js_1.Point;
exports.Vector = physics_pb_js_1.Vector;
exports.Velocity = physics_pb_js_1.Velocity;
exports.vectors = { sub: vector_js_1.sub, NewVector: vector_js_1.NewVector, getScaledVector: vector_js_1.getScaledVector, normalize: vector_js_1.normalize, getLength: vector_js_1.getLength };
var homeGoalCenter = new physics_pb_js_1.Point();
homeGoalCenter.setX(0);
homeGoalCenter.setY(specs_js_1.SPECS.MAX_Y_COORDINATE / 2);
var homeGoalTopPole = new physics_pb_js_1.Point();
homeGoalTopPole.setX(0);
homeGoalTopPole.setY(specs_js_1.SPECS.GOAL_MAX_Y);
var homeGoalBottomPole = new physics_pb_js_1.Point();
homeGoalBottomPole.setX(0);
homeGoalBottomPole.setY(specs_js_1.SPECS.GOAL_MIN_Y);
var awayGoalCenter = new physics_pb_js_1.Point();
awayGoalCenter.setX(specs_js_1.SPECS.MAX_X_COORDINATE);
awayGoalCenter.setY(specs_js_1.SPECS.MAX_Y_COORDINATE / 2);
var awayGoalTopPole = new physics_pb_js_1.Point();
awayGoalTopPole.setX(specs_js_1.SPECS.MAX_X_COORDINATE);
awayGoalTopPole.setY(specs_js_1.SPECS.GOAL_MAX_Y);
var awayGoalBottomPole = new physics_pb_js_1.Point();
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
     * @param { Team.Side} side
     * @returns {Team}
     */
    GameSnapshotReader.prototype.getTeam = function (side) {
        if (side === proto_exported_js_1.Team.Side.HOME) {
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
     * @returns {Team.Side}
     */
    GameSnapshotReader.prototype.getOpponentSide = function () {
        if (this.mySide === proto_exported_js_1.Team.Side.HOME) {
            return proto_exported_js_1.Team.Side.AWAY;
        }
        return proto_exported_js_1.Team.Side.HOME;
    };
    /**
     *
     * @returns {Goal}
     */
    GameSnapshotReader.prototype.getMyGoal = function () {
        if (this.mySide === proto_exported_js_1.Team.Side.HOME) {
            return exports.homeGoal;
        }
        return exports.awayGoal;
    };
    /**
     *
     * @returns {Ball}
     */
    GameSnapshotReader.prototype.getBall = function () {
        return this.snapshot.getBall();
    };
    /**
     *
     * @returns {Goal}
     */
    GameSnapshotReader.prototype.getOpponentGoal = function () {
        if (this.mySide === proto_exported_js_1.Team.Side.HOME) {
            return exports.awayGoal;
        }
        return exports.homeGoal;
    };
    /**
     *
     * @param {.Team.Side} side
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
        var direction = (0, vector_js_1.NewVector)(origin, target);
        direction = (0, vector_js_1.normalize)(direction);
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
        var velocity = new physics_pb_js_1.Velocity();
        velocity.setDirection(direction);
        velocity.setSpeed(speed);
        var moveOrder = new proto_exported_js_1.Move();
        moveOrder.setVelocity(velocity);
        return new proto_exported_js_1.Order().setMove(moveOrder);
    };
    GameSnapshotReader.prototype.makeOrderMoveByDirection = function (direction) {
        var directionTarget;
        switch (direction) {
            case DIRECTION.FORWARD:
                directionTarget = ORIENTATION.EAST;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.WEST;
                }
                break;
            case DIRECTION.BACKWARD:
                directionTarget = ORIENTATION.WEST;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.EAST;
                }
                break;
            case DIRECTION.LEFT:
                directionTarget = ORIENTATION.NORTH;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH;
                }
                break;
            case DIRECTION.RIGHT:
                directionTarget = ORIENTATION.SOUTH;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH;
                }
                break;
            case DIRECTION.BACKWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_WEST;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_EAST;
                }
                break;
            case DIRECTION.BACKWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_WEST;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_EAST;
                }
                break;
            case DIRECTION.FORWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_EAST;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_WEST;
                }
                break;
            case DIRECTION.FORWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_EAST;
                if (this.mySide === proto_exported_js_1.Team.Side.AWAY) {
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
            direction = (0, vector_js_1.NewVector)(origin, target);
            direction = (0, vector_js_1.normalize)(direction);
        }
        var velocity = new physics_pb_js_1.Velocity();
        velocity.setDirection(direction);
        velocity.setSpeed(speed);
        var jump = new proto_exported_js_1.Jump();
        jump.setVelocity(velocity);
        return new proto_exported_js_1.Order().setJump(jump);
    };
    /**
     *
     * @param {Ball} ball
     * @param {Point} target
     * @param {number} speed
     * @returns {Order}
     */
    GameSnapshotReader.prototype.makeOrderKick = function (ball, target, speed) {
        var ballExpectedDirection = (0, vector_js_1.NewVector)(ball.getPosition(), target);
        // the ball velocity is summed to the kick velocity, so we have to consider the current ball direction
        var diffVector = (0, vector_js_1.sub)(ballExpectedDirection, ball.getVelocity().getDirection());
        var newVelocity = new physics_pb_js_1.Velocity();
        newVelocity.setSpeed(speed);
        newVelocity.setDirection((0, vector_js_1.normalize)(diffVector));
        return new proto_exported_js_1.Order().setKick(new proto_exported_js_1.Kick().setVelocity(newVelocity));
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
        return new proto_exported_js_1.Order().setCatch(new proto_exported_js_1.Catch());
    };
    return GameSnapshotReader;
}());
exports.GameSnapshotReader = GameSnapshotReader;
exports.awayGoal = new goal_js_1.Goal(proto_exported_js_1.Team.Side.AWAY, awayGoalCenter, awayGoalTopPole, awayGoalBottomPole);
exports.homeGoal = new goal_js_1.Goal(proto_exported_js_1.Team.Side.HOME, homeGoalCenter, homeGoalTopPole, homeGoalBottomPole);
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
