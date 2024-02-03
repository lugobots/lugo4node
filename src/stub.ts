import GameSnapshotInspector from './game-snapshot-inspector.js'
import { Order } from './pb/server_pb.js'

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
     * @param {GameSnapshotInspector} snapshot
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onDisputing: (snapshot: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string } | null

    /**
     * OnDefending is called when an opponent player has the ball possession
     *
     * @param {GameSnapshotInspector} snapshot
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onDefending: (snapshot: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string } | null

    /**
     * OnHolding is called when this bot has the ball possession
     *
     * @param {GameSnapshotInspector} snapshot
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onHolding: (snapshot: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string } | null


    /**
     * OnSupporting is called when a teammate player has the ball possession
     *
     * @param {GameSnapshotInspector} snapshot
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onSupporting: (snapshot: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string } | null

    /**
     * AsGoalkeeper is only called when this bot is the goalkeeper (number 1). This method is called on every turn,
     * and the player state is passed at the last parameter.
     * @param {GameSnapshotInspector} snapshot
     * @param {PLAYER_STATE} state
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    asGoalkeeper: (snapshot: GameSnapshotInspector, state: PLAYER_STATE) => Order[] | { orders: Order[], debug_message: string } | null

    /**
     * gettingReady is called when the game is on Getting Ready state.
     *
     * @param snapshot
     */
    gettingReady: (snapshot: GameSnapshotInspector) => void
}



