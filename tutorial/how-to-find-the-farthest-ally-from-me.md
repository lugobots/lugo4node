const me = inspector.getMe();
const myPlayers = inspector.getMyTeamPlayers();

let farthestPlayer;
let lastDistance = 0;

for (const player of myPlayers) {
    const distanceBetweenMeAndPlayer = geo.distanceBetweenPoints(me.getPosition(), player.getPosition());
    if (distanceBetweenMeAndPlayer > lastDistance) {
        farthestPlayer = player;
    }
    lastDistance = distanceBetweenMeAndPlayer;
}
