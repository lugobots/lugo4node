const me = inspector.getMe();
const myPlayers = inspector.getMyTeamPlayers();

let nearestPlayer;
let lastDistance = SPECS.FIELD_WIDTH 

for (const player of myPlayers) {
	const distanceBetweenMeAndPlayer = geo.distanceBetweenPoints(me.getPosition(), player.getPosition());
	if(distanceBetweenMeAndPlayer < lastDistance) {
		nearestPlayer = player;
	}
	lastDistance = distanceBetweenMeAndPlayer	
}