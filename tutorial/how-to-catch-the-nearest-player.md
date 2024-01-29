const me = inspector.getMe();
const myPlayers = inspector.getMyTeamPlayers();

let nearestPlayer;
let lastDistance = 100000 

for (const player of myPlayers) {
	const distanceBetweenMeAndPlayer = geo.distanceBetweenPoints(me.getPosition(), player.getPosition());
	if(distanceBetweenMeAndPlayer < lastDistance) {
		nearestPlayer = player;
		break;
	}
	lastDistance = distanceBetweenMeAndPlayer	
}