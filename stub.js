'use strict';

const {GameSnapshotReader} = require("./snapshot_reader");
const PLAYER_STATE = {
    SUPPORTING: "supporting",
    HOLDING_THE_BALL: "holding",
    DEFENDING: "defending",
    DISPUTING_THE_BALL: "disputing",
}

class BotStub {

    constructor() {}
    /**
     * OnDisputing is called when no one has the ball possession
     *
     * @param {proto.lugo.OrderSet} orderSet
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {?proto.lugo.OrderSet}
     */
    onDisputing(orderSet, snapshot) {
        console.log(`Method OnDisputing is not implemented`)
    }
    /**
     * OnDefending is called when an opponent player has the ball possession
     *
     * @param {proto.lugo.OrderSet} orderSet
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {?proto.lugo.OrderSet}
     */
    onDefending(orderSet, snapshot) {
        console.log(`Method OnDefending is not implemented`)
    }
    /**
     * OnHolding is called when this bot has the ball possession
     *
     * @param {proto.lugo.OrderSet} orderSet
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {?proto.lugo.OrderSet}
     */
    onHolding(orderSet, snapshot) {
        console.log(`Method OnHolding is not implemented`)
    }
    /**
     * OnSupporting is called when a teammate player has the ball possession
     *
     * @param {proto.lugo.OrderSet} orderSet
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {?proto.lugo.OrderSet}
     */
    onSupporting(orderSet, snapshot) {
        console.log(`Method OnSupporting is not implemented`)
    }
    /**
     * AsGoalkeeper is only called when this bot is the goalkeeper (number 1). This method is called on every turn,
     * and the player state is passed at the last parameter.
     * @param {proto.lugo.OrderSet} orderSet
     * @param {proto.lugo.GameSnapshot} snapshot
     * @param {PLAYER_STATE} state
     * @returns {?proto.lugo.OrderSet}
     */
    asGoalkeeper(orderSet, snapshot, state) {
        console.log(`Method AsGoalkeeper is not implemented`)
    }

}

/**
 *
 * @param {proto.lugo.GameSnapshot}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
function defineState(snapshot, playerNumber, side) {
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


module.exports = {BotStub, PLAYER_STATE, defineState}
