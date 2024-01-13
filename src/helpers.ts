import { GameSnapshot, Player, Team } from "./proto_exported";

export function getBallHolder (snapshot: GameSnapshot): Player | null {
	const holder = snapshot.getBall().getHolder();
	return holder ?? null;
}

export function isBallHolder (snapshot: GameSnapshot, player: Player): boolean {
	const holder = snapshot.getBall().getHolder();
	return holder !== undefined && holder.getTeamSide() === player.getTeamSide() && holder.getNumber() === player.getNumber();
}

export function getTeam (snapshot: GameSnapshot, side: Team.Side): Team | null {
	if (side === Team.Side.HOME) {
		return snapshot.getHomeTeam() ?? null;
	}
	return snapshot.getAwayTeam() ?? null;
}

export function getPlayer(snapshot: GameSnapshot, side: Team.Side, number: number): Player | null {
	const team = getTeam(snapshot, side);
	if (team) {
		let player =  null ;

		for (const currentPlayer of team.getPlayersList()) {
			if(currentPlayer.getNumber() === number) player = currentPlayer;
		}
		
		return player;
	}
	return null;
}

export function getOpponentSide(side: Team.Side): Team.Side  {
	return side === Team.Side.HOME ? Team.Side.AWAY : Team.Side.HOME;
}

