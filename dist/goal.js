"use strict";
exports.__esModule = true;
exports.HOME_GOAL = exports.AWAY_GOAL = exports.Goal = void 0;
var physics_pb_1 = require("./pb/physics_pb");
var server_pb_1 = require("./pb/server_pb");
var specs_1 = require("./specs");
var homeGoalCenter = new physics_pb_1.Point();
homeGoalCenter.setX(0);
homeGoalCenter.setY(specs_1.SPECS.MAX_Y_COORDINATE / 2);
var homeGoalTopPole = new physics_pb_1.Point();
homeGoalTopPole.setX(0);
homeGoalTopPole.setY(specs_1.SPECS.GOAL_MAX_Y);
var homeGoalBottomPole = new physics_pb_1.Point();
homeGoalBottomPole.setX(0);
homeGoalBottomPole.setY(specs_1.SPECS.GOAL_MIN_Y);
var awayGoalCenter = new physics_pb_1.Point();
awayGoalCenter.setX(specs_1.SPECS.MAX_X_COORDINATE);
awayGoalCenter.setY(specs_1.SPECS.MAX_Y_COORDINATE / 2);
var awayGoalTopPole = new physics_pb_1.Point();
awayGoalTopPole.setX(specs_1.SPECS.MAX_X_COORDINATE);
awayGoalTopPole.setY(specs_1.SPECS.GOAL_MAX_Y);
var awayGoalBottomPole = new physics_pb_1.Point();
awayGoalBottomPole.setX(specs_1.SPECS.MAX_X_COORDINATE);
awayGoalBottomPole.setY(specs_1.SPECS.GOAL_MIN_Y);
var Goal = /** @class */ (function () {
    /**
     *
     * @param place
     * @param center
     * @param topPole
     * @param bottomPole
     */
    function Goal(place, center, topPole, bottomPole) {
        this._center = center;
        this._place = place;
        this._topPole = topPole;
        this._bottomPole = bottomPole;
    }
    Goal.prototype.getCenter = function () {
        return this._center;
    };
    Goal.prototype.getPlace = function () {
        return this._place;
    };
    Goal.prototype.getTopPole = function () {
        return this._topPole;
    };
    Goal.prototype.getBottomPole = function () {
        return this._bottomPole;
    };
    return Goal;
}());
exports.Goal = Goal;
exports.AWAY_GOAL = new Goal(server_pb_1.Team.Side.AWAY, awayGoalCenter, awayGoalTopPole, awayGoalBottomPole);
exports.HOME_GOAL = new Goal(server_pb_1.Team.Side.HOME, homeGoalCenter, homeGoalTopPole, homeGoalBottomPole);
