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
    MyBot.prototype.makeReader = function (snapshot) {
        var reader = new lugo4node_1.GameSnapshotReader(snapshot, this.side);
        var me = reader.getPlayer(this.side, this.number);
        if (!me) {
            throw new Error("did not find myself in the game");
        }
        return { reader: reader, me: me };
    };
    MyBot.prototype.isNear = function (regionOrigin, destOrigin) {
        var maxDistance = 2;
        return Math.abs(regionOrigin.getRow() - destOrigin.getRow()) <= maxDistance &&
            Math.abs(regionOrigin.getCol() - destOrigin.getCol()) <= maxDistance;
    };
    MyBot.prototype.onDisputing = function (orderSet, snapshot) {
        try {
            // the Lugo.GameSnapshot helps us to read the game state
            var _a = this.makeReader(snapshot), reader = _a.reader, me = _a.me;
            var ballPosition = reader.getBall().getPosition();
            var ballRegion = this.mapper.getRegionFromPoint(ballPosition);
            var myRegion = this.mapper.getRegionFromPoint(me.getPosition());
            //by default, let's stay on our region
            var moveDestination = this.initPosition;
            // but if the ball is near to me, I will try to catch it
            if (this.isNear(ballRegion, myRegion)) {
                moveDestination = ballPosition;
            }
            var moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), moveDestination);
            // we can ALWAYS try to catch the ball
            var catchOrder = reader.makeOrderCatch();
            orderSet.setOrdersList([moveOrder, catchOrder]);
            return orderSet;
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.onDefending = function (orderSet, snapshot) {
        try {
            var _a = this.makeReader(snapshot), reader = _a.reader, me = _a.me;
            var ballPosition = snapshot.getBall().getPosition();
            var ballRegion = this.mapper.getRegionFromPoint(ballPosition);
            var myRegion = this.mapper.getRegionFromPoint(this.initPosition);
            var moveDest = this.initPosition;
            if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
                Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
                moveDest = ballPosition;
            }
            var moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), moveDest);
            var catchOrder = reader.makeOrderCatch();
            var orderSet_1 = new lugo4node_1.Lugo.OrderSet();
            orderSet_1.setTurn(snapshot.getTurn());
            orderSet_1.setDebugMessage("trying to catch the ball");
            orderSet_1.setOrdersList([moveOrder, catchOrder]);
            return orderSet_1;
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.onHolding = function (orderSet, snapshot) {
        try {
            var _a = this.makeReader(snapshot), reader = _a.reader, me = _a.me;
            var myGoalCenter = this.mapper.getRegionFromPoint(reader.getOpponentGoal().getCenter());
            var currentRegion = this.mapper.getRegionFromPoint(me.getPosition());
            var myOrder = void 0;
            if (Math.abs(currentRegion.getRow() - myGoalCenter.getRow()) <= 1 &&
                Math.abs(currentRegion.getCol() - myGoalCenter.getCol()) <= 1) {
                myOrder = reader.makeOrderKickMaxSpeed(snapshot.getBall(), reader.getOpponentGoal().getCenter());
            }
            else {
                myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), reader.getOpponentGoal().getCenter());
            }
            var orderSet_2 = new lugo4node_1.Lugo.OrderSet();
            orderSet_2.setTurn(snapshot.getTurn());
            orderSet_2.setDebugMessage("attack!");
            orderSet_2.setOrdersList([myOrder]);
            return orderSet_2;
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.onSupporting = function (orderSet, snapshot) {
        try {
            var _a = this.makeReader(snapshot), reader = _a.reader, me = _a.me;
            var ballHolderPosition = snapshot.getBall().getPosition();
            var myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), ballHolderPosition);
            var orderSet_3 = new lugo4node_1.Lugo.OrderSet();
            orderSet_3.setTurn(snapshot.getTurn());
            orderSet_3.setDebugMessage("supporting");
            orderSet_3.setOrdersList([myOrder]);
            return orderSet_3;
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.asGoalkeeper = function (orderSet, snapshot, state) {
        try {
            var _a = this.makeReader(snapshot), reader = _a.reader, me = _a.me;
            var position = snapshot.getBall().getPosition();
            if (state !== lugo4node_1.PLAYER_STATE.DISPUTING_THE_BALL) {
                position = reader.getMyGoal().getCenter();
            }
            var myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), position);
            var orderSet_4 = new lugo4node_1.Lugo.OrderSet();
            orderSet_4.setTurn(snapshot.getTurn());
            orderSet_4.setDebugMessage("supporting");
            orderSet_4.setOrdersList([myOrder, reader.makeOrderCatch()]);
            return orderSet_4;
        }
        catch (e) {
            console.log("did not play this turn", e);
        }
    };
    MyBot.prototype.gettingReady = function (snapshot) {
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
