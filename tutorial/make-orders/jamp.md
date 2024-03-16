// The current bot needs to be the goalkeeper to jump.
asGoalkeeper(inspector: GameSnapshotInspector, state: PLAYER_STATE): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
	const goalPoint = this.mapper.getAttackGoal().getCenter(); // or other point
	const speed = 100; // or other speed

	const jumpOrder = inspector.makeOrderJump(goalPoint, speed);
}