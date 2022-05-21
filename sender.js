'use strict';


class TurnOrdersSender {

    /**
     * @type {proto.lugo.OrderSet}
     */
    #orderSet;

    constructor(turn, client) {
        this.#orderSet = new proto.lugo.OrderSet()
        this.#orderSet.setTurn(turn)

    }
    /**
     *
     * @param {proto.lugo.Order}orders
     */
    addOrder(...orders) {
        this.#orderSet.setOrdersList(orders)
    }

    /**
     *
     * @param {string} message
     * @returns {TurnOrdersSender}
     */
    setDebugMessage(message) {
        this.#orderSet.setDebugMessage(message)
        return this
    }

    send() {

    }
}


module.exports = {TurnOrdersSender}