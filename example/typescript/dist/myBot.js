"use strict";
exports.__esModule = true;
exports.PLAYER_POSITIONS = exports.MyBot = void 0;
var lugo4node_1 = require("@lugobots/lugo4node");
var MyBot = /** @class */ (function () {
    /**
     *
     * @param {Lugo.Side} side
     * @param number
     * @param initPosition
     * @param mapper
     */
    function MyBot(side, number, initPosition, mapper) {
        this.number = number;
        this.mapper = mapper;
        this.initPosition = initPosition;
        mapper.getRegionFromPoint(initPosition);
    }
    MyBot.prototype.isNear = function (regionOrigin, destOrigin) {
        var maxDistance = 2;
        return Math.abs(regionOrigin.getRow() - destOrigin.getRow()) <= maxDistance &&
            Math.abs(regionOrigin.getCol() - destOrigin.getCol()) <= maxDistance;
    };
    MyBot.prototype.onDisputing = function (inspector) {
        try {
            // the Lugo.GameSnapshot helps us to read the game state
            var orders = [];
            var me = inspector.getMe();
            var ballPosition = inspector.getBall().getPosition();
            var ballRegion = this.mapper.getRegionFromPoint(ballPosition);
            var myRegion = this.mapper.getRegionFromPoint(me.getPosition());
            // but if the ball is near to me, I will try to catch it
            if (this.isNear(ballRegion, myRegion)) {
                orders.push(inspector.makeOrderMoveMaxSpeed(ballPosition));
            }
            orders.push(inspector.makeOrderCatch());
            return orders;
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.onDefending = function (inspector) {
        try {
            var me = inspector.getMe();
            var ballPosition = inspector.getBall().getPosition();
            var ballRegion = this.mapper.getRegionFromPoint(ballPosition);
            var myRegion = this.mapper.getRegionFromPoint(this.initPosition);
            var moveDest = this.initPosition;
            if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
                Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
                moveDest = ballPosition;
            }
            var moveOrder = inspector.makeOrderMoveMaxSpeed(moveDest);
            var catchOrder = inspector.makeOrderCatch();
            return { orders: [moveOrder, catchOrder], debug_message: "trying to catch the ball" };
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.onHolding = function (inspector) {
        try {
            var me = inspector.getMe();
            var myGoalCenter = this.mapper.getRegionFromPoint(this.mapper.getAttackGoal().getCenter());
            var currentRegion = this.mapper.getRegionFromPoint(me.getPosition());
            var myOrder = void 0;
            if (Math.abs(currentRegion.getRow() - myGoalCenter.getRow()) <= 1 &&
                Math.abs(currentRegion.getCol() - myGoalCenter.getCol()) <= 1) {
                myOrder = inspector.makeOrderKickMaxSpeed(this.mapper.getAttackGoal().getCenter());
            }
            else {
                myOrder = inspector.makeOrderMoveMaxSpeed(this.mapper.getAttackGoal().getCenter());
            }
            return { orders: [myOrder], debug_message: "attack!" };
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.onSupporting = function (inspector) {
        try {
            var me = inspector.getMe();
            var ballHolderPosition = inspector.getBall().getPosition();
            var myOrder = inspector.makeOrderMoveMaxSpeed(ballHolderPosition);
            return { orders: [myOrder], debug_message: "supporting" };
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.asGoalkeeper = function (inspector, state) {
        try {
            var me = inspector.getMe();
            var position = inspector.getBall().getPosition();
            if (state !== lugo4node_1.PLAYER_STATE.DISPUTING_THE_BALL) {
                position = this.mapper.getDefenseGoal().getCenter();
            }
            var myOrder = inspector.makeOrderMoveMaxSpeed(position);
            return { orders: [myOrder, inspector.makeOrderCatch()], debug_message: "supporting" };
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.gettingReady = function (inspector) {
    };
    ;
    return MyBot;
}());
exports.MyBot = MyBot;
exports.PLAYER_POSITIONS = {
    1: { Col: 0, Row: 0 },
    2: { Col: 1, Row: 1 },
    3: { Col: 2, Row: 2 },
    4: { Col: 2, Row: 3 },
    5: { Col: 1, Row: 4 },
    6: { Col: 3, Row: 1 },
    7: { Col: 3, Row: 2 },
    8: { Col: 3, Row: 3 },
    9: { Col: 3, Row: 4 },
    10: { Col: 4, Row: 3 },
    11: { Col: 4, Row: 2 }
};
