import { GameSnapshot, Player, Team } from "./proto_exported";
export declare function getBallHolder(snapshot: GameSnapshot): Player | null;
export declare function isBallHolder(snapshot: GameSnapshot, player: Player): boolean;
export declare function getTeam(snapshot: GameSnapshot, side: Team.Side): Team | null;
export declare function getPlayer(snapshot: GameSnapshot, side: Team.Side, number: number): Player | null;
export declare function getOpponentSide(side: Team.Side): Team.Side;
