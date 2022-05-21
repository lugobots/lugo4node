`use strict`;
const {BotStub, PLAYER_STATE} = require('../stub')
const {GameSnapshotReader} = require('../helpers')

class Bot extends BotStub {
    /**
     * @type {proto.lugo.Team.Side}
     */
    #side;

    /**
     * @type {number}
     */
    #number;

    /**
     * @type {proto.lugo.Point}
     */
    #initPosition;

    /**
     *
     * @param {proto.lugo.Team.Side} side
     * @param {number} number
     * @param {proto.lugo.Point} initPosition
     */
    constructor(side, number, initPosition) {
        super();
        this.#side = side
        this.#number = number
    }

    /**
     *
     * @param {proto.lugo.GameSnapshot} snapshot
     * @private
     */
    _makeReader(snapshot) {
        const reader = new GameSnapshotReader(snapshot, this.#side)
        const me = reader.getPlayer(this.#side, this.#number)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        return {reader, me}
    }

    onDisputing(orderSet, snapshot) {
        try {
            const {reader, me} = this._makeReader(snapshot)
            const ballPosition = snapshot.getBall().getPosition()
            const moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), ballPosition)
            // const catchOrder = reader.
            const orderSet = new proto.lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("mi mi mi")
            orderSet.setOrdersList([moveOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onDefending(orderSet, snapshot) {
        try {
            const {reader, me} = this._makeReader(snapshot)

            const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), this.#initPosition)

            const orderSet = new proto.lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("mi mi mi")
            orderSet.setOrdersList([myOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onHolding(orderSet, snapshot) {
        try {
            const {reader, me} = this._makeReader(snapshot)

            const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), reader.getMyGoal().center)

            const orderSet = new proto.lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("mi mi mi")
            orderSet.setOrdersList([myOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onSupporting(orderSet, snapshot) {
        try {
            const {reader, me} = this._makeReader(snapshot)
            const ballHolderPosition = snapshot.getBall().getPosition()
            const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), ballHolderPosition)

            const orderSet = new proto.lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("supporting")
            orderSet.setOrdersList([myOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    asGoalkeeper(orderSet, snapshot, state) {
        try {
            const {reader, me} = this._makeReader(snapshot)
            let position = snapshot.getBall().getPosition()
            if (state !== PLAYER_STATE.DISPUTING_THE_BALL) {
                position = reader.getMyGoal().center
            }

            const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), position)

            const orderSet = new proto.lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("supporting")
            orderSet.setOrdersList([myOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

}

module.exports = Bot