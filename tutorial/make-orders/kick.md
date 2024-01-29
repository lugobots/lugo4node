// The current bot needs to have the ball to kick
onHolding(inspector: GameSnapshotInspector): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
	const goalPoint = this.mapper.getAttackGoal().getCenter(); // or other point
	const speed = 100; // or other speed

	const kickOrder = inspector.makeOrderKick(goalPoint, speed);
	// or
	const kickOrder = inspector.makeOrderKickMaxSpeed(goalPoint);
}