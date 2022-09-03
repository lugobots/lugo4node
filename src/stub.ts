import {GameSnapshot, OrderSet} from './pb/server_pb.js'

export enum PLAYER_STATE {
    SUPPORTING = "supporting",
    HOLDING_THE_BALL = "holding",
    DEFENDING = "defending",
    DISPUTING_THE_BALL = "disputing",
}

export interface Bot {

    /**
     * OnDisputing is called when no one has the ball possession
     *
     * @param {OrderSet} orderSet
     * @param {GameSnapshot} snapshot
     * @returns {OrderSet | null}
     */
    onDisputing: (orderSet: OrderSet, snapshot: GameSnapshot) => OrderSet | null

    /**
     * OnDefending is called when an opponent player has the ball possession
     *
     * @param {OrderSet} orderSet
     * @param {GameSnapshot} snapshot
     * @returns {OrderSet | null}
     */
    onDefending: (orderSet: OrderSet, snapshot: GameSnapshot) => OrderSet | null

    /**
     * OnHolding is called when this bot has the ball possession
     *
     * @param {OrderSet} orderSet
     * @param {GameSnapshot} snapshot
     * @returns {OrderSet | null}
     */
    onHolding: (orderSet: OrderSet, snapshot: GameSnapshot) => OrderSet | null


    /**
     * OnSupporting is called when a teammate player has the ball possession
     *
     * @param {OrderSet} orderSet
     * @param {GameSnapshot} snapshot
     * @returns {OrderSet | null}
     */
    onSupporting: (orderSet: OrderSet, snapshot: GameSnapshot) => OrderSet | null

    /**
     * AsGoalkeeper is only called when this bot is the goalkeeper (number 1). This method is called on every turn,
     * and the player state is passed at the last parameter.
     * @param {OrderSet} orderSet
     * @param {GameSnapshot} snapshot
     * @param {PLAYER_STATE} state
     * @returns {OrderSet | null}
     */
    asGoalkeeper: (orderSet: OrderSet, snapshot: GameSnapshot, state: PLAYER_STATE) => OrderSet | null

    /**
     * gettingReady is called when the game is on Getting Ready state.
     *
     * @param snapshot
     */
    gettingReady: (snapshot: GameSnapshot) => void
}



