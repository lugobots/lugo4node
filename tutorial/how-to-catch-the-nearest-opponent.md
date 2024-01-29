const me = inspector.getMe();
const opponentPlayers = inspector.getOpponentPlayers();

let nearestOpponent;
let lastDistance = 100000 

for (const opponent of opponentPlayers) {
	const distanceBetweenMeAndOpponent = geo.distanceBetweenPoints(me.getPosition(), opponent.getPosition());
	if(distanceBetweenMeAndOpponent < lastDistance) {
		nearestOpponent = opponent;
		break;
	}
	lastDistance = distanceBetweenMeAndOpponent	
}