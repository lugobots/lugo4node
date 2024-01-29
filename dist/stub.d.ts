import GameSnapshotInspector from './game-snapshot-inspector.js';
import { Order } from './pb/server_pb.js';
export declare enum PLAYER_STATE {
    SUPPORTING = "supporting",
    HOLDING_THE_BALL = "holding",
    DEFENDING = "defending",
    DISPUTING_THE_BALL = "disputing"
}
export interface Bot {
    /**
     * OnDisputing is called when no one has the ball possession
     *
     * @param {GameSnapshotInspector} inspector
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onDisputing: (inspector: GameSnapshotInspector) => Order[] | {
        orders: Order[];
        debug_message: string;
    } | null;
    /**
     * OnDefending is called when an opponent player has the ball possession
     *
     * @param {GameSnapshotInspector} inspector
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onDefending: (inspector: GameSnapshotInspector) => Order[] | {
        orders: Order[];
        debug_message: string;
    } | null;
    /**
     * OnHolding is called when this bot has the ball possession
     *
     * @param {GameSnapshotInspector} inspector
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onHolding: (inspector: GameSnapshotInspector) => Order[] | {
        orders: Order[];
        debug_message: string;
    } | null;
    /**
     * OnSupporting is called when a teammate player has the ball possession
     *
     * @param {GameSnapshotInspector} inspector
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    onSupporting: (inspector: GameSnapshotInspector) => Order[] | {
        orders: Order[];
        debug_message: string;
    } | null;
    /**
     * AsGoalkeeper is only called when this bot is the goalkeeper (number 1). This method is called on every turn,
     * and the player state is passed at the last parameter.
     * @param {GameSnapshotInspector} inspector
     * @param {PLAYER_STATE} state
     * @returns {Order[] | { orders: Order[], debug_message: string } | null}
     */
    asGoalkeeper: (inspector: GameSnapshotInspector, state: PLAYER_STATE) => Order[] | {
        orders: Order[];
        debug_message: string;
    } | null;
    /**
     * gettingReady is called when the game is on Getting Ready state.
     *
     * @param {GameSnapshotInspector} inspector
     */
    gettingReady: (inspector: GameSnapshotInspector) => void;
}
