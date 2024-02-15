export interface Bot {

    /**
    * OnDisputing is called when no one has the ball possession
    */
    onDisputing: (inspector: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string }

    /**
    * OnDefending is called when an opponent player has the ball possession
    */
    onDefending: (inspector: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string }

    /**
    * OnHolding is called when this bot has the ball possession
    */
    onHolding: (inspector: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string }


    /**
    * OnSupporting is called when a teammate player has the ball possession
    */
    onSupporting: (inspector: GameSnapshotInspector) => Order[] | { orders: Order[], debug_message: string }

    /**
    * AsGoalkeeper is only called when this bot is the goalkeeper (number 1). This method is called on every turn,
    * and the player state is passed at the last parameter.
    */
    asGoalkeeper: (inspector: GameSnapshotInspector, state: PLAYER_STATE) => Order[] | { orders: Order[], debug_message: string }

}