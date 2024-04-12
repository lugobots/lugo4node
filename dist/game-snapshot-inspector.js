"use strict";
exports.__esModule = true;
var _1 = require(".");
var Geo = require("./geo");
var Helpers = require("./helpers");
var ORIENTATION = require("./orentation");
var Lugo = require("./proto_exported");
var specs_1 = require("./specs");
var GameSnapshotInspector = /** @class */ (function () {
    function GameSnapshotInspector(botSide, playerNumber, gameSnapshot) {
        this.mySide = botSide;
        this.myNumber = playerNumber;
        this.snapshot = gameSnapshot;
        this.me = this.getPlayer(botSide, playerNumber);
        if (!this.me) {
            throw new Error("Could not find the player ".concat(botSide, "-").concat(playerNumber));
        }
    }
    GameSnapshotInspector.prototype.getSnapshot = function () {
        return this.snapshot;
    };
    GameSnapshotInspector.prototype.getTurn = function () {
        return this.snapshot.getTurn();
    };
    GameSnapshotInspector.prototype.getMe = function () {
        return this.me;
    };
    GameSnapshotInspector.prototype.getBall = function () {
        var _a, _b;
        return (_b = (_a = this.snapshot) === null || _a === void 0 ? void 0 : _a.getBall()) !== null && _b !== void 0 ? _b : null;
    };
    GameSnapshotInspector.prototype.getPlayer = function (side, number) {
        return Helpers.getPlayer(this.snapshot, side, number);
    };
    GameSnapshotInspector.prototype.getBallHolder = function () {
        return Helpers.getBallHolder(this.snapshot);
    };
    GameSnapshotInspector.prototype.isBallHolder = function (player) {
        return Helpers.isBallHolder(this.snapshot, player);
    };
    GameSnapshotInspector.prototype.getTeam = function (side) {
        return Helpers.getTeam(this.snapshot, side);
    };
    GameSnapshotInspector.prototype.getMyTeam = function () {
        return this.getTeam(this.mySide);
    };
    GameSnapshotInspector.prototype.getOpponentTeam = function () {
        return this.getTeam(this.getOpponentSide());
    };
    GameSnapshotInspector.prototype.getMyTeamSide = function () {
        return this.mySide;
    };
    GameSnapshotInspector.prototype.getOpponentSide = function () {
        return Helpers.getOpponentSide(this.mySide);
    };
    GameSnapshotInspector.prototype.getMyTeamPlayers = function () {
        var myTeam = this.getMyTeam();
        return myTeam ? myTeam.getPlayersList() : [];
    };
    GameSnapshotInspector.prototype.getOpponentPlayers = function () {
        var opponentTeam = this.getOpponentTeam();
        return opponentTeam ? opponentTeam.getPlayersList() : [];
    };
    GameSnapshotInspector.prototype.getMyTeamGoalkeeper = function () {
        return this.getPlayer(this.getMyTeamSide(), specs_1.SPECS.GOALKEEPER_NUMBER);
    };
    GameSnapshotInspector.prototype.getOpponentGoalkeeper = function () {
        return this.getPlayer(this.getOpponentSide(), specs_1.SPECS.GOALKEEPER_NUMBER);
    };
    GameSnapshotInspector.prototype.makeOrderMove = function (target, speed) {
        var _a, _b;
        return this.makeOrderMoveFromPoint((_b = (_a = this.me) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : Geo.newZeroedPoint(), target, speed);
    };
    GameSnapshotInspector.prototype.makeOrderMoveMaxSpeed = function (target) {
        var _a, _b;
        return this.makeOrderMoveFromPoint((_b = (_a = this.me) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : Geo.newZeroedPoint(), target, specs_1.SPECS.PLAYER_MAX_SPEED);
    };
    GameSnapshotInspector.prototype.makeOrderMoveFromPoint = function (origin, target, speed) {
        var vec = ORIENTATION.NORTH;
        if (Math.abs((0, _1.distanceBetweenPoints)(origin, target)) > 0) {
            vec = Geo.NewVector(origin, target);
        }
        var vel = Geo.NewZeroedVelocity(Geo.normalize(vec));
        vel.setSpeed(speed);
        var moveOrder = new Lugo.Move();
        moveOrder.setVelocity(vel);
        return new Lugo.Order().setMove(moveOrder);
    };
    GameSnapshotInspector.prototype.makeOrderMoveFromVector = function (direction, speed) {
        var _a, _b;
        var origin = (_b = (_a = this.me) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : Geo.newZeroedPoint();
        var targetPoint = Geo.TargetFrom(direction, origin);
        return this.makeOrderMoveFromPoint(origin, targetPoint, speed);
    };
    GameSnapshotInspector.prototype.makeOrderMoveByDirection = function (direction, speed) {
        var directionTarget = this.getOrientationByDirection(direction);
        return this.makeOrderMoveFromVector(directionTarget, speed !== null && speed !== void 0 ? speed : specs_1.SPECS.PLAYER_MAX_SPEED);
    };
    GameSnapshotInspector.prototype.makeOrderMoveToStop = function () {
        var _a, _b, _c;
        var myDirection = (_c = (_b = (_a = this.getMe()) === null || _a === void 0 ? void 0 : _a.getVelocity()) === null || _b === void 0 ? void 0 : _b.getDirection()) !== null && _c !== void 0 ? _c : this.getOrientationByDirection(_1.DIRECTION.FORWARD);
        return this.makeOrderMoveFromVector(myDirection, 0);
    };
    GameSnapshotInspector.prototype.makeOrderJump = function (target, speed) {
        var _a, _b;
        var vec = Geo.NewVector((_b = (_a = this.me) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : Geo.newZeroedPoint(), target);
        var vel = Geo.NewZeroedVelocity(Geo.normalize(vec));
        vel.setSpeed(speed);
        var jump = new Lugo.Jump();
        jump.setVelocity(vel);
        return new Lugo.Order().setJump(jump);
    };
    GameSnapshotInspector.prototype.makeOrderKick = function (target, speed) {
        var _a, _b, _c, _d, _e, _f, _g;
        var ballExpectedDirection = Geo.NewVector((_c = (_b = (_a = this.snapshot) === null || _a === void 0 ? void 0 : _a.getBall()) === null || _b === void 0 ? void 0 : _b.getPosition()) !== null && _c !== void 0 ? _c : Geo.newZeroedPoint(), target);
        var diffVector = Geo.subVector(ballExpectedDirection, (_g = (_f = (_e = (_d = this.snapshot) === null || _d === void 0 ? void 0 : _d.getBall()) === null || _e === void 0 ? void 0 : _e.getVelocity()) === null || _f === void 0 ? void 0 : _f.getDirection()) !== null && _g !== void 0 ? _g : Geo.newZeroedPoint());
        var vel = Geo.NewZeroedVelocity(Geo.normalize(diffVector));
        vel.setSpeed(speed);
        var kick = new Lugo.Kick();
        kick.setVelocity(vel);
        return new Lugo.Order().setKick(kick);
    };
    GameSnapshotInspector.prototype.makeOrderKickMaxSpeed = function (target) {
        return this.makeOrderKick(target, specs_1.SPECS.BALL_MAX_SPEED);
    };
    GameSnapshotInspector.prototype.makeOrderCatch = function () {
        var catchOrder = new Lugo.Catch();
        return new Lugo.Order().setCatch(catchOrder);
    };
    GameSnapshotInspector.prototype.getOrientationByDirection = function (direction) {
        var directionTarget;
        switch (direction) {
            case _1.DIRECTION.FORWARD:
                directionTarget = ORIENTATION.EAST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.WEST;
                }
                break;
            case _1.DIRECTION.BACKWARD:
                directionTarget = ORIENTATION.WEST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.EAST;
                }
                break;
            case _1.DIRECTION.LEFT:
                directionTarget = ORIENTATION.NORTH;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH;
                }
                break;
            case _1.DIRECTION.RIGHT:
                directionTarget = ORIENTATION.SOUTH;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH;
                }
                break;
            case _1.DIRECTION.BACKWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_WEST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_EAST;
                }
                break;
            case _1.DIRECTION.BACKWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_WEST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_EAST;
                }
                break;
            case _1.DIRECTION.FORWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_EAST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_WEST;
                }
                break;
            case _1.DIRECTION.FORWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_EAST;
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_WEST;
                }
                break;
            default:
                throw new Error("unknown direction ".concat(direction));
        }
        return directionTarget;
    };
    return GameSnapshotInspector;
}());
exports["default"] = GameSnapshotInspector;
