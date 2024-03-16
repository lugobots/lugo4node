const me = inspector.getMe();
const opponentPlayers = inspector.getOpponentPlayers();

let nearestOpponent;
let lastDistance = SPECS.FIELD_WIDTH 

for (const opponent of opponentPlayers) {
	const distanceBetweenMeAndOpponent = geo.distanceBetweenPoints(me.getPosition(), opponent.getPosition());
	if(distanceBetweenMeAndOpponent < lastDistance) {
		nearestOpponent = opponent;
	}
	lastDistance = distanceBetweenMeAndOpponent	
}